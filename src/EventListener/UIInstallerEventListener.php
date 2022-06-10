<?php
/**
 * UI自动同步并安装
 * 
 * @Copyright (C), 2013-, King.
 * @Name Builder.php
 * @Author King
 * @Version Beta 1.0
 * @Date 2020年6月1日下午5:37:07
 * @Description
 * @Class List 1.
 * @Function List 1.
 * @History King 2020年6月1日下午5:37:07 第一次建立该文件
 *                 King 2020年6月1日下午5:37:07 修改
 *
 */
namespace Tiny\MVC\View\UI\EventListener;

use Tiny\MVC\Event\MvcEvent;
use Tiny\MVC\Application\ApplicationBase;
use Tiny\MVC\Application\ConsoleApplication;
use Tiny\MVC\View\UI\UIException;
use Tiny\MVC\Event\BootstrapEventListenerInterface;

/**
 * tinyphp-ui的根目录
 *
 * @var string
 */
define('TINY_UI_ROOT', dirname(__DIR__) . DIRECTORY_SEPARATOR);

/**
 * JS前端库的绝对路径
 *
 * @var string
 */
define('TINY_UI_FRONTEND_LIBRARY_DIR', TINY_UI_ROOT . 'dist/');

/**
 * 打包器插件
 *
 * @package Tiny.MVC.Plugin
 * @since 2020年6月1日下午5:37:30
 * @final 2020年6月1日下午5:37:30
 */
class UIInstallerEventListener implements BootstrapEventListenerInterface
{
    
    /**
     * UI前端JS库安装路径
     *
     * @var string
     */
    const UI_FRONTEND_LIBRARY_DIR = TINY_UI_FRONTEND_LIBRARY_DIR;
    
    /**
     * 当前应用实例
     *
     * @var ApplicationBase
     */
    protected $app;
    
    /**
     *
     * @param ApplicationBase $app
     */
    public function __construct(ConsoleApplication $app)
    {
        $this->app = $app;
    }
    
    /**
     *
     * @param MvcEvent $event
     * @param array $params
     */
    public function onBootstrap(MvcEvent $event, array $params)
    {
        $config = (array)$this->app->properties['view.ui'];
        if (!$config['enabled'] || !$config['installer']) {
            return;
        }
        
        $installConfig = (array)$config['installer'];
        $paramName = (string)$installConfig['param_name'] ?: 'ui-install';
        if (!$this->app->request->param[$paramName]) {
            return;
        }
        
        // 复制前端JS库
        $installPath = $installConfig['install_path'];
        $this->copyto(self::UI_FRONTEND_LIBRARY_DIR, $installPath);
        $this->app->response->end();
    }
    
    /**
     * 复制文件夹去安装路径
     *
     * @param string $sourcePath 源文件路径
     * @param string $installPath 安装路径
     * @throws UIException
     * @return void|boolean
     */
    protected function copyto($sourcePath, $installPath)
    {
        if (!is_dir($sourcePath)) {
            return false;
        }
        if (preg_match("/^(|\*|\/|\/(usr|home|root|lib|lib64|etc|var)\/?|)$/i", $installPath)) {
            return;
        }
        
        if (file_exists($installPath) && !is_dir($installPath)) {
            throw new UIException(sprintf('%s is a file!', $installPath));
        }
        if (!file_exists($installPath)) {
            mkdir($installPath, 0777, TRUE);
        }
        
        $files = scandir($sourcePath);
        foreach ($files as $file) {
            if ($file == '.' || $file == '..') {
                continue;
            }
            $filename = $sourcePath . '/' . $file;
            $tofilename = $installPath . '/' . $file;
            
            if (is_dir($filename)) {
                $this->copyto($filename, $tofilename);
                continue;
            }
            // 更新最新文件
            if (is_file($tofilename) && filemtime($tofilename) >= filemtime($filename)) {
                return;
            }
            $ret = copy($filename, $tofilename);
            if (!$ret) {
                throw new UIException(sprintf('copy failed: %s to %s', $filename, $tofilename));
            }
        }
    }
}
?>
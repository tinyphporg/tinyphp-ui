<?php
/**
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
namespace Tiny\MVC\View\UI;

use Tiny\MVC\ApplicationBase;
use Tiny\Config\Configuration;
use Tiny\MVC\Plugin\Iplugin;

/**
 * JS前端库的绝对路径
 *
 * @var string
 */
define('TINY_UI_FRONTEND_LIBRARY_PATH', dirname(dirname(__DIR__)) . '/dist/tinyphp-ui/');

/**
 * 模板库的绝对路径
 *
 * @var string
 */
define('TINY_UI_VIEW_TEMPLATE_PATH', dirname(dirname(__DIR__)) . '/src/views/tinyphp-ui/');

/**
 * 打包器插件
 *
 * @package Tiny.MVC.Plugin
 * @since 2020年6月1日下午5:37:30
 * @final 2020年6月1日下午5:37:30
 */
class UIInstaller implements Iplugin
{

    /**
     * UI前端JS库安装路径
     *
     * @var string
     */
    const UI_FRONTEND_LIBRARY_PATH = TINY_UI_FRONTEND_LIBRARY_PATH;

    /**
     *  UI 视图模板库的安装路径
     *  
     * @var string
     */
    const UI_VIEW_TEMPLATE_PATH = TINY_UI_VIEW_TEMPLATE_PATH;
    
    /**
     * 预定义的Template解析插件
     * @var string
     */
    const UI_VIEW_TEMPLATE_PLUGIN = '\Tiny\MVC\View\UI\UIViewTemplatePlugin';
    
    /**
     * 预定义的视图插件
     * 
     * @var string
     */
    const UI_VIEW_HELPER = '\Tiny\MVC\View\UI\UIViewHelper';
    
    /**
     * 当前应用实例
     *
     * @var \Tiny\MVC\ApplicationBase
     */
    protected $_app;

    /**
     * app属性
     *
     * @var Configuration
     */
    protected $_properties;

    /**
     * 初始化
     *
     * @param $app ApplicationBase
     *            当前应用实例
     * @return void
     */
    public function __construct(ApplicationBase $app)
    {
        $this->_app = $app;
        $this->_properties = $app->properties;
    }

    /**
     * 本次请求初始化时发生的事件
     *
     * @return void
     */
    public function onBeginRequest()
    {
        
    }

    /**
     * 本次请求初始化结束时发生的事件
     *
     * @return void
     */
    public function onEndRequest()
    {
        
    }

    /**
     * 执行路由前发生的事件
     *
     * @return void
     */
    public function onRouterStartup()
    {
        $config = (array)$this->_app->properties['view.ui'];
        if (! $config['enabled'] || ! $config['installer']) 
        {
            return;
        }
        
        $installConfig = (array)$config['installer'];
        $paramName = (string)$installConfig['param_name'] ?: 'ui-install';
        if (! $this->_app->request->param[$paramName]) 
        {
            return;
        }
        
        // 复制前端JS库
        $frontPath = dirname(get_included_files()[0]) . '/' . trim($installConfig['frontend_path']);
        $this->_copyto(self::UI_FRONTEND_LIBRARY_PATH, $frontPath);
        
        //生成配置文件
        $uiconfig = [
            'template_plugin' => '\Tiny\MVC\View\UI\UIViewTemplatePlugin',
            'helper' => '\Tiny\MVC\View\UI\UIViewHelper',
            'template_dirname' => self::UI_VIEW_TEMPLATE_PATH,
        ];
        
        $configPath = (string)$installConfig['config_path'];
        if ($configPath)
        {
            $configPath = $this->_app->path . '/' . $configPath;
            $configDir = dirname($configPath);
            
            if (!file_exists($configDir))
            {
                mkdir($configDir, 0777, TRUE);
            }
            elseif(!is_dir($configDir))
            {
                return;
            }
            file_put_contents($configPath,"<?php\n return " . var_export($uiconfig, TRUE) . ";\n ?>", LOCK_EX);
        }
        $this->_app->response->end();
    }
    
    /**
     * 复制文件夹去安装路径
     * 
     * @param string $sourcePath 源文件路径
     * @param string $installPath 安装路径
     * @throws UIException
     * @return void|boolean
     */
    protected function _copyto($sourcePath, $installPath)
    {
        if (!is_dir($sourcePath))
        {
            return FALSE;
        }
        if (preg_match("/^(|\*|\/|\/(usr|home|root|lib|lib64|etc|var)\/?|)$/i", $installPath))
        {
            return;
        }
        
        if (file_exists($installPath) && !is_dir($installPath))
        {
            throw new UIException(sprintf('%s is a file!', $installPath));
        }
        if (!file_exists($installPath))
        {
            mkdir($installPath, 0777, TRUE);
        }
        
        $files = scandir($sourcePath);
        foreach ($files as $file)
        {
            if ($file == '.' || $file == '..')
            {
                continue;
            }
            $filename = $sourcePath . '/' . $file;
            $tofilename = $installPath . '/' . $file;
            
            if (is_dir($filename))
            {
                $this->_copyto($filename, $tofilename);
                continue;
            }
            // 更新最新文件
            if (is_file($tofilename) && filemtime($tofilename) >= filemtime($filename))
            {
                return;
            }
            $ret = copy($filename, $tofilename);
            if (!$ret)
            {
                throw new UIException(sprintf('copy failed: %s to %s', $filename, $tofilename));
            }
        }
    }
    
    /**
     * 执行路由后发生的事件
     *
     * @return void
     */
    public function onRouterShutdown()
    {
        
    }

    /**
     * 执行分发前发生的动作
     *
     * @return void
     */
    public function onPreDispatch()
    {
        
    }

    /**
     * 执行分发后发生的动作
     *
     * @return void
     */
    public function onPostDispatch()
    {
        
    }
}
?>
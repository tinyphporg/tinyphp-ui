<?php
/**
 * UI调试监听事件
 * 
 * @copyright (C), 2013-, King.
 * @name UIPagePlugin.php
 * @author King
 * @version stable 1.0
 * @Date 2017年3月12日下午2:05:36
 * @Class List
 * @Function List
 * @History King 2021年11月23日下午4:02:51 0 第一次建立该文件
 *          King 2021年11月23日下午4:02:51 1 修改
 *          King 2021年11月23日下午4:02:51 stable 1.0.01 审定
 */
namespace Tiny\MVC\View\UI\EventListener;

use Tiny\Config\Configuration;
use Tiny\MVC\Application\ApplicationBase;
use Tiny\MVC\Event\MvcEvent;
use Tiny\MVC\View\UI\UIException;
use Tiny\MVC\Event\RouteEventListenerInterface;
use Tiny\MVC\Application\WebApplication;

/**
 * 模板库的绝对路径
 *
 * @var string
 */
define('TINY_UI_VIEW_TEMPLATE_DIR', dirname(dirname(__DIR__)) . '/templates');

/**
 * UI库调试插件
 *
 * @package Tiny.MVC.View.UI
 * @since 2022年2月16日上午9:53:10
 * @final 2022年2月16日上午9:53:10
 */
class UIDebugEventListener implements RouteEventListenerInterface
{
    
    /**
     * UI 视图模板库的安装路径
     *
     * @var string
     */
    const UI_VIEW_TEMPLATE_DIR = TINY_UI_VIEW_TEMPLATE_DIR;
    
    /**
     * 配置路径
     *
     * @var string
     */
    const UI_VIEW_TEMPLATE_CONFIG = TINY_UI_VIEW_TEMPLATE_DIR . '/conf/';
    
    /**
     * 当前应用实例
     *
     * @var ApplicationBase
     */
    protected $app;
    
    /**
     * 初始化
     *
     * @param $app ApplicationBase 当前应用实例
     * @return void
     */
    public function __construct(ApplicationBase $app)
    {
        $this->app = $app;
        $this->properties = $app->properties;
    }
    
    /**
     * 执行路由前发生的事件
     *
     * @return void
     */
    public function onRouterStartup(MvcEvent $event, array $params)
    {
        if (!$this->app instanceof WebApplication) {
            return;
        }
        $routePath = $this->app->request->uri;
        if (!preg_match('/^\\/pages\/([^\?]*)?/is', $routePath)) {
            return;
        }
        
        $extname = strpos($routePath, '.html') ? '' : '.html';
        $fpath = self::UI_VIEW_TEMPLATE_DIR . $routePath . $extname;
        if (!is_file($fpath)) {
            throw new UIException(sprintf("UITemplateEventLister to faild:%s is not exists", $fpath));
        }
        
        $templatefile = $routePath . $extname;
        $view = $this->app->getView();
        
        // 预加载模板变量
        $configDir = self::UI_VIEW_TEMPLATE_CONFIG;
        if (is_dir($configDir)) {
            $tconfigInstance = new Configuration($configDir);
            $tAssigns = $tconfigInstance->get();
        }
        
        // config
        $config = $this->app->getConfig();
        $pagesAssign = ($config && $config['pages']) ? [
            'pages' => $config['pages']
        ] : [];
        $pagesAssign = array_merge($tAssigns, $pagesAssign);
        
        // parse
        $body = $view->fetch($templatefile, $pagesAssign);
        $this->app->response->appendBody($body);
        $this->app->properties['debug.console'] = TRUE;
        $this->app->end();
    }
    
    /**
     * 执行路由后发生的事件
     *
     * @return void
     */
    public function onRouterShutdown(MvcEvent $event, array $params)
    {
    }
}
?>
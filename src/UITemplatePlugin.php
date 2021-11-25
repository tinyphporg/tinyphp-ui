<?php 
/**
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
namespace Tiny\MVC\View\UI;


use Tiny\MVC\Plugin\Iplugin;
use Tiny\MVC\ApplicationBase;
use Tiny\Config\Configuration;


/**
 * 模板库的绝对路径
 *
 * @var string
 */
define('TINY_UI_VIEW_TEMPLATE_DIR', dirname(__DIR__) . '/templates');

/**
 *  pages视图调试插件
 *  
 *  
 *
 */
class UITemplatePlugin implements Iplugin
{   
    /**
     *  UI 视图模板库的安装路径
     *
     * @var string
     */
    const UI_VIEW_TEMPLATE_DIR = TINY_UI_VIEW_TEMPLATE_DIR;
    
    
    const UI_VIEW_TEMPLATE_CONFIG = TINY_UI_VIEW_TEMPLATE_DIR . '/conf/';
    
    /**
     * 当前应用实例
     *
     * @var \Tiny\MVC\ApplicationBase
     */
    protected $_app;
    
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
        
        $routePath = $this->_app->request->getRouterString();
        if (!preg_match('/^\\/pages\/([^\?]*)?/is', $routePath))
        {
            return;
        }
        $extname = strpos($routePath, '.html') ? '' : '.html';
        $fpath = self::UI_VIEW_TEMPLATE_DIR . $routePath . $extname;
        if (!is_file($fpath))
        {
            return;
        }

        $templatefile = $routePath . $extname;        
        $view = $this->_app->getView();
        
        // 预加载模板变量
        $configDir = self::UI_VIEW_TEMPLATE_CONFIG;
        if (is_dir($configDir))
        {
            $tconfigInstance = new Configuration($configDir);
            $tAssigns = $tconfigInstance->get();
        }
        $config = $this->_app->getConfig();
        $pagesAssign = ($config && $config['pages']) ? ['pages'  => $config['pages']]: [];
        $pagesAssign = array_merge($tAssigns, $pagesAssign);
        $body = $view->fetch($templatefile, $pagesAssign);
        $this->_app->response->appendBody($body);
        $this->_app->properties['debug.console'] = TRUE;
        //$this->_app->response->end();
        $this->_app->end();
        
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
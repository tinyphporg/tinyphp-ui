<?php 
/**
 *
 * @copyright (C), 2013-, King.
 * @name UIEventListener.php
 * @author King
 * @version stable 2.0
 * @Date 2022年6月27日下午6:53:03
 * @Class List class
 * @Function List function_container
 * @History King 2022年6月27日下午6:53:03 2017年3月8日下午4:20:28 0 第一次建立该文件
 */
namespace Tiny\UI\Event;

use Tiny\MVC\Event\RequestEventListenerInterface;
use Tiny\MVC\Event\MvcEvent;
use Tiny\MVC\Application\ApplicationBase;
use Tiny\MVC\Module\ModuleManager;
use Tiny\MVC\Module\Module;
use Tiny\MVC\Application\Properties;
use Tiny\MVC\View\Engine\Template;
use Tiny\UI\Template\UIViewTemplatePlugin;
use Tiny\UI\Helper\UIViewHelper;
use Tiny\MVC\Event\RouteEventListenerInterface;

class UIEventListener implements RequestEventListenerInterface, RouteEventListenerInterface
{
    /**
     * 当前应用实例
     * 
     * @var ApplicationBase
     */
    protected $app;
    
    /**
     * 当前模块实例
     * 
     * @var Module
     */
    protected $module;
    
    /**
     * 当前应用配置属性
     * 
     * @var Properties
     */
    protected $properties;
    
    /**
     * 构造函数
     * @param ApplicationBase $app
     * @param Module $module
     */
    public function __construct(ApplicationBase $app, Module $module)
    {
        $this->app = $app;
        $this->module = $module;
        $this->properties = $app->properties;
    }
    
    public function onBeginRequest(MvcEvent $event, array $params)
    {
       $setting = $this->module->profile['setting'];
       if (key_exists('enabled', $setting) && !$setting['enabled']) {
           return;
       }
       
       // add templates path
       $path = $this->properties['view.paths'];
       $path = is_array($path) ? $path : [(string)$path];
       $path[] = $this->module->getViewPath();
       $this->properties['view.paths'] = $path;

       // add view engines
       $engines = (array)$this->properties['view.engines'];  
       $templatePluginConfig = [
           'public_path' => $setting['public_path'],
           'inject' => $setting['inject'],
           'dev_enabled' => $setting['dev']['enabled'],
           'dev_public_path' => $setting['dev']['public_path'],
           'dev_admin_public_path' => $setting['dev']['admin_public_path'],
       ];
       $engines[] = [
           'engine' => Template::class,
           'config' => [],
           'plugins' => [[ 'plugin' => UIViewTemplatePlugin::class, 'config' => $templatePluginConfig ]]
       ];
       $this->properties['view.engines'] = $engines;
       
       //helpers;
       $helpers = (array)$this->properties['view.helpers'];
       $helpers[] = ['helper' => UIViewHelper::class];
       $this->properties['view.helpers'] = $helpers;
    }
    
    /**
     * 
     * {@inheritDoc}
     * @see \Tiny\MVC\Event\RouteEventListenerInterface::onRouterStartup()
     */
    public function onRouterStartup(MvcEvent $event, array $params)
    {
        $uri = $this->app->request->uri;
        if (!preg_match('/uidemo\/(.*\.html)$/is', $uri, $matchs)) {
            return;
        }
        // 模板路径
        $templatePath =  $matchs[1];
        $viewPath = $this->module->getViewPath() . $templatePath;
        if (!file_exists($viewPath)) {
            return;
        }
        
        $viewer = $this->app->getView();
        $viewer->display($templatePath, [], $this->module->name);
        $this->app->end();
        
    }
    
    /**
     * 
     * {@inheritDoc}
     * @see \Tiny\MVC\Event\RouteEventListenerInterface::onRouterShutdown()
     */
    public function onRouterShutdown(MvcEvent $event, array $params)
    {
        
    }
    
    /**
     * 
     * {@inheritDoc}
     * @see \Tiny\MVC\Event\RequestEventListenerInterface::onEndRequest()
     */
    public function onEndRequest(MvcEvent $event, array $params)
    {
        
    }
}
?>
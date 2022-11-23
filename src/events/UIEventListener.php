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

/**
 * UI事件插件
 *
 * @package Tiny.UI.Event
 * @since 2022年9月5日下午9:21:47
 * @final 2022年9月5日下午9:21:47
 */
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
     *
     * @param ApplicationBase $app
     * @param Module $module
     */
    public function __construct(ApplicationBase $app, Module $module)
    {
        $this->app = $app;
        $this->module = $module;
        $this->properties = $app->properties;
    }
    
    /**
     * 注册视图插件和模板处理引擎
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\Event\RequestEventListenerInterface::onBeginRequest()
     */
    public function onBeginRequest(MvcEvent $event, array $params)
    {
        $setting = $this->module->profile['setting'];
        if (key_exists('enabled', $setting) && !$setting['enabled']) {
            return;
        }
        
        // add templates path
        $path = $this->properties['view.paths'];
        $path = is_array($path) ? $path : [
            (string)$path
        ];
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
            'plugins' => [
                [
                    'plugin' => UIViewTemplatePlugin::class,
                    'config' => $templatePluginConfig
                ]
            ]
        ];
        $this->properties['view.engines'] = $engines;
        
        // helpers;
        $helpers = (array)$this->properties['view.helpers'];
        $helpers[] = [
            'helper' => UIViewHelper::class
        ];
        $this->properties['view.helpers'] = $helpers;
        
        $this->initViewAssigns($setting);
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\Event\RouteEventListenerInterface::onRouterStartup()
     */
    public function onRouterStartup(MvcEvent $event, array $params)
    {
        $matchs = [];
        $uri = $this->app->request->uri;
        if (!preg_match('/uidemo\/((app|admin|docs)\/(.*\.html))(\?.*)?$/is', $uri, $matchs)) {
            return;
        }
        $actionName = $matchs[2];
        if ($actionName === 'docs') {
            return $this->showDocsAction($matchs[3]);
        }
        
        // 模板路径
        $templatePath = $matchs[1];
        $viewPath = $this->module->getViewPath() . $templatePath;
        if (!file_exists($viewPath)) {
            return;
        }
        
        $this->app->getView()->display($templatePath, [
            'module' => $this->module
        ], $this->module->name);
        $this->app->end();
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\Event\RouteEventListenerInterface::onRouterShutdown()
     */
    public function onRouterShutdown(MvcEvent $event, array $params)
    {
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\Event\RequestEventListenerInterface::onEndRequest()
     */
    public function onEndRequest(MvcEvent $event, array $params)
    {
    }
    
    /**
     * 注入预设的配置节点到视图变量
     */
    protected function initViewAssigns($setting)
    {
        // $ui配置项
        $assignNodes = (array)$setting['assigns'];
        if (!$assignNodes) {
            return;
        }
        
        // app config;
        if ($this->properties['config.enabled']) {
            $appConfig = $this->app->getConfig();
        }
        
        foreach ($assignNodes as $assignNode) {
            $assign = (array)$this->module->config[$assignNode];
            if ($appConfig && $appConfig[$assignNode]) {
                $assign = array_merge($assign, (array)$appConfig[$assignNode]);
            }
            if ($assign) {
                $this->properties['view.assign.' . $assignNode] = $assign;
            }
        }
    }
    
    /**
     * 显示文档路径
     *
     * @param string $docPath
     */
    protected function showDocsAction($docPath)
    {
        $mdPath = str_replace('.html', '.md', $docPath);
        $mdPath = \Tiny\Docs\Reader::getDocPath($mdPath);
        if (!$mdPath) {
            return '';
        }
        
        // controller & action
        $matchs = [];
        if (preg_match('/^((?:[^\/]+\/)+)(.*)\.html$/', $docPath, $matchs)) {
            $controllName = rtrim($matchs[1], '/');
            $actionName = $matchs[2];
            $this->app->request->setControllerName($controllName);
            $this->app->request->setActionName($actionName);
        }
        
        // format content
        $content = $this->app->getView()->fetch($mdPath, [], true);
        if ($ui = $this->app->getView()->getVariables('ui')) {
            $titles = [];
            $content = preg_replace_callback('/<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/s', function ($matchs) use (&$titles) {
                $hid = $matchs[1];
                $tid = 'ui-menu-' . count($titles);
                $titles[] = [
                    'name' => $matchs[3],
                    'href' => '#' . $tid,
                    'class' => 'ms-' . $hid
                ];
                return sprintf('<h%d id="%s" %s>%s</h%d>', $hid, $tid, $matchs[2], $matchs[3], $hid);
            }, $content);
            if ($titles) {
                $ui['menu'] = $titles;
            }
        }
        
        //
        $content = preg_replace_callback("/href=\"(?:https\:\/\/github.com\/tinyphporg\/tinyphp-docs\/(?:blob|edit|tree)\/master\/docs\/(.+?)\.md)\"/i", function ($matchs) {
            return 'href="/uidemo/docs/' . $matchs[1] . '.html' . '"';
        }, $content);
        
        $ui['headerExtra'] = '';
        if (preg_match("/(<h1[^>]*>(.*?)<\/h1>(.*?))<h[2-7][^>]*>/s", $content, $matchs)) {
            $title =  $matchs[2];
            $lead = $matchs[3];
            $contentHeader = <<<EOT
            <div class="docs-content-header my-5">
            <h1 class=docs-content-title" id="content">{$title}</h1>
            <div class="docs-content-lead">
            $lead
            </div>
            </div>
            EOT;
            $content = str_replace($matchs[1], '', $content);
            $ui['headerExtra'] = $contentHeader;
        }
       
        if ($ui) {
            $this->app->getView()->assign('ui', $ui);
        }
        $content = '<div class="markdown-body docs-content-body">' . $content . '</div>';
        $this->app->getView()->display('pub/app/main-docs.html', [
            'module' => $this->module,
            'doccontent' => $content
        ], $this->module->name);
        $this->app->end();
    }
}
?>
<?php 
/**
 *
 * @copyright (C), 2013-, King.
 * @name UITagParser.php
 * @author King
 * @version stable 2.0
 * @Date 2022年12月10日下午1:24:18
 * @Class List class
 * @Function List function_container
 * @History King 2022年12月10日下午1:24:18 2017年3月8日下午4:20:28 0 第一次建立该文件
 */
namespace Tiny\UI;

use Tiny\MVC\View\Engine\Tagger\Tagger;
use Tiny\MVC\View\Engine\Tagger\Parser\ParserInterface;

/**
 *
 * View Template 插件
 *
 * @package Tiny.MVC.View.UI
 * @since King 2021年11月16日下午5:40:10
 * @final King 2021年11月16日下午5:40:10
 *
 */
class UITagParser implements ParserInterface
{
    /**
     * 标签解析的命名空间
     * @var string
     */
    const TAG_PARSER_NAMESPACE = 'ui';
    
    
    /**
     * 支持解析的标签列表
     * 
     * @var array
     */
    const TAG_PARSER_LIST = [
        'lib',
        'assets',
        'jslib',
        'admin'
    ];
    
    /**
     * 默认插入前端库的位置为头部标签最下
     *
     * @var string
     */
    const UI_FRONTEND_INJECT_DEFAULT = 'head';
    
    /**
     * 默认插入前端库的位置列表
     *
     * @var array
     */
    const UI_FRONTEND_INJECT_LIST = [
        'head',
        'body'
    ];
    
    /**
     * 当前URL插件的配置数组
     *
     * @var array
     */
    protected $config;
    
    /**
     * 是否自动注入前端库
     *
     * @var boolean
     */
    protected $inject = self::UI_FRONTEND_INJECT_DEFAULT;
    
    /**
     * 是否注入
     *
     * @var boolean
     */
    protected $isOnceInjected = false;
    
    /**
     * 前端库的URL公开地址前缀
     *
     * @var string
     */
    protected $publicPath = '/';
    
    /**
     * 是否为开发模式
     *
     * @var boolean
     */
    protected $isDev = false;
    
    /**
     * 开发模式下的公共地址
     *
     * @var string
     */
    protected $devPublicPath;
    
    /**
     * 开发模式下的公共后台地址
     *
     * @var string
     */
    protected $devAdminPublicPath;
    
    /**
     * 解析静态资源的公共访问地址
     *
     * @var string
     */
    protected $assetsPublicPath;
    
    /**
     * 
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\View\Engine\Template\TemplatePluginInterface::setTemplateConfig()
     */
    public function __construct(array $config)
    {
        $this->config = $config;
        if (isset($config['public_path'])) {
            $this->publicPath = (string)$config['public_path'];
            $this->assetsPublicPath = $this->publicPath . 'assets/';
        }
        
        // 兼容开发模式
        $this->isDev = (bool)$config['dev_enabled'];
        if ($this->isDev && isset($config['dev_public_path'])) {
            $this->devPublicPath = (string)$config['dev_public_path'];
            $this->devAdminPublicPath = (string)$config['dev_admin_public_path'];
        }
        
        if (!isset($config['inject'])) {
            return;
        }
        
        // inject
        $this->inject = false;
        if ($config['inject']) {
            $inject = (string)$config['inject'];
            $inject = in_array($inject, self::UI_FRONTEND_INJECT_LIST) ? $inject : self::UI_FRONTEND_INJECT_DEFAULT;
            $this->inject = $inject;
        }
    }

    /**
     * 解析前发生
     *
     * @param string $template 解析前的模板字符串
     * @return false|string
     */
    public function onPreParse($template)
    {
        if (!$this->isDev) {
            return false;
        }
        $template = preg_replace('/<script src=.*?tinyphp-ui\.admin\.js.*?><\/script>/', '<ui:admin>', $template);
        $template = preg_replace('/<script src=.*?tinyphp-ui\.js.*?><\/script>/', '<ui:lib>', $template);
        return $template;
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\View\Engine\Template\TemplatePluginInterface::onParseCloseTag()
     */
    public function onParseCloseTag($tagName, $namespace = '')
    {
        if ($namespace !== self::TAG_PARSER_NAMESPACE) {
            return false;
        }
        
        if (!in_array($tagName, self::TAG_PARSER_LIST)) {
            return false;
        }
        return '';
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\View\Engine\Template\TemplatePluginInterface::onParseTag()
     */
    public function onParseTag($tagName, $namespace = '', array $params = [])
    {
        
        if ($namespace !== self::TAG_PARSER_NAMESPACE) {
            return false;
        }
        if (!in_array($tagName, self::TAG_PARSER_LIST)) {
            return false;
        }
        
        switch ($tagName) {
            case 'lib':
                return $this->parseUILibraryTag($params);
            case 'admin':
                return $this->parseUILibraryTag($params, true);
            case 'assets':
                return $this->parseAssetsTag();
          //  case 'datatable':
          //  case 'pagination':
          //      return (new Pagination())->OnParseTag($tagName, $tagBody, $extra);
        }
    }
    
    /**
     * 解析后发生
     *
     * @param string $template 解析后的模板字符串
     * @return false|string
     */
    public function onPostParse($template)
    {
        if (!$this->inject) {
            return false;
        }
        
        $injectTag = ($this->inject === 'body') ? '</body>' : '</head>';
        if (strpos($template, $injectTag) === false) {
            return false;
        }
        $libraryTag = $this->parseUILibraryTag();
        $count = 1;
        return str_replace($injectTag, $libraryTag . "\n" . $injectTag, $template, $count);
    }
    
    /**
     * 解析assetstag
     */
    protected function parseAssetsTag()
    {
        return $this->assetsPublicPath;
    }
    
    /**
     * 解析UI library库标签
     *
     * @return string
     */
    protected function parseUILibraryTag(array $params = [], $isAdmin = false)
    {
        // 预加载插件
        $pluginsString = '';
        if (key_exists('plugins', $params) && $params['plugins']){
                $pluginsString = ' data-ui-preload="' . $params['plugins'] . '"';
        }

        //uiPreload
       // uiPublicPath
        if ($this->isDev) {
            $devPublicPath = $isAdmin ? $this->devAdminPublicPath : $this->devPublicPath;
            $lib = sprintf('<script src="%s"></script>', $devPublicPath);
        } else {
            $pluginsString .= sprintf(' data-public-path="%s"', $this->publicPath);
            $libName = $isAdmin ? 'admin.' : '';
            $lib = sprintf('<link href="%scss/tinyphp-ui.%smin.css" rel="stylesheet"/><script src="%sjs/tinyphp-ui.%smin.js"%s></script>', $this->publicPath, $libName, $this->publicPath, $libName, $pluginsString);
        }
        return <<<EOT
        <?php
        if (!\$this->__tinyphp_ui_library_injected)
        {
            \$this->__tinyphp_ui_library_injected = true;
            echo '{$lib}';
        }
        ?>
        EOT;
    }
}
?>
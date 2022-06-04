<?php
/**
 *
 * @copyright (C), 2013-, King.
 * @name UIViewTemplatePlugin.php
 * @author King
 * @version stable 1.0
 * @Date 2017年3月12日下午2:05:36
 * @Class List
 * @Function List
 * @History King 2021年11月16日下午5:40:10 0 第一次建立该文件
 *          King 2021年11月16日下午5:40:10 1 修改
 *          King 2021年11月16日下午5:40:10 stable 1.0.01 审定
 */
namespace Tiny\MVC\View\UI\Template;

use Tiny\MVC\View\Engine\Template;
use Tiny\MVC\View\Engine\Template\TemplatePluginInterface;

/**
 *
 * View Template 插件
 *
 * @package Tiny.MVC.View.UI
 * @since King 2021年11月16日下午5:40:10
 * @final King 2021年11月16日下午5:40:10
 *       
 */
class UIViewTemplatePlugin implements TemplatePluginInterface
{
    
    /**
     * 可解析的标签列表
     *
     * @var array
     */
    const PARSE_TAG_LIST = [
        'ui.lib',
        'ui.jslib',
        'pagination'  //{splitpage,url="http://demo.tinycn.com/%s", index="1"}
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
     * 当前template实例
     *
     * @var Template
     */
    protected $template;
    
    /**
     * 当前URL插件的配置数组
     *
     * @var array
     */
    protected $templateConfig;
    
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
     *
     * @autowired
     * {@inheritdoc}
     * @see \Tiny\MVC\View\Engine\Template\TemplatePluginInterface::setTemplateConfig()
     */
    public function setTemplateConfig(Template $template, array $config)
    {
        $this->template = $template;
        $this->templateConfig = $config;
        if (isset($config['public_path'])) {
            $this->publicPath = (string)$config['public_path'];
        }
        
        // 兼容开发模式
        $this->isDev = (bool)$config['dev_enabled'];
        if ($this->isDev && isset($config['dev_public_path'])) {
            $this->devPublicPath = (string)$config['dev_public_path'];
        }
        if (!isset($config['inject'])) {
            return;
        }
        if ($config['inject']) {
            $inject = (string)$config['inject'];
            $inject = in_array($inject, self::UI_FRONTEND_INJECT_LIST) ? $inject : self::UI_FRONTEND_INJECT_DEFAULT;
            $this->inject = $inject;
        } else {
            $this->inject = false;
        }
    }
    
    /**
     *
     * @param string $tpath
     */
    public function onParseTemplatePath($tpath, bool $isAbsolute = false, array $variables = [])
    {
        return false;    
    }
    
    /**
     * 解析前发生
     *
     * @param string $template 解析前的模板字符串
     * @return false|string
     */
    public function onPreParse($template)
    {
        return false;
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\View\Engine\Template\TemplatePluginInterface::onParseCloseTag()
     */
    public function onParseCloseTag($tagName)
    {
        if (!in_array($tagName, self::PARSE_TAG_LIST)) {
            return false;
        }
        return '';
    }
    
    /**
     *
     * {@inheritdoc}
     * @see \Tiny\MVC\View\Engine\Template\TemplatePluginInterface::onParseTag()
     */
    public function onParseTag($tagName, $tagBody, $extra = NULL)
    {
        if (!in_array($tagName, self::PARSE_TAG_LIST)) {
            return false;
        }
        switch ($tagName) {
            case 'ui.lib':
                return $this->parseTagUILibraryTag();
            case 'pagination':
                return (new Pagination())->OnParseTag($tagName, $tagBody, $extra);
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
        $libraryTag = $this->parseTagUILibraryTag();
        $count = 1;
        
        return str_replace($injectTag, $libraryTag . "\n" . $injectTag, $template, $count);
    }
    
    /**
     * 解析UI library库标签
     *
     * @return string
     */
    protected function parseTagUILibraryTag()
    {
        $lib = $this->isDev ? sprintf('<script src="%s"></script>', $this->devPublicPath) : sprintf('<link href="%scss/tinyphp-ui.min.css" rel="stylesheet"/><script src="%sjs/tinyphp-ui.min.js"></script>', $this->publicPath, $this->publicPath);
        
        return <<<EOT
        <?php
        if (!\$this->__tinyphpUILibraryInjected) 
        {
            \$this->__tinyphpUILibraryInjected = true;
            echo '{$lib}';
        }
        ?>
        EOT;
    }
}
?>
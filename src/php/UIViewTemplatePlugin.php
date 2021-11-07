<?php 
namespace Tiny\MVC\View\UI;

use Tiny\MVC\View\Engine\Template\IPlugin;
use Tiny\MVC\View\Engine\Template;

class UIViewTemplatePlugin implements IPlugin
{
    /**
     * 当前template实例
     *
     * @var Template
     */
    protected $_template;
    
    /**
     * 当前URL插件的配置数组
     *
     * @var array
     */
    protected $_templateConfig;
    /**
     * 可解析的标签列表
     * @var array
     */
    const PARSE_TAG_LIST = ['ui.lib'];
    
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
    const UI_FRONTEND_INJECT_LIST = ['head', 'body'];
    
    /**
     * 是否自动注入前端库
     * 
     * @var boolean
     */
    protected $_inject = self::UI_FRONTEND_INJECT_DEFAULT;
    
    /**
     * 是否注入
     * 
     * @var boolean
     */
    protected $_isOnceInjected = FALSE;
    
    /**
     * 前端库的URL公开地址前缀
     * 
     * @var string
     */
    protected $_publicPath = '/';
    
    
    /**
     * 实现接口
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Engine\Template\IPlugin::setTemplateConfig()
     */
    public function setTemplateConfig(Template $template, array $config)
    {
        $this->_template = $template;
        $this->_templateConfig = $config;
        
        if (isset($config['public_path']))
        {
            $this->_publicPath = (string)$config['public_path'];
        }
        if (!isset($config['inject']))
        {
            return;
        }
        if ($config['inject'])
        {
            $inject = (string)$config['inject'];
            $inject = in_array($inject, self::UI_FRONTEND_INJECT_LIST) ? $inject : self::UI_FRONTEND_INJECT_DEFAULT;
            $this->_inject = $inject;
        }
        else
        {
            $this->_inject = FALSE;
        }
    }
    
    /**
     * 解析前发生
     *
     * @param string $template 解析前的模板字符串
     * @return FALSE|string
     */
    public function onPreParse($template)
    {
        return FALSE;
    }
    
    /**
     * 解析URL的闭合标签
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Engine\Template\IPlugin::onParseCloseTag()
     */
    public function onParseCloseTag($tagName)
    {
        if(!in_array($tagName, self::PARSE_TAG_LIST))
        {
            return FALSE;
        }
        return '';
    }
    
    /**
     * 解析URL标签
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Engine\Template\IPlugin::onParseTag()
     */
    public function onParseTag($tagName, $tagBody, $extra = NULL)
    {
        if(!in_array($tagName, self::PARSE_TAG_LIST))
        {
            return FALSE;
        }
        switch ($tagName)
        {
            case 'ui.lib':
                return $this->_parseTagUILibraryTag();
            case 'ui.preload':
                return $this->_parseTagUIPreload($tagName, $tagBody, $extra);
        }
        
        return;
        $paramText = explode(',', $tagBody);
        $params = [];
        $isRewrite = ($extra == 'r') ? TRUE : FALSE;
        foreach($paramText as $ptext)
        {
            $ptext = trim($ptext);
            if(preg_match('/\s*(.+?)\s*=\s*(.*)\s*/i', $ptext, $out))
            {
                $params[$out[1]] = $out[2];
            }
        }
        $router = \Tiny\Tiny::getApplication()->getRouter();
        if($router)
        {
            return $router->rewriteUrl($params, $isRewrite);
        }
        return '';
    }
    
    /**
     * 解析后发生
     *
     * @param string $template 解析后的模板字符串
     * @return FALSE|string
     */
    public function onPostParse($template)
    {
        if (!$this->_inject || $this->_isOnceInjected)
        {
            return FALSE;
        }
        $injectTag = ($this->_inject === 'body') ? '</body>' : '</head>';
        if (strpos($template, $injectTag) < 0)
        {
            return FALSE;
        }
        $this->_isOnceInjected = TRUE;
        $libraryTag = $this->_parseTagUILibraryTag();
        $count = 1;
        return str_replace($injectTag, $libraryTag ."\n". $injectTag, $template, $count);
    }
    
    protected function _parseTagUILibraryTag()
    {
        if ($this->_isOnceInjected)
        {
            return '';
        }
        return  <<<EOT
        <link href="/tinyphp-ui/css/tinyphp-ui-lib.min.css" rel="stylesheet"/>
        <link href="/tinyphp-ui/css/tinyphp-ui.min.css" rel="stylesheet"/>
        <script src="/tinyphp-ui/js/tinyphp-ui-lib.min.js"></script>
        <script src="/tinyphp-ui/js/tinyphp-ui.min.js"></script>
        EOT;  
    }
    
    protected function _parseTagUIPreload($tagName, $tagBody, $extra)
    {
        
    }
}
?>
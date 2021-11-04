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
    const PARSE_TAG_LIST = ['ui'];
    
    /**
     * 实现接口
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Engine\Template\IPlugin::setTemplateConfig()
     */
    public function setTemplateConfig(Template $template, array $config)
    {
        $this->_template = $template;
        $this->_templateConfig = $config;
        print_r($config);
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
}
?>
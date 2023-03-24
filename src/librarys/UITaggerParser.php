<?php 
/**
 *
 * @copyright (C), 2013-, King.
 * @name UITaggerParser.php
 * @author King
 * @version stable 1.0
 * @Date 2023年3月21日下午5:46:49
 * @Description
 * @Class List 1.
 * @Function List 1.
 * @History King 2023年3月21日下午5:46:49 第一次建立该文件
 *          King 2023年3月21日下午5:46:49 修改
 *         
 */
namespace Tiny\UI;

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
class UITaggerParser implements  ParserInterface
{
    /**
     * 解析器的命名空间
     * 
     * @var string
     */
    const PARSER_NAMESPACE = 'ui';
    
    /**
     * 可解析的标签列表
     *
     * @var array
     */
    const PARSER_TAGS = [
        'lib',
        'admin',
        'jslib',
        'assets',
//        'pagination' // {splitpage,url="http://demo.tinycn.com/%s", index="1"}
    ];
    
    /**
     * 默认插入前端库的位置为头部标签最下
     *
     * @var string
     */
    const INJECT_DEFAULT = 'head';
    
    /**
     * 默认插入前端库的位置列表
     *
     * @var array
     */
    const INJECT_LIST = [
        'head',
        'body'
    ];
    
    /**
     * 当前解析器的配置数组
     *
     * @var array
     */
    protected $config;
    
    /**
     * 是否自动注入前端库
     *
     * @var boolean
     */
    protected $inject = self::INJECT_DEFAULT;
    
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
     * 解析静态资源的公共访问地址
     *
     * @var string
     */
    protected $assetsPublicPath;
    
    /**
     * 根据配置
     * 
     * @param array $config
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
        if (isset($config['dev_public_path'])) {
            $this->devPublicPath = (string)$config['dev_public_path'];
        }
        if (!isset($config['inject'])) {
            return;
        }
        if ($config['inject']) {
            $inject = (string)$config['inject'];
            $inject = in_array($inject, self::INJECT_LIST) ? $inject : self::INJECT_DEFAULT;
            $this->inject = $inject;
        } else {
            $this->inject = false;
        }
    }
    
    /**
     * 解析模板标签
     * 
     * @param string $tpath 模板路径
     */
    public function onParseTemplatePath($tpath, bool $isAbsolute = false, array $variables = [])
    {
        return false;
    }
    
    /**
     * 解析前动作
     *
     * @param string $template 解析前的模板字符串
     * @return false|string
     */
    public function onPreParse($template)
    {
        if (!$this->isDev) {
            return false;
        }
        $template = preg_replace('/<script src=.*?tinyphp-ui\.admin\.js.*?><\/script>/', '{ui.admin}', $template);
        $template = preg_replace('/<script src=.*?tinyphp-ui\.js.*?><\/script>/', '{ui.lib}', $template);
        return $template;
    }
    
   /**
    * 解析关闭的模板标签
    * 
    * {@inheritDoc}
    * @see \Tiny\MVC\View\Engine\Tagger\Parser\ParserInterface::onParseCloseTag()
    */
    public function onParseCloseTag($tagName, $namespace = '')
    {
        if (!$namespace != 'ui') {
            return false;
        }
        if (!in_array($tagName, self::PARSER_TAGS)) {
            return false;
        }
        return '';
    }
    
    /**
     * 
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Engine\Tagger\Parser\ParserInterface::onParseTag()
     */
    public function onParseTag($tagName, $namespace = '', array $params = [])
    {
        if (!in_array($tagName, self::PARSER_TAGS)) {
            return false;
        }
        switch ($tagName) {
            case 'lib':
                return $this->parseUILibraryTag($params);
            case 'admin':
                return $this->parseUILibraryTag($params, true);
            case 'assets':
                return $this->assetsPublicPath;
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
     * 解析UI library库标签
     *
     * @return string
     */
    protected function parseUILibraryTag(array $params = [], $isAdmin = false)
    {
        if ($params) {
                $paramText  = json_encode($params);
                $paramText = <<<EOT
            <script type="text/javascript">
                (function(window){
                    window.tinyphp_ui_config = $paramString
                })(window);
            </script>
            EOT;
        }
        $adminText = $isAdmin ? 'admin.' : '';
        $libText = sprintf('<script src="%sjs/tinyphp-ui.%sjs"></script>', $this->isDev ? $this->devPublicPath : $this->devPublicPath, $adminText);
        if (!$this->isDev) {
            $libText = sprintf('<link href="%scss/tinyphp-ui.%smin.css" rel="stylesheet"/>', $this->publicPath, $adminText);
        }
        return <<<EOT
        <?php
        if (!\$this->__tinyphp_ui_library_injected)
        {
            \$this->__tinyphp_ui_library_injected = true;
            echo '{$paramText}';
            echo '{$libText}';
        }
        ?>
        EOT;
    }
}
?>
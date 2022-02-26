<?php 
namespace Tiny\MVC\View\UI\Helper;


use Tiny\MVC\View\IHelper;
use Tiny\MVC\View\View;
use Tiny\MVC\Request\WebRequest;

class Messagebox implements IHelper
{
    /**
     * 可匹配的助手ID
     * 
     * @var array
     */
    const HELPER_NAME_LIST = ['messagebox'];
    
    /**
     * View 当前view实例
     *
     * @var View
     */
    protected $_view;
    
    /**
     * 配置
     *
     * @var array
     */
    protected $_config;
    
    /**
     * 标题
     *
     * @var string
     */
    protected $_subject = '提示';
    
    /**
     * 超时跳转时间
     * 
     * @var integer
     */
    protected $_timeout = 15;
    
    /**
     * 代理的Helper实例
     *
     * @var array
     */
    protected $_helpers = [];
    
    /**
     * 设置View实例
     *
     * @param View $view
     */
    public function setViewHelperConfig(View $view, array $hconfig)
    {
        $this->_view = $view;
        $this->_config = $hconfig;
        $this->_helpers['ui'] = $this;
    }
    
    /**
     * 是否支持指定的helper名检索
     *
     * @param string $hname
     */
    public function matchHelperByName($hname)
    {
        return;
    }
    
    /**
     * 显示一个弹窗提示
     * 
     * @param string $message
     * @param string $toUrl
     * @param string $subject
     * @param int $timeout
     * @param string $title
     */
    public function show($message, $toUrl = NULL, $subject = NULL, $timeout = NULL, $title = NULL)
    {
        $subject = trim($subject) ?: $this->_subject;
        $toUrl = trim($toUrl) ?: $this->referer;
        $timeout = (int)$timeout ?: $this->_timeout;
        $messageBox = [
            'title' => $subject,
            'subject' => $subject,
            'messageTitle' => $title,
            'tourl' => $toUrl,
            'message' => $message,
            'timeout' => $timeout
        ];
        $this->_view->display('helper/messagebox.htm', ['messagebox' => $messageBox]);
    }
    
    
}
?>
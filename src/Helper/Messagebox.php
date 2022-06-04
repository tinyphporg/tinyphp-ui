<?php
/**
 *
 * @copyright (C), 2013-, King.
 * @name Messagebox.php
 * @author King
 * @version stable 2.0
 * @Date 2022年3月5日上午10:13:14
 * @Class List class
 * @Function List function_container
 * @History King 2022年3月5日上午10:13:14 2017年3月8日下午4:20:28 0 第一次建立该文件
 */
namespace Tiny\MVC\View\UI\Helper;

use Tiny\MVC\View\View;
use Tiny\MVC\View\Helper\ViewHelperInterface;
use Tiny\Tiny;

/**
* 提示窗
* 
* @package Tiny.MVC.View.UI.Helper
* @since 2022年3月5日上午10:13:24 
* @final 2022年3月5日上午10:13:24 
*/
class Messagebox implements ViewHelperInterface
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
    protected $view;
    
    /**
     * 配置
     *
     * @var array
     */
    protected $config;
    
    /**
     * 标题
     *
     * @var string
     */
    protected $subject = '提示';
    
    /**
     * 超时跳转时间
     * 
     * @var integer
     */
    protected $timeout = 15;
    
    /**
     * 代理的Helper实例
     *
     * @var array
     */
    protected $helpers = [];
    
    /**
     * 设置View实例
     *
     * @param View $view
     */
    public function setViewHelperConfig(View $view, array $config)
    {
        $this->view = $view;
        $this->config = $config;
        $this->helpers['ui'] = $this;
    }
    
    /**
     * 是否支持指定的helper名检索
     *
     * @param string $hname
     */
    public function matchHelperByName($hname)
    {
        return in_array($hname, self::HELPER_NAME_LIST);
    }
    
    /**
     * 显示一个弹窗提示
     * 
     * @param string $message 消息体
     * @param string $toUrl 跳转URL
     * @param string $subject 标题
     * @param int $timeout 超时跳转
     * @param string $title 标题
     */
    public function show($message, $toUrl = NULL, $subject = NULL, $timeout = NULL, $title = NULL)
    {
        $subject = trim($subject) ?: $this->subject;
        $toUrl = trim($toUrl) ?: Tiny::getApplication()->request->referer;
        $timeout = (int)$timeout ?: $this->timeout;
        $messageBox = [
            'title' => $subject,
            'subject' => $subject,
            'messageTitle' => $title,
            'tourl' => $toUrl,
            'message' => $message,
            'timeout' => $timeout
        ];
        $this->view->display('helper/messagebox.htm', ['messagebox' => $messageBox]);
    }
    
    
}
?>
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
namespace Tiny\UI\Widget;

use Tiny\MVC\View\View;
use Tiny\Tiny;
use Tiny\MVC\View\Widget\WidgetInterface;
use Tiny\MVC\Request\Request;

/**
 * 提示窗
 *
 * @package Tiny.MVC.View.UI.Helper
 * @since 2022年3月5日上午10:13:24
 * @final 2022年3月5日上午10:13:24
 */
class Messagebox implements WidgetInterface
{    
    /**
     * View 当前view实例
     *
     * @var View
     */
    protected $view;
    
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
     * 设置View实例
     *
     * @param View $view
     */
    public function __construct(Request $request, View $view)
    {
        $this->view = $view;
    }
    
    /**
     * 
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Widget\WidgetInterface::parseTag()
     */
    public function parseTag(array $params = [])
    {
        return '';
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
    public function show($message, $subject = '',  $toUrl = '', $timeout = 0, $title = '')
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
            'timeout' => $timeout,
            'isPage' => true,
        ];
        $this->view->display('widget/messagebox.htm', [
            'messagebox' => $messageBox
        ]);
    }
}
?>
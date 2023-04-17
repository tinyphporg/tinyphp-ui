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
 *          King 2023年4月16日 修改为widget
 */
namespace Tiny\UI\Widget;

use Tiny\MVC\View\View;
use Tiny\MVC\View\Widget\WidgetInterface;

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
     * 设置View实例
     *
     * @param View $view
     */
    public function __construct(View $view)
    {
        $this->view = $view;
    }
    
    /**
     * 是否支持指定的helper名检索
     *
     * @param string $hname
     */
    public function parseTag(array $params = [])
    {
        $subject = (string)$params['subject'] ?: '提示';
        $url = (string)$params['url'];
        $timeout = (int)$params['timeout'] ?: 5;
        $content = (string)$params['content'];
        return sprintf('<?php echo $view->messagebox->fetch("%s", "%s", "%s", %d, true);?>', $subject, $content, $url, $timeout);
    }
    
    /**
     * 显示弹窗
     *
     * @param array $params 弹窗参数
     */
    public function fetch(string $content, string $subject = null, string $url = null, int $timeout = 5, bool $isWidget = false)
    {
        $subject = $subject ?: '提示';
        if ($timeout < 5) {
            $timeout = 5;
        }
        return $this->view->fetch('widget/messagebox.html', [
            'messagebox' => [
                'subject' => $subject,
                'url' => $url,
                'content' => $content,
                'timeout' => $timeout
            ],
            'iswidget' => $isWidget
        ]);
    }
}
?>
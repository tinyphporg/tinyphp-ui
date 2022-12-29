<?php
/**
 *
 * @Copyright (C), 2011-, King.$i
 * @Name  SplitPages.php
 * @Author  King
 * @Version  Beta 1.0
 * @Date  Mon Jan 23 16:31:14 CST 2012
 * @Description 简单分页类
 * @Class List
 *  	1.SplitPage
 *  @Function List
 *   1.
 *  @History
 *      <author>    <time>                        <version >   <desc>
 *        King      Mon Jan 23 16:31:14 CST 2012  Beta 1.0           第一次建立该文件
 *        King 2020年6月1日14:21 stable 1.0 审定
 *
 */
namespace Tiny\UI\Widget;

use Tiny\UI\UIException;
use Tiny\MVC\View\Widget\WidgetInterface;
use Tiny\MVC\Request\Request;

/**
 * 简单分页类
 *
 * @package Helper
 * @since Mon Jan 23 16:31:57 CST 2012
 * @final Mon Jan 23 16:31:57 CST 2012
 */
class Pagination implements WidgetInterface
{
    
    protected $request;
    
    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    
    /**
     * <widget:pagination url="xxxx" total="" size="" id="" />
     * Tagger 解析并输出结果
     *
     * @param string $tagBody
     * @param string $extra
     * @throws UIException
     */
    public function parseTag(array $params = [])
    {
        if (!$params || !key_exists('url', $params)) {
            return false;
        }
        
        $url = $params['url'];
        $total = $params['total'];
        $id = $params['id'];
        $size = $params['size'];
        // 分页切换的长度
        $limit = $params['limit'];
        // 附加的分页class类名
        $class = $params['class'];
        $name = $params['name'];
        return sprintf('<?php echo $view->pagination->fetch("%s", "%s", "%s", "%s", "%s", "%s"); ?>', $url, $id, $total, $limit, $size, $class, $name);
    }
    
    /**
     * 获取分页渲染的内容
     *
     * @param string $url 包含分页替换符的URL
     * @param int $pageIndex 分页索引
     * @param int $total 分页总数
     * @param int $limit 分页间隔
     * @param string $class 附加类名
     * @return string
     */
    public function fetch($url, $id, $total, $limit, $size, $class,  $name = '')
    {
        if ($total < 0) {
            $total = 0;
        }
        if ($size <= 0) {
            $size = 20;
        }
        
        $total = ceil($total / $size);
        
        // 分页切换的长度
        if ($limit <= 0) {
            $limit = 6;
        }
        
        //
        $name = $name ?: 'pageid';
        if (strpos($url, '%d') === false) {
            if (strpos($url, '?') !== false) {
                $url .= '&' . $name . '=%d';
            } else {
                $url .= '?' . $name . '=%d';
            }
        }
        if ($id < 1) {
            $id = $name ? (int)$this->request->get->formatInt($name, 1) : 1;
        }
        return $this->fetchContent($url, $id, $total, $limit, $class);
    }
    
    /**
     *  获取内容
     *  
     * @param string $url 包含分页替换符的URL
     * @param int $pageIndex 分页索引
     * @param int $total 分页总数
     * @param int $limit 分页间隔
     * @param string $class 附加类名
     * @return string
     */
    protected function fetchContent($url, $pageIndex, $total, $limit, $class)
    {

        
        if ($pageIndex > 1) {
            $backPage = $pageIndex - 1;
            $backLink = sprintf($url, $backPage);
            $backName = '&lt;';
        } else {
            $backLink = sprintf($url, 1);
            $backName = '&laquo;';
        }
        
        if ($pageIndex < $total) {
            $nextPage = $pageIndex + 1;
            $nextLink = sprintf($url, $nextPage);
            $nextName = '&gt;';
        } else {
            $nextPage = $total;
            $nextLink = sprintf($url, $nextPage);
            ;
            $nextName = '&raquo;';
        }
        
        $lines = [];
        if ($pageIndex > 2) {
            $firsturl = sprintf($url, 1);
            $lines[] = sprintf('<li class="page-item"><a class="page-link" href="%s"><span aria-hidden="true">&laquo;</span></a></li>', $firsturl);
        }
        
        $lines[] = sprintf('<li class="page-item"><a class="page-link" href="%s" >%s</a></li>', $backLink, $backName);
        $start = ($total >= $limit) ? (ceil($pageIndex / $limit) - 1) * $limit + 1 : 1;
        $end = ($total >= $limit) ? ceil($pageIndex / $limit) * $limit : $total;
        if ($start < 1) {
            $start = 1;
        }
        if ($end >= $total) {
            $end = $total;
        }
        // echo $start, $end;
        for ($i = $start; $i <= $end; $i++) {
            $currenturl = sprintf($url, $i);
            $lines[] = ($i == $pageIndex) ? sprintf('<li class="page-item active" aria-current="page" ><span class="page-link" >%d</span></li>', $i) : sprintf('<li class="page-item"><a class="page-link" href="%s" >%d</a></li>', $currenturl, $i);
        }
        
        if ($pageIndex < $total) {
            $lines[] = sprintf('<li class="page-item"><a class="page-link" href="%s" >%s</a></li>', $nextLink, $nextName);
        }
        if ($class) {
            $class = ' ' . $class;
        }
        $string = join("\n", $lines);
        $endurl = sprintf($url, $total);
        
        $placeholder = "$pageIndex/$total";
        $placeholderSize = strlen($placeholder);
        return <<<EOT
        <ul class="pagination${class}" data-widget="pagination" data-url="$url" data-total="$total" >
        $string
        <li class="page-item"><input type="text" class="page-link page-link-input" size="$placeholderSize" placeholder="$placeholder" type="text" /></li>
        <li class="page-item"><a class="page-link page-link-end"  href="$endurl">&raquo;</a></li>
        </ul>
        EOT;
    }
}
?>
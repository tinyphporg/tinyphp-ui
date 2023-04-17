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
 *        King 2023年4月16日 修改为widget
 *
 */
namespace Tiny\UI\Widget;
use Tiny\MVC\View\Widget\WidgetInterface;

/**
 * 简单分页类
 *
 * @package Helper
 * @since Mon Jan 23 16:31:57 CST 2012
 * @final Mon Jan 23 16:31:57 CST 2012
 */
class Pagination implements WidgetInterface
{
    /**
     * 
     * {@inheritDoc}
     * @see \Tiny\MVC\View\Widget\WidgetInterface::parseTag()
     */
    public function parseTag(array $params = [])
    {
        if (!$params || !key_exists('url', $params)) {
            return false;
        }
        $url = (string)$params['url'];
        $recordTotal = (int)$params['total'] > 0 ? (int)$params['total'] : 0;
        $pageId = (int)$params['id'] > 0 ? (int)$params['id'] : 1;
        $pageSize = (int)$params['size'] > 0 ? (int)$params['size'] : 20;
        $pageTotal = ceil($recordTotal / $pageSize);
        $limit = (int)$params['limit'] > 0 ? (int)$params['limit'] : 6;
        $className = (string)$params['class'];
        return sprintf('<?php echo $view->page->fetch("%s","%s", "%s", "%s", "%s" ) ?>', $url, $pageId, $pageTotal, $limit, $className);
    }
    
    /**
     * 获取分页字符串
     *
     * @param string $link 超链接
     * @param int 页面总数
     * @param int $pageIndex 页面索引ID
     * @param string $pre 后缀
     * @return string
     */
    public function fetch($url, $index, $total, $limit, $extra)
    {
        if ($index > 1) {
            $backPage = $index - 1;
            $backLink = sprintf($url, $backPage);
            $backName = '&lt;';
        } else {
            $backLink = sprintf($url, 1);
            $backName = '&laquo;';
        }
        if ($index < $total) {
            $nextPage = $index + 1;
            $nextLink = sprintf($url, $nextPage);
            $nextName = '&gt;';
        } else {
            $nextPage = $total;
            $nextLink = sprintf($url, $nextPage);
            ;
            $nextName = '&raquo;';
        }
        
        $lines = [];
        if ($index > 2) {
            $firsturl = sprintf($url, 1);
            $lines[] = sprintf('<li class="page-item"><a class="page-link" href="%s"><span aria-hidden="true">&laquo;</span></a></li>', $firsturl);
        }
        
        $lines[] = sprintf('<li class="page-item"><a class="page-link" href="%s" >%s</a></li>', $backLink, $backName);
        $start = ($total >= $limit) ? (ceil($index / $limit) - 1) * $limit + 1 : 1;
        $end = ($total >= $limit) ? ceil($index / $limit) * $limit : $total;
        if ($start < 1) {
            $start = 1;
        }
        if ($end >= $total) {
            $end = $total;
        }
        // echo $start, $end;
        for ($i = $start; $i <= $end; $i++) {
            $currenturl = sprintf($url, $i);
            $lines[] = ($i == $index) ? sprintf('<li class="page-item active" aria-current="page" ><span class="page-link" >%d</span></li>', $i) : sprintf('<li class="page-item"><a class="page-link" href="%s" >%d</a></li>', $currenturl, $i);
        }
        
        if ($index < $total) {
            $lines[] = sprintf('<li class="page-item"><a class="page-link" href="%s" >%s</a></li>', $nextLink, $nextName);
        }
        if ($extra) {
            $extra = ' ' . $extra;
        }
        $string = join("\n", $lines);
        $endurl = sprintf($url, $total);
        return <<<EOT
        <nav>
        <ul class="pagination${extra}" data-bs-widget="pagination" data-bs-preurl="$url" data-bs-total="$total" >    
        $string
        <li class="page-item"><input type="text" class="page-link page-link-input" placeholder="$index/$total" type="text" /></li>
        <li class="page-item"><a class="page-link page-link-end"  href="$endurl">&raquo;</a></li>
        </ul>
        </nav>
        EOT;
    }
}
?>
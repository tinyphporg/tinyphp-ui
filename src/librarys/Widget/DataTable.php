<?php
/**
 *
 * @copyright (C), 2013-, King.
 * @name DataTable.php
 * @author King
 * @version stable 2.0
 * @Date 2022年12月2日上午10:50:21
 * @Class List class
 * @Function List function_container
 * @History King 2022年12月2日上午10:50:21 2017年3月8日下午4:20:28 0 第一次建立该文件
 */
namespace Tiny\UI\Widget;

use Tiny\MVC\View\Widget\WidgetInterface;

class DataTable implements WidgetInterface
{
    /**
     * 当前请求实例
     * 
     *  @autowired
     * @var \Tiny\MVC\Request\Request
     */
    protected $request;
    
    /**
     * 当前响应实例
     * 
     * @autowired
     * @var \Tiny\MVC\Response\Response
     */
    protected $response;
    
    protected $params;
    
    /**
     * 获取datatable输入的结构体
     */
    public function input()
    {
        // 
        $post = $this->request->post;
        
        $draw = $post->formatInt('draw');
        if (0 >= $draw) {
            return [];
        }
        // 开始值
        $start = $post->formatInt('start');
        $length = $post->formatInt('length');
        
        $columns = [];
        foreach ((array)$post['columns'] as $key => $columnItem) {
            if (!is_array($columnItem) || !key_exists('data', $columnItem)) {
                continue;
            }
            $key = (int)$key;
            $columnName = (string)$columnItem['data'];
            if (!preg_match("/[a-z][a-z0-9_]*/i", $columnName)) {
                continue;
            }
            $columns[$key]  = $columnName;
        }
        
        $searchItem = (array)$post['search'];
        if (isset($searchItem['value'])) {
            $search = $searchItem['value'];
        }
        
        $orders = [];
        foreach ((array)$post['order'] as $orderItem) {
            if (!is_array($orderItem) || !key_exists('column', $orderItem) || !key_exists('dir', $orderItem)) {
                continue;
            }
            if (!key_exists($orderItem['column'], $columns)) {
                continue;
            }
            $cname = $columns[$orderItem['column']];
            $orders[$cname] = $orderItem['dir'];
        }
        
        $this->params = [
            'start' => $start,
            'length' => $length,
            'columns' => $columns,
            'search' => $search,
            'orders' => $orders,
            'draw' => $draw,
        ];
        
        return $this->params;
    }
    
    /**
     *  输出
     * @param array $data
     * @param array $info
     */
    public function output(array $data, $total = 0, array $info  = [], $filterdTotal = 0)
    {
        if (!$total) {
            $total = count($data);
        }
        if (!$filterdTotal) {
            $filterdTotal = $total;
        }
        
        $info['draw'] = (int)$this->params['draw'];
        $info['recordsTotal'] = $total;
        $info['recordsFiltered'] = $filterdTotal;
        $this->response->outFormatJSON(0, $info, $data);
    }
    
    /**
     *
     * @param string $tagName
     * @param array $params
     */
    public function parseTag(array $params = [])
    {
        // 解析字段
        
        if (key_exists('columns', $params)) { 
            $names = [];
            $columns = explode(',', $params['columns']);
            foreach ($columns as &$column) {
                $column = trim($column);
                if (strpos($column, ':') > 0) {
                    $item = explode(':', $column);
                    $name = $item[1];
                    $column = $item[0];
                } else {
                    $name = $column;
                }
                $names[] = $name;
            }
            $params['columns'] = join(',', $columns);
            $params['names'] = join(',', $names);
        }
        
        //$params['class'] = 'table table-bordered table-striped dataTable no-footer';
        
        $ptexts = [];
        foreach ($params as $key => $value) {
            if (is_int($key)) {
                continue;
            }
            if (in_array($key, [
                'id',
                'class'
            ])) {
                $ptexts[] = sprintf('%s="%s"', $key, $value);
                continue;
            }
            $ptexts[] = sprintf('data-%s="%s"', $key, $value);
        }
        
        $ptext = join(' ', $ptexts);
        return sprintf("<table data-widget=\"datatable\"  %s  >\n</table>\n", $ptext);
    }
    
    /**
     *
     * @param string $tagName
     * @param array $params
     */
    public function parseCloseTag()
    {
        return '';
    }
}
?>
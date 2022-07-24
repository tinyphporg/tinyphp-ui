<?php 
/**
 *
 * @copyright (C), 2013-, King.
 * @name UIDemo.php
 * @author King
 * @version stable 2.0
 * @Date 2022年7月8日下午11:27:15
 * @Class List class
 * @Function List function_container
 * @History King 2022年7月8日下午11:27:15 2017年3月8日下午4:20:28 0 第一次建立该文件
 */
namespace Tiny\UI\Controller;

use Tiny\MVC\Controller\Controller;

/**
* 前台UI组件demo控制器
* 
* @package namespace
* @since 2022年7月8日下午11:27:48
* @final 2022年7月8日下午11:27:48
*/
class UIDemo extends Controller
{
    /**
     * 首页
     */
    public function indexAction()
    {
        $this->display('app/index.htm');
    }
}
?>
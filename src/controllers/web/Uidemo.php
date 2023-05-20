<?php
/**
 *
 * @copyright (C), 2013-, King.
 * @name Uidemo.php
 * @author King
 * @version stable 1.0
 * @Date 2023年5月10日上午10:25:17
 * @Description UI DEMO页面
 * @Class List 1.
 * @Function List 1.
 * @History King 2023年5月10日上午10:25:17 第一次建立该文件
 *          King 2023年5月10日上午10:25:17 修改
 *         
 */
namespace Tiny\UI\Controller;

use Tiny\MVC\Controller\Controller;

/**
* UI DEMO
* 
* @package Tiny.UI.Controller
* @since 2023年5月10日 上午10:26:42
* @final 2023年5月10日上午10:26:42
*/
class Uidemo extends Controller
{
    /**
     * UI DEMO 首页
     */
    public function indexAction()
    {
        $this->display('app/index.html');
    }
}
?>
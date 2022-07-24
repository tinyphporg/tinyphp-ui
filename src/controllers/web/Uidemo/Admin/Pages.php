<?php 
/**
 *
 * @copyright (C), 2013-, King.
 * @name Pages.php
 * @author King
 * @version stable 2.0
 * @Date 2022年7月8日下午11:51:46
 * @Class List class
 * @Function List function_container
 * @History King 2022年7月8日下午11:51:46 2017年3月8日下午4:20:28 0 第一次建立该文件
 */
namespace Tiny\UI\Controller\Uidemo\Admin;

use Tiny\MVC\Controller\Controller;
use Tiny\MVC\Request\Request;

class Pages extends Controller
{
    /**
     * {@inheritDoc}
     * @see \Tiny\MVC\Controller\ControllerBase::onBeginExecute()
     */
    public function onBeginExecute()
    {
        $this->display(sprintf('admin/pages/%s.html', $this->request->getActionName()));
        return false;
    }
}
?>
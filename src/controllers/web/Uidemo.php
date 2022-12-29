<?php
namespace Tiny\UI\Controller;

use Tiny\MVC\Controller\Controller;
use Tiny\MVC\View\View;

class Uidemo extends Controller
{
    
    public function indexAction()
    {
        echo $this->module->lang['status.0'];
    }
    
    /**
     * 部件：数据表
     * 
     */
    public function datatableAction()
    {
        $this->display('widget/datatable.html');
    }
    
    /**
     * 部件：数据表 获取数据
     *
     */
    public function getDatatableAction(View $view)
    {   
        $params  = $view->datatable->input();
        $data = [
            ["id" => '1', 'name' => '李四', "ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(), 'action' => "操作"],
            ["id" => '1', 'name' => '李四', "ip" => '10.0.0.1', "status" => 'c', "num" =>  '999','dateline' => time(), 'action' => "操作"],
            ["id" => '1',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(),'action' => "操作"],
            ["id" => '1',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(),'action' => "操作"],
            ["id" => '1',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(),'action' => "操作"],
            ["id" => '2',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(),'action' => "操作"],
            ["id" => '1',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(),'action' => "操作"],
            ["id" => '1',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999','dateline' => time(), 'action' => "操作"],
            ["id" => '1',  'name' => '李四',"ip" => '10.0.0.1', "status" => 'c', "num" =>  '999', 'dateline' => time(),'action' => "操作"],
            
        ];
        
        $info = [
            'rex' => $params,
        ];
        $total = 1200;
        $view->datatable->output($data, $total, $info, $filterdTotal);
    }
}
?>
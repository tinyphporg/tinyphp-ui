<?php
namespace Tiny\UI\Controller;

use Tiny\MVC\Controller\Controller;

class Uidemo extends Controller
{
    
    public function indexAction()
    {
        print_r($this->module->lang);
        echo $this->module->lang['status.0'];
    }
}
?>
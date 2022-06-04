<?php
namespace Tiny\MVC\View\UI\Helper;

use Tiny\MVC\View\View;
use Tiny\MVC\View\UI\Helper\Messagebox;
use Tiny\MVC\View\Helper\ViewHelperInterface;

class UIViewHelper implements ViewHelperInterface
{

    /**
     * 
     * @var array
     */
    const HELPER_LIST = ['ui', 'messagebox'];

    /**
     * View 当前view实例
     *
     * @var View
     */
    protected $view;

    /**
     * 配置
     *
     * @var array
     */
    protected $config;
    
    /**
     * 代理的Helper实例
     * 
     * @var array
     */
    protected $helpers = [];
    
    /**
     * 设置View实例
     *
     * @param View $view
     */
    public function setViewHelperConfig(View $view, array $config)
    {
        $this->view = $view;
        $this->config = $config;
        $this->helpers['ui'] = $this;
    }

    /**
     * 是否支持指定的helper名检索
     *
     * @param string $hname
     */
    public function matchHelperByName($hname)
    {
       if (in_array($hname, self::HELPER_LIST))
       {
           if (key_exists($hname, $this->helpers))
           {
               return $this->helpers[$hname];
           }
           return $this->helpers[$hname] = $this->getHelperByName($hname); 
       }
    }
    
    /**
     * 根据助手名返回助手实例
     * 
     * @param string $hname
     * @return \Tiny\MVC\View\UI\Helper\Messagebox
     */
    protected function getHelperByName($hname)
    {
        switch ($hname)
        {
            case 'messagebox':
                return $this->getMessageboxHelper();
        }
    }
    
    /**
     *  获取messagebox的助手实例
     *  
     * @return \Tiny\MVC\View\UI\Helper\Messagebox
     */
    protected function getMessageBoxHelper()
    {
        $helperInstance = new Messagebox();
        $helperInstance->setViewHelperConfig($this->view, $this->config);
        return $helperInstance;
    }
}

?>
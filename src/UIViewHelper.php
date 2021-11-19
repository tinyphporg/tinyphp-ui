<?php
namespace Tiny\MVC\View\UI;

use Tiny\MVC\View\IHelper;
use Tiny\MVC\View\View;
use Tiny\MVC\Request\WebRequest;
use Tiny\MVC\View\UI\Helper\Messagebox;

class UIViewHelper implements IHelper
{

    const HELPER_NAME_LIST = ['ui', 'messagebox'];

    /**
     * View 当前view实例
     *
     * @var View
     */
    protected $_view;

    /**
     * 配置
     *
     * @var array
     */
    protected $_config;
    
    /**
     * 代理的Helper实例
     * 
     * @var array
     */
    protected $_helpers = [];
    
    /**
     * 设置View实例
     *
     * @param View $view
     */
    public function setViewHelperConfig(View $view, array $hconfig)
    {
        $this->_view = $view;
        $this->_config = $hconfig;
        $this->_helpers['ui'] = $this;
    }

    /**
     * 是否支持指定的helper名检索
     *
     * @param string $hname
     */
    public function matchHelperByName($hname)
    {
       if (in_array($hname, self::HELPER_NAME_LIST))
       {
           if (key_exists($hname, $this->_helpers))
           {
               return $this->_helpers[$hname];
           }
           return $this->_helpers[$hname] = $this->_getHelperByName($hname); 
       }
    }
    
    /**
     * 根据助手名返回助手实例
     * 
     * @param string $hname
     * @return \Tiny\MVC\View\UI\Helper\Messagebox
     */
    protected function _getHelperByName($hname)
    {
        switch ($hname)
        {
            case 'messagebox':
                return $this->_getMessageboxHelper();
        }
    }
    
    /**
     *  获取messagebox的助手实例
     *  
     * @return \Tiny\MVC\View\UI\Helper\Messagebox
     */
    protected function _getMessageBoxHelper()
    {
        $helperInstance = new Messagebox();
        $helperInstance->setViewHelperConfig($this->_view, $this->_config);
        return $helperInstance;
    }
}

?>
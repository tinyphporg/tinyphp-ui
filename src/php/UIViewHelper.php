<?php
namespace Tiny\MVC\View\UI;

use Tiny\MVC\View\IHelper;
use Tiny\MVC\View\View;

class UIViewHelper implements IHelper
{

    const HELPER_NAME_LIST = [
        'ui'
    ];

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
     * 设置View实例
     *
     * @param View $view
     */
    public function setViewHelper(View $view, array $hconfig)
    {
        $this->_view = $view;
        $this->_config = $hconfig;
    }

    /**
     * 是否支持指定的helper名检索
     *
     * @param string $hname
     */
    public function checkHelperName($hname)
    {
        echo $hname;
        return in_array($hname, self::HELPER_NAME_LIST);
    }
    
    public function messagebox($aaa)
    {
        echo "aaaa";
    }
}

?>
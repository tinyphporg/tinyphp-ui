tinyphp-ui
====

简介   
----

> 基于[tinyphp for PHP Frameworks](https://github.com/tinyphporg/tinyphp)的前端UI库  
> 项目地址: https://github.com/tinyphporg/tinyphp

面向对象
----
  + 熟练掌握bootstrap/jquery/css/vue，
  + 熟悉JS语言
  + 的PHP全栈工程师 
  + <b>自定义开发需要熟悉webpack。</b>
 
适合做什么
----
+ 管理后台开发/erp/crm/srm/oa
+ 响应式WEB应用

tinyphp中的使用
----
componser
----
```shell
 composer require tinyphporg/tinyphp-ui
```
npm
---
```shell
npm i tinyphporg/tinyphp-ui
```
profile.php
----
> 开启tinyphp-ui 默认自动注入tinyphp-ui的前端库   
```php
# application/config/profile.php
$profile['view']['ui']['enabled'] = TRUE;
$profile['view']['ui']['public_path'] = '/tinyphp-ui/'; //公共访问地址
$profile['view']['ui']['inject'] = TRUE;  //自动注入
$profile['view']['ui']['template_plugin'] = '\\Tiny\\MVC\\View\\UI\\UIViewTemplatePlugin';
$profile['view']['ui']['helper'] = '\\Tiny\\MVC\\View\\UI\\UIViewHelper';
$profile['view']['ui']['template_dirname'] = '../vendor/tinyphporg/tinyphp-ui/templates/';

// ui dev
$profile['view']['ui']['dev_enabled'] = TRUE;
$profile['view']['ui']['dev_public_path'] = "http://127.0.0.1:8080/js/tinyphp-ui.js";
$profile['plugins']['ui_dev_plugin'] = '\Tiny\MVC\View\UI\UITemplatePlugin'; //添加调试pages的插件

// ui installer
$profile['view']['ui']['installer']['param_name'] = 'ui-install';
$profile['view']['ui']['installer']['frontend_path'] = 'tinyphp-ui/';     //public目录下的相对安装路径
$profile['view']['ui']['installer']['plugin'] = '\Tiny\MVC\View\UI\UIInstaller';
```

> 在视图引擎Template中，以tag的形式引入
```php
{ui.lib}
or 
<link href="/tinyphp-ui/css/tinyphp-ui.min.css" rel="stylesheet"/>
<script src="/tinyphp-ui/js/tinyphp-ui.min.js"></script>
```

前端组件库
----
+ 基础组件:
  + webpack5   
  + bootstrap5   
  + JQuery   
  + font-awesome
  + adminlte
+ 可选加载库 
  + sweetalert2： 漂亮、响应式、可定制、易用的JavaScript 弹窗
  + echarts: 基于JavaScript的数据可视化图表库


在tinyphp中的调试与自定义开发
----

```shell
cd vendor/tinyphporg/tinyphp-ui
npm i 
npm run dev
#即可开启基于127.0.0.1:8080的调试webserver
```
```php
#在profile.php中检测以下配置
$profile['view']['ui']['dev_enabled'] = TRUE;
$profile['view']['ui']['dev_public_path'] = "http://front.dev.tinycn.com/js/tinyphp-ui.js";
$profile['plugins']['ui_dev_plugin'] = '\Tiny\MVC\View\UI\UITemplatePlugin'; //添加调试pages的插件

#在tinyphp的测试域名（默认为127.0.0.1）下 打开浏览器输入http://127.0.0.1/pages/index 测试
```
```shell
npm run build
#重新打包 浏览器输入http://127.0.0.1:8989 可查看打包文件的详情

cd tinyphp
composer post-update-cmd 
#更新到tinyphp/public/tinyphp-ui文件夹下
```


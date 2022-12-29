<?php
return [
    'title' => 'TinyPHP Frameworks|tinyphp.org',
    'name' => 'TinyPHP',
    'logo' => [
        'img' => '',
        'miniImg' => '',
        'url' => ''
    ],
    'description' => 'TinyPHP Frameworks, 高性能的响应式敏捷开发框架',
    'bodyClass' => 'page-docs',
    'nav' => [
        [
            'name' => '首页',
            'href' => '/uidemo/app/index.html',
            'children' => []
        ],
        [
            'name' => '中文文档',
            'href' => '/uidemo/docs/readme.html',
            'children' => [ ]
        ],
        [
            'name' => 'UI 组件',
            'href' => '/uidemo/admin/index.html',
            'children' => []
        ],
        [
            'name' => 'tinyphp.org',
            'href' => 'https://tinyphp.org/',
            'children' => []
        ],
    ],
    'sidebar' => [
        [
            'name' => 'TINYPHP DOCUMENTS',
            'isHeading' => true
        ],
        [
            'name' => '快速开始',
            'href' => '#',
            'children' => [ // level1
                [
                    'name' => '简介',
                    'href' => '/uidemo/app/index.html',
                ],
                [
                    'name' => 'index.php 入口文件',
                    'href' => '/uidemo/docs/readme.html',
                    'class' => 'fa fa-success'
                ]
            ]
        ],
        [
            'name' => '代码规范',
            'href' => '#',
            'children' => [ // level1
                [
                    'name' => 'PHP语言编码',
                    'href' => '/uidemo/docs/standard/coding.html',
                ],
                [
                    'name' => 'MYSQL操作',
                    'href' => '/uidemo/docs/standard/db.html',
                ],
                [
                    'name' => '团队协作',
                    'href' => '/uidemo/docs/standard/team.html'
                ],
            ]
        ],
        [
            'name' => '应用配置',
            'href' => '#',
            'children' => [ // level1
                [
                    'href' => '/uidemo/docs/manual/application.html',
                    'name' => 'Application 应用程序'
                ],
                [
                    'href' => '/uidemo/docs/manual/profile.html',
                    'name' => 'profile.php 配置文件'
                ],
                [
                    'href' => '/uidemo/docs/manual/debug.html',
                    'name' => 'Debug 调试模式'
                ],
                [
                    'href' => '/uidemo/docs/manual/bootstrap.html',
                    'name' => 'Bootstrap 引导'
                ],
                [
                    'href' => '/uidemo/docs/manual/lang.html',
                    'name' => 'Lang 语言包'
                ],
                [
                    'href' => '/uidemo/docs/manual/data.html',
                    'name' => 'Data 数据源'
                ],
                [
                    'href' => '/uidemo/docs/manual/cache.html',
                    'name' => 'Cache 缓存'
                ],
                [
                    'href' => '/uidemo/docs/manual/logger.html',
                    'name' => 'Logger 日志'
                ],
                [
                    'href' => '/uidemo/docs/manual/configuration.html',
                    'name' => 'Configuration 配置',
                ],
                [
                    'href' => '/uidemo/docs/manual/builder.html',
                    'name' => 'Builder 单文件打包'
                ],
                [
                    'href' => '/uidemo/docs/manual/daemon.html',
                    'name' => 'Daemon 守护进程'
                ],
                [
                    'href' => '/uidemo/docs/manual/filter.html',
                    'name' => 'Filter 过滤器'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_event.html',
                    'name' => 'Event 事件'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_controller.html',
                    'name' => 'Controller 控制器'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_model.html',
                    'name' => 'Model 模型'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_viewer.html',
                    'name' => 'Viewer 视图'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_router.html',
                    'name' => 'Router 路由'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_dispatcher.html',
                    'name' => 'Dispatcher 派发'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_request.html',
                    'name' => 'Request 请求'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_response.html',
                    'name' => 'Response 响应'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_cookie.html',
                    'name' => 'HttpCookie'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_session.html',
                    'name' => 'HttpSession'
                ],
            ]
        ],
        [
            'name' => '运行时环境',
            'href' => '#',
            'controller' => 'manual',
            'class' => 'fa fa-success',
            'children' => [ // level1
                [
                    'name' => 'Environment 环境参数',
                    'action' => 'runtime_env',
                    'href' => '/uidemo/docs/manual/runtime_env.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'Exception 异常处理',
                    'action' => 'runtime_exception',
                    'href' => '/uidemo/docs/manual/runtime_exception.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'Autoloader 自动加载',
                    'action' => 'runtime_autoloader',
                    'href' => '/uidemo/docs/manual/runtime_autoloader.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'DI 依赖注入',
                    'action' => 'runtime_container',
                    'href' => '/uidemo/docs/manual/runtime_container.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'Event 事件驱动',
                    'action' => 'runtime_event',
                    'href' => '/uidemo/docs/manual/runtime_event.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => '标准库参考',
            'href' => '#',
            'children' => [ // level1
                [
                    'href' => '/uidemo/docs/lib/tiny.html',
                    'name' => 'Tiny',
                ],
                [
                    'href' => '/uidemo/docs/lib/runtime.html',
                    'name' => 'Tiny\Runtime 运行时环境',
                ],
                [
                    'href' => '/uidemo/docs/lib/build.html',
                    'name' => 'Tiny\Build 打包'
                ],
                [
                    'href' => '"/uidemo/docs/lib/cache.html',
                    'name' => 'Tiny\Cache 缓存',
                ],
                [
                    'href' => '/uidemo/docs/lib/config.html',
                    'name' => 'Tiny\Config 配置',
                ],
                [
                    'href' => '/uidemo/docs/lib/console.html',
                    'name' => 'Tiny\Console 命令行',
                ],
                [
                    'href' => '/uidemo/docs/lib/data.html',
                    'name' => 'Tiny\Data 数据源',
                ],
                [
                    'href' => '/uidemo/docs/lib/di.html',
                    'name' => 'Tiny\DI 依赖注入'
                ],
                [
                    'href' => '/uidemo/docs/lib/event.html',
                    'name' => 'Tiny\Event 事件管理'
                ],
                [
                    'href' => '/uidemo/docs/lib/filter.html',
                    'name' => 'Tiny\Filter 过滤器'
                ],
                [
                    'href' => '/uidemo/docs/lib/image.html',
                    'name' => 'Tiny\Image 图片处理'
                ],
                [
                    'href' => '"/uidemo/docs/lib/lang.html',
                    'name' => 'Tiny\Lang 语言包'
                ],
                [
                    'href' => '/uidemo/docs/lib/log.html',
                    'name' => 'Tiny\Log 日志'
                ],
                [
                    'href' => '/uidemo/docs/lib/mvc.html',
                    'name' => 'Tiny\MVC MVC'
                ],
                [
                    'href' => '/uidemo/docs/lib/net.html',
                    'name' => 'Tiny\Net 网络'
                ],
                [
                    'href' => '/uidemo/docs/lib/string.html',
                    'name' => 'Tiny\String 字符处理'
                ],
            ]
        ],
        [
            'name' => 'TINYPHP-UI COMPONENTS',
            'isHeading' => true
        ],
       
        [
            'name' => 'Elements 元件',
            'href' => '',
            'icon' => 'bi bi-box2',
            'children' => [ // level1
                [
                    'name' => 'Accordion 折叠卡片',
                    'href' => '/uidemo/admin/elements/accordion.html'
                ],
                [
                    'name' => 'Alert 警告框',
                    'href' => '/uidemo/admin/elements/alert.html'
                ],
                [
                    'name' => 'Buttons 按钮',
                    'href' => '/uidemo/admin/elements/buttons.html'
                ],
                [
                    'name' => 'Button Group 按钮组',
                    'href' => '/uidemo/admin/elements/button-group.html'
                ],
                [
                    'name' => 'Card 卡片',
                    'href' => '/admin/elements/card.html'
                ],
                [
                    'name' => 'Carousel 幻灯片',
                    'href' => '/uidemo/admin/elements/carousel.html'
                ],
                [
                    'name' => 'Icons 图标',
                    'href' => '/uidemo/admin/elements/icons.html'
                ],
                [
                    'name' => 'Progress Bar 进度条',
                    'href' => '/uidemo/admin/elements/progressbar.html'
                ],
                [
                    'name' => 'Modals 拟态框',
                    'href' => '/uidemo/admin/elements/modals.html'
                ],
                [
                    'name' => 'Navbar 导航条',
                    'href' => '/uidemo/admin/elements/navbar.html'
                ]
            ]
        ],
        [
            'name' => 'Forms 表单',
            'href' => '#',
            'icon' => 'bi bi-card-heading',
            'children' => [ // level1
                [
                    'name' => 'General 基础',
                    'href' => '/uidemo/admin/forms/general.html'
                ],
                [
                    'name' => '验证',
                    'href' => '/uidemo/admin/forms/validation.html'
                ],
                [
                    'name' => '颜色选择器',
                    'href' => '/uidemo/admin/forms/colorpicker.html'
                ],
                [
                    'name' => '日期选择器',
                    'href' => '/uidemo/admin/forms/daterangepicker.html'
                ],
                [
                    'name' => '时间选择器',
                    'href' => '/uidemo/admin/forms/datetimepicker.html'
                ],
                [
                    'name' => '输入格式验证',
                    'href' => '/uidemo/admin/forms/inputmask.html'
                ],
                [
                    'name' => '双向选择菜单',
                    'href' => '/uidemo/admin/forms/duallistbox.html'
                ],
                [
                    'name' => '选择菜单',
                    'href' => '/uidemo/admin/forms/select2.html'
                ],
                [
                    'name' => '编辑器',
                    'href' => '/uidemo/admin/forms/editors.html'
                ],
                [
                    'name' => '表单验证',
                    'href' => '/uidemo/admin/forms/validation.html'
                ],
                [
                    'name' => '多选框美化',
                    'href' => '/uidemo/admin/forms/icheck.html'
                ],
                [
                    'name' => '滑块',
                    'href' => '/uidemo/admin/forms/switch.html'
                ],
                [
                    'name' => '步进器',
                    'href' => '/uidemo/admin/forms/stepper.html'
                ],
                [
                    'name' => '文件上传',
                    'href' => '/uidemo/admin/forms/dropzone.html'
                ],
                [
                    'name' => '滑动条',
                    'href' => '/uidemo/admin/forms/sliders.html'
                ]
            ]
        ],
        [
            'name' => 'Tables 表格',
            'href' => '#',
            'icon' => 'bi bi-table',
            'children' => [ // level1
                [
                    'name' => 'Simple Tables',
                    'href' => '/uidemo/admin/tables/simple.html'
                ],
                [
                    'name' => 'DataTables',
                    'href' => '/uidemo/admin/tables/datatables.html'
                ],
            ]
        ],
        [
            'name' => 'Charts 图表',
            'href' => '#',
            'icon' => 'bi bi-bar-chart',
            'children' => [ // level1
                [
                    'name' => 'Chart.js',
                    'href' => '/uidemo/admin/charts/chartjs.html'
                ],
                [
                    'name' => 'Echarts',
                    'href' => '/uidemo/admin/charts/echarts.html'
                ],
                [
                    'name' => 'Flot',
                    'href' => '/uidemo/admin/charts/flot.html'
                ],
                [
                    'name' => 'Knob 旋钮',
                    'href' => '/uidemo/admin/charts/knob.html'
                ],
                [
                    'name' => 'Sparklines',
                    'href' => '/uidemo/admin/charts/sparkline.html'
                ],
                [
                    'name' => 'Uplot',
                    'href' => '/uidemo/admin/charts/uplot.html'
                ],
            ]
        ],
        [
            'name' => 'TINYPHP-UI WIDGETS',
            'isHeading' => true
        ],
        [
            'name' => 'DataTable',
            'href' => '/uidemo/datatable',
            'icon' => 'bi bi-columns-gap',
            'children' => []
        ],
        [
            'name' => 'UI小部件',
            'href' => '/uidemo/admin/widgets/widgets.html',
            'icon' => 'bi bi-columns-gap',
            'children' => []
        ],
        
        [
            'name' => 'TINYPHP-UI PAGES',
            'isHeading' => true
        ],
        [
            'name' => '管理后台',
            'href' => '#',
            'children' => [ // level1
                [
                    'name' => '首页',
                    'href' => '/uidemo/admin/index.html'
                ],
                [
                    'name' => 'Login',
                    'href' => '/uidemo/admin/pages/login.html'
                ]
            ]
        ]
    ],
    'sidebarExtra' => <<<EOT
    
    EOT,
    'navIcon' => [
        [
            'name' => 'tinyphp',
            'href' => 'https://github.com/tinyphporg',
            'class' => 'bi bi-github'
        ],
        [
            'name' => 'bootstrap',
            'href' => 'https://v5.bootcss.com/docs/5.1/getting-started/introduction/',
            'class' => 'bi bi-bootstrap'
        ],
        [
            'name' => 'cn',
            'href' => '#',
            'class' => 'fi fi-cn'
        ]
    ],
    'navExtra' => <<<EOT
    <hr class="d-md-none text-white-50">
    <a class="btn btn-lg btn-outline-gold btn-shadow ms-2" href="https://github.com/tinyphporg/tinyphp-ui">View on GitHub</a>
    EOT,
    'menu' => [],
    'headerExtra' => <<<EOT
    <div class="docs-content-header my-5">
    <h1 class=docs-content-title" id="content">Tinyphp</h1>
    <div class="docs-content-lead">
    <p>Tinyphp frameworks 是基于敏捷开发理念的PHP MVC框架，具备高性能高开发效率特征。</p>
    </div>
    </div>
    EOT,
    'footerExtra' => <<<EOT
        <div class="row">
          <div class="col-lg-3 mb-3">
            <ul class="list-unstyled small text-muted">
              <li class="mb-2">tinyphp-ui:可以设计响应式的前端web应用和管理后台应用，如ERP，OA系统等</li>
              <li class="mb-2">主要组件: tinyphp + webpack5 + bootstrap5 + jquery</li>
              <li class="mb-2">当前版本:2.0.0</li>
            </ul>
          </div>
          <div class="col-6 col-lg-2 offset-lg-1 mb-3">
            <h5>导航</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="/uidemo/app/index.html">Home</a></li>
              <li class="mb-2"><a href="/uidemo/docs/readme.html">Docs</a></li>
              <li class="mb-2"><a href="https://tinyphp.org/">Blog</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2 mb-3">
            <h5>Guides</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="/uidemo/docs/readme.html">快速开始</a></li>
              <li class="mb-2"><a href="/uidemo/docs/theme.html">主题</a></li>
              <li class="mb-2"><a href="/uidemo/docs/component.html">JS组件</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-4 mb-3">
            <h5>框架组件</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="https://github.com/tinyphporg/tinyphp">tinyphp</a></li>
              <li class="mb-2"><a href="https://github.com/tinyphporg/tinyphp-ui">tinyphp-ui</a></li>
              <li class="mb-2"><a href="https://github.com/tinyphporg/tinyphp-docs">tinyphp-docs</a></li>
              <li class="mb-2"><a href="https://github.com/tinyphporg/tinyphp-framework">tinyphp-framework</a></li>
              <li class="mb-2"><a href="https://github.com/tinyphporg/lnmp-utils">lnmp-utils</a></li>
            </ul>
          </div>
        </div>
    EOT
];
?>
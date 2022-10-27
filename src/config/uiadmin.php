<?php
return [
    'title' => 'Admin Portal of tinyphp-ui|tinyphp.org',
    'name' => 'Tinyphp-UI',
    'logo' => [
        'img' => '',
        'miniImg' => '',
        'url' => ''
    ],
    'description' => 'Tinyphp 集成了bootstrap jquery等前端库，用于构建响应式、移动设备优先的网站。',
    'nav' => [
        [
            'name' => 'Home',
            'href' => '/uidemo/admin/index.html',
            'class' => '',
            'children' => []
        ],
        [
            'name' => '中文文档',
            'href' => '#',
            'class' => 'fa fa-success',
            'children' => [
                [
                    'name' => '使用手册',
                    'href' => '/uidemo/docs/manual/readme.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'ui库参考',
                    'href' => '/uidemo/docs/ui/readme.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '标准库',
                    'href' => '/uidemo/docs/lib/readme.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '编码规范',
                    'href' => '/uidemo/docs/standard/readme.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => 'App protal',
            'href' => '/uidemo/app/index.html',
            'class' => 'fa fa-success',
            'children' => []
        ],
        [
            'name' => 'Icons',
            'href' => '/uidemo/docs/ui/icons.html',
            'class' => 'fa fa-success',
            'children' => []
        ],
        [
            'name' => 'tinyphp.org',
            'href' => 'http://tinyphp.org/',
            'class' => 'fa fa-success',
            'children' => []
        ],
    ],
    'sidebar' => [
        [
            'name' => 'Forms 表单',
            'action' => '',
            'href' => '/uidemo/docs/readme.html',
            'class' => 'bi bi-window',
            'children' => [ // level1
                [
                    'name' => '基础表单',
                    'action' => 'index',
                    'href' => '/uidemo/admin/forms/index.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'profile.php配置文件',
                    'action' => 'profile',
                    'href' => '/uidemo/docs/manual/profile.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => '使用规范',
            'href' => '#',
            'controller' => 'standard',
            'class' => 'far fa-comments',
            'children' => [ // level1
                [
                    'name' => '编码规范',
                    'action' => 'coding',
                    'href' => '/uidemo/docs/standard/coding.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '数据库操作规范',
                    'action' => 'db',
                    'href' => '/uidemo/docs/standard/db.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '团队协作规范',
                    'action' => 'team',
                    'href' => '/uidemo/docs/standard/team.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => 'Application',
            'controller' => 'manual',
            'href' => '#',
            'class' => 'far fa-bell',
            'children' => [ // level1
                [
                    'href' => '/uidemo/docs/manual/application.html',
                    'action' => 'application',
                    'name' => 'Application/应用程序',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/profile.html',
                    'action' => 'profile',
                    'name' => 'Proptrites/配置文件',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/debug.html',
                    'action' => 'debug',
                    'name' => 'Debug/调试模式配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/bootstrap.html',
                    'action' => 'bootstrap',
                    'name' => 'Bootstrap/引导程序配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/lang.html',
                    'action' => 'lang',
                    'name' => 'Lang/语言包配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/data.html',
                    'action' => 'data',
                    'name' => 'Data/数据源配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/cache.html',
                    'action' => 'cache',
                    'name' => 'Cache/缓存配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/logger.html',
                    'action' => 'logger',
                    'name' => 'Logger/日志收集配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/configuration.html',
                    'action' => 'configuration',
                    'name' => 'Configuration/配置类',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/builder.html',
                    'action' => 'builder',
                    'name' => 'Builder/打包单文件配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/daemon.html',
                    'action' => 'daemon',
                    'name' => 'Daemon/守护进程配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/filter.html',
                    'action' => 'filter',
                    'name' => 'Filter/过滤器配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_event.html',
                    'action' => 'mvc_event',
                    'name' => 'Event/事件配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_controller.html',
                    'action' => 'mvc_controller',
                    'name' => 'Controller/控制器配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_model.html',
                    'action' => 'mvc_model',
                    'name' => 'Model/模型配置/',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_viewer.html',
                    'action' => 'mvc_viewer',
                    'name' => 'Viewer/视图配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_router.html',
                    'action' => 'mvc_router',
                    'name' => 'Router/路由器配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_dispatcher.html',
                    'action' => 'mvc_dispatcher',
                    'name' => 'Dispatcher/派发器配置',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_request.html',
                    'action' => 'mvc_request',
                    'name' => 'Request/请求',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_response.html',
                    'action' => 'mvc_response',
                    'name' => 'Response/响应',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_cookie.html',
                    'action' => 'mvc_cookie',
                    'name' => 'HttpCookie',
                    'class' => 'fa fa-success'
                ],
                [
                    'href' => '/uidemo/docs/manual/mvc_session.html',
                    'action' => 'mvc_session',
                    'name' => 'HttpSession',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => 'Runtime',
            'href' => '#',
            'controller' => 'manual',
            'class' => 'fa fa-success',
            'children' => [ // level1
                [
                    'name' => '环境参数',
                    'action' => 'runtime_env',
                    'href' => '/uidemo/docs/manual/runtime_env.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '异常处理',
                    'action' => 'runtime_exception',
                    'href' => '/uidemo/docs/manual/runtime_exception.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '自动加载',
                    'action' => 'runtime_autoloader',
                    'href' => '/uidemo/docs/manual/runtime_autoloader.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '依赖注入',
                    'action' => 'runtime_container',
                    'href' => '/uidemo/docs/manual/runtime_container.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '事件驱动管理',
                    'action' => 'runtime_event',
                    'href' => '/uidemo/docs/manual/runtime_event.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => '标准库参考',
            'href' => '#',
            'controller' => 'lib',
            'class' => 'fa fa-success',
            'children' => [ // level1
                [
                    'href' => ' ',
                    'name' => ' ',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/tiny.html',
                    'action' => 'tiny',
                    'name' => 'Tiny：工具包',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/runtime.html',
                    'action' => 'runtime',
                    'name' => 'Tiny\Runtime：运行时',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/build.html',
                    'action' => 'build',
                    'name' => 'Tiny\Build：打包',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '"/uidemo/docs/lib/cache.html',
                    'action' => 'cache',
                    'name' => 'Tiny\Cache：缓存',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/config.html',
                    'action' => 'config',
                    'name' => 'Tiny\Config：配置',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/console.html',
                    'action' => 'console',
                    'name' => 'Tiny\Console：命令行',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/data.html',
                    'action' => 'data',
                    'name' => 'Tiny\Data：数据层',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/di.html',
                    'action' => 'di',
                    'name' => 'Tiny\DI：依赖注入',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/event.html',
                    'action' => 'event',
                    'name' => 'Tiny\Event：事件',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/filter.html',
                    'action' => 'filter',
                    'name' => 'Tiny\Filter：过滤器',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/image.html',
                    'action' => 'image',
                    'name' => 'Tiny\Image：图片处理',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '"/uidemo/docs/lib/lang.html',
                    'action' => 'lang',
                    'name' => 'Tiny\Lang：语言包',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/log.html',
                    'action' => 'log',
                    'name' => 'Tiny\Log：日志处理',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/mvc.html',
                    'action' => 'mvc',
                    'name' => 'Tiny\MVC：MVC',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/net.html',
                    'action' => 'net',
                    'name' => 'Tiny\Net：网络',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
                [
                    'href' => '/uidemo/docs/lib/string.html',
                    'action' => 'string',
                    'name' => 'Tiny\String：字符处理',
                    'class' => 'fa fa-success',
                    'children' => []
                ],
            ]
        ],
        [
            'name' => 'UI基础库',
            'href' => '#',
            'controller' => 'ui',
            'class' => 'fa fa-success',
            'children' => [ // level1
                [
                    'name' => 'webpack5',
                    'action' => 'webpack',
                    'href' => '/uidemo/docs/ui/webpack.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'bootstrap5',
                    'action' => 'bootstrap',
                    'href' => '/uidemo/docs/ui/bootstrap.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'jquery',
                    'action' => 'jquery',
                    'href' => '/uidemo/docs/ui/jquery.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => '图标/icons',
                    'action' => 'icons',
                    'href' => '/uidemo/docs/ui/icons.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
        [
            'name' => 'UI组件库',
            'href' => '#',
            'controller' => 'ui/components',
            'class' => 'fa fa-success',
            'children' => [ // level1
                [
                    'name' => 'codemirror',
                    'action' => 'codemirror',
                    'href' => '/uidemo/docs/ui/components/codemirror.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'summernote',
                    'action' => 'summernote',
                    'href' => '/uidemo/docs/ui/components/summernote.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'sweetalert2',
                    'action' => 'alert',
                    'href' => '/uidemo/docs/ui/components/alert.html',
                    'class' => 'fa fa-success'
                ],
                [
                    'name' => 'select2',
                    'action' => 'select2',
                    'href' => '/uidemo/docs/ui/components/select2.html',
                    'class' => 'fa fa-success'
                ],
            ]
        ],
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
    <a class="btn btn-bd-download d-lg-inline-block my-2 my-md-0 ms-md-3" href="https://github.com/tinyphporg/tinyphp-ui">View on GitHub</a>
    EOT,
    'menu' => [],
    'headerExtra' => <<<EOT
        <div class="d-md-flex flex-md-row-reverse align-items-center justify-content-between">
        <a class="btn btn-sm mb-2 mb-md-0" href="https://github.com/twbs/bootstrap/blob/main/site/content/docs/5.1/getting-started/introduction.md" title="View and edit this file on GitHub" target="_blank" rel="noopener">View on GitHub</a>
        <h1 class="bd-title" id="content">Tinyphp-framework</h1>
        </div>
        
        <p class="bd-lead">Tinyphp-ui 是一款面向PHP全栈工程师的前端UI组件库，后端基于tinyphp framework 2.0， 前端基于webpack5整合了bootstrap5 + jquery。</p>
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
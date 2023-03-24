<?php
return [
    'title' => 'Admin Portal of tinyphp-ui|tinyphp.org',
    'name' => 'Tinyphp-UI',
    'version' => '2.0.0',
    'domain' => 'https://tinyphp.org',
    'author' => 'Tinyphp.org',
    'copyright' => '2013-2022',
    'logo' => [
        'img' => '',
        'miniImg' => '',
        'url' => ''
    ],
    'description' => 'Tinyphp 基于敏捷开发理念，集成了bootstrap5+jquery等流行组件，用于构建响应式、移动设备优先的网站。',
   // 'header_bg' => 'bg-info',
    'sidebar_bg' => 'bg-info',
    'nav' => [
        [
            'name' => '首页',
            'href' => '/uidemo/app/index.html',
            'icon' => 'fa fa-home',
            'children' => []
        ]
    ],
    'sidebar' => [
        [
            'name' => 'DASHBOARD',
            'isHeading' => true
        ],
        [
            'name' => '后台首页',
            'action' => '',
            'href' => '/uidemo/admin/index.html',
            'icon' => 'bi bi-x-diamond',
            'children' => []
        ],
        [
            'name' => 'UI COMPONENTS',
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
            'name' => 'Widgets 部件',
            'href' => '/uidemo/admin/widgets/widgets.html',
            'icon' => 'bi bi-columns-gap',
            'children' => []
        ],
        [
            'name' => 'Pages 后台页面',
            'href' => '#',
            'icon' => 'bi-window-sidebar',
            'children' => [ // level1
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
    'navExtra' => '',
    'menu' => [],
    'headerExtra' => '',
    'footerExtra' => ''
];
?>
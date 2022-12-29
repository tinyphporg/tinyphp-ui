import "./datatables.scss"
import 'jszip'
//import 'sheetjs'
import * as pdfMake from 'pdfmake/build/pdfmake.js'
import pdfMakeVfs from './vfs_fonts.js'
import * as dt from 'datatables.net'
import 'datatables.net-bs5'
import './editeor/js/dataTables.editor'
import './editeor/js/editor.bootstrap5'
import 'datatables.net-autofill-bs5'
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
import 'datatables.net-colreorder-bs5'
import 'datatables.net-datetime'
import 'datatables.net-fixedcolumns-bs5'
import 'datatables.net-fixedheader-bs5'
import 'datatables.net-keytable-bs5'
import 'datatables.net-responsive-bs5'
import 'datatables.net-rowgroup-bs5'
import 'datatables.net-rowreorder-bs5'
import 'datatables.net-scroller-bs5'
import 'datatables.net-searchbuilder-bs5'
import 'datatables.net-searchpanes-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-staterestore-bs5'

const DataTable = $.fn.dataTable

pdfMake.vfs = pdfMakeVfs
pdfMake.fonts = {
    fzy: {
        normal: 'fzy.ttf',
        bold: 'fzy.ttf',
        italics: 'fzy.ttf',
        bolditalics: 'fzy.ttf',
    }
}

// 语言包
$.extend(true, DataTable.defaults.oLanguage, {
    "sProcessing": "处理中...",
    "sLengthMenu": "_MENU_ ",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "搜索：",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页"
    },
    "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
})


// 分页
$.extend(true, DataTable.defaults, {
    select: {
        style: 'multi',
        info: true,
    },
    language: {

        datetime: {
            previous: '<',
            next: '>',
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        buttons: {
            pageLength: {
                _: "每页 %d 行",
                '-1': "显示全部"
            },
            copy: 'Copy',
            copySuccess: {
                1: "复制一行到剪贴板",
                _: "复制 %d 行到剪贴板"
            },
            copyTitle: '复制'
        },

        select: {
            rows: {
                _: '选中 %d 行',
                0: '',
                1: '选中 1 行被选中'
            }
        }
    }
})
// 搜索框重新定义 变大
$.extend(DataTable.ext.classes, {
    sFilterInput: "form-control",
    sLengthSelect: "form-select"
});

// 按钮样式定义
$.extend(true, DataTable.Buttons.defaults, {
    dom: {
        button: {
            className: 'btn btn-link'
        }
    }
})

$.extend(true, DataTable.SearchBuilder.defaults, {
    enterSearch: true,
    depthLimit: 2,
    i18n: {
        add: '添加筛选条件',
        button: {
            0: '自定义筛选',
            _: '自定义筛选 (%d)'
        },
        clearAll: '清空',
        condition: '筛选操作',
        conditions: {
            array: {
                contains: '选择筛选条件',
                empty: 'Empty',
                equals: 'Equals',
                not: 'Not',
                notEmpty: 'Not Empty',
                without: 'Without'
            },
            date: {
                after: '指定日期之后',
                before: '指定日期之前',
                between: '两个日期之间',
                empty: '为空',
                equals: '相等',
                not: '非',
                notBetween: '不在指定两个日期之间',
                notEmpty: '不为空'
            },
            // eslint-disable-next-line id-blacklist
            number: {
                between: '两个值之间',
                empty: '为空',
                equals: '相等',
                gt: '大于',
                gte: '大于等于',
                lt: '小于',
                lte: '小于等于',
                not: '非',
                notBetween: '不在两个值之间',
                notEmpty: '不为空'
            },
            // eslint-disable-next-line id-blacklist
            string: {
                contains: '包含',
                empty: '空',
                endsWith: '以值为结尾',
                equals: '相等',
                not: '非',
                notContains: '不包含',
                notEmpty: '非空',
                notEndsWith: '不以值结尾',
                notStartsWith: '不以值开始',
                startsWith: '以值开始'
            }
        },
        data: '字段',
        "delete": '<i class="bi bi-x"></i>',
        deleteTitle: '删除过滤条件',
        left: '<i class="bi bi-dash"></i>',
        leftTitle: '增加子级筛选字段',
        logicAnd: 'And',
        logicOr: 'Or',
        right: '<i class="bi bi-plus"></i>',
        rightTitle: '折叠子级筛选字段',
        title: {
            0: '自定义筛选',
            _: '自定义筛选 (%d)'
        },
        value: '值',
        valueJoiner: 'and'
    }
})
export default dt
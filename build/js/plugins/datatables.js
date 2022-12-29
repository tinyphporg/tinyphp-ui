import BasePlugin from './base-plugin'

// summernote 编辑器
class DataTables extends BasePlugin {
    constructor() {
        super()
        this.id = 'datatables'
        this.jqueryFnExtend = { datatablex: this.datatablex }
        DataTables._currentInstance = this
    }

    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./datatables.net/datatables.net.js')
        return module.default
    }

    /* rewrite $.fn.select2 */
    async datatablex() {
        const DataTable = await DataTables._currentInstance.load()

        const data = this.dataset

        // 字段
        let columns = []
        if (data['columns'] !== undefined) {
            columns = data['columns'].split(',')
            columns.forEach((item, index) => {
                columns[index] = item.trim()
            })
        }

        let orderColumns = []
        if (data['orderColumns'] !== undefined) {
            if (data['orderColumns'] == 'false' || !data['orderColumns']) {
                orderColumns = false
            } else {
                orderColumns = data['orderColumns'].split(',')
                orderColumns.forEach((item, index) => {
                    orderColumns[index] = item.trim()
                })
            }
        }

        let searchColumns = []
        if (data['searchColumns'] !== undefined) {
            if (data['searchColumns'] == 'false' || !data['searchColumns']) {
                searchColumns = false
            } else {
                searchColumns = data['searchColumns'].split(',')
                searchColumns.forEach((item, index) => {
                    searchColumns[index] = item.trim()
                })
            }
        }

        let customColumns = []
        if (data['customColumns'] !== undefined) {
            if (data['customColumns'] == 'false' || !data['customColumns']) {
                customColumns = false
            } else {
                customColumns = data['customColumns'].split(',')
                if (customColumns.length == 0 || !customColumns[0]) {
                    customColumns = columns
                }
                customColumns.forEach((item, index) => {
                    customColumns[index] = item.trim()
                })
            }
        }
        else {
            customColumns = columns
        }

        let searchBuilder = true
        if (data['searchBuilder'] !== undefined && ((data['searchBuilder'] == 'false' || !data['searchBuilder']))) {
            searchBuilder = false
        }

        let title = false
        if (data['title'] !== undefined) {
            title = data['title']
        }


        if ($(this).attr('class') === undefined) {
            $(this).addClass('table table-bordered table-striped dataTable no-footer')
        } else {
            ['table', 'dataTable', 'table-bordered', 'table-striped'].forEach((className) => {
                !$(this).hasClass(className) && $(this).addClass(className)
            })
        }

        let columnList = []
        let customs = []
        let names = (data['names'] === undefined) ? columns : data['names'].split(',')
        columns.forEach((item, index) => {
            let column = {}
            column['data'] = item
            column['name'] = names[index] || item
            column['searchable'] = searchColumns !== false && searchColumns.inArray(item)
            column['orderable'] = orderColumns !== false && orderColumns.inArray(item)
            columnList.push(column)
            if (customColumns !== false && customColumns.inArray(item) && index != 0) {
                customs.push(index)
            }
        })

        let $thead = $('thead', this)
        if ($thead.length == 0) {
            $('<thead><tr></tr></thead').prependTo(this)
            $thead = $('thead', this)
        }

        names.forEach((item, index) => {
            $('<th>' + item + '</th>').appendTo($thead.children(0))
        })

        const $th = $('th', $thead)
        let $tbody = $('tbody', this)
        if ($tbody.length == 0) {
            $('<tbody></tbody>').appendTo(this)
        }

        // ajax
        const ajaxUrl = data['ajaxUrl']
        const ajaxType = (data['ajaxType'] !== undefined && data['ajaxType'] == 'GET') ? 'GET' : 'POST'
        const ajaxSrc = (data['ajaxSrc'] !== undefined) ? data['ajaxSrc'] : 'data'
        const ajaxData = {}
        for (let i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }
            if (i.indexOf('ajaxData') === 0 && i.length > 8) {
                let name = i.substr(8).toLowerCase()
                ajaxData[name] = data[i]
            }
        }

        const ajax = {
            url: ajaxUrl,
            data: ajaxData,
            dataSrc: ajaxSrc,
            type: ajaxType
        }

        // page length
        let pageLength = '20'
        if (data['pageLength'] !== undefined) {
            pageLength = parseInt(data['pageLength']).toString()

        }

        let pageLengthMenu = []
        if (data['lengthMenu'] !== undefined) {
            let pageLengthText = data['lengthMenu']
            pageLengthMenu = pageLengthText.split(',')
            pageLengthMenu.forEach(function(item, index) {
                pageLengthMenu[index] = item.trim()
            })
        }
        if (pageLengthMenu.length == 0) {
            pageLengthMenu = ['20', '40', '60', '80', '100', '-1']
        }

        if (!pageLengthMenu.inArray(pageLength)) {
            pageLengthMenu.unshift(pageLength)
        }
        if (!pageLengthMenu.inArray('-1')) {
            pageLengthMenu.push('-1')
        }
        $(this).attr('data-columns', null)
        $(this).attr('data-names', null)
        $(this).attr('data-search-builder', null)
        $(this).attr('data-search-columns', null)
        $(this).attr('data-order-columns', null)
        $(this).attr('data-custom-columns', null)
        $(this).attr('data-page-length', null)
        $(this).attr('data-length-menu', null)


        let lengthMenu = [[], []]
        pageLengthMenu.forEach(item => {
            lengthMenu[0].push(item)
            if (item == '-1') {
                item = '全部'
            }
            lengthMenu[1].push(item)
        })

        let options = {
            dom: "<'row flex'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6 me-auto'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-md-auto col-sm-12 me-auto'i><'col-md-auto col-sm-12 ms-auto d-flex flex-row'<p>>>",
            responsive: true,
            lengthChange: true,
            autoWidth: false,
            deferRender: true,
            searchDelay: 800,
            "stateSave": true,
            //autoFill: true,
            rowReorder: true,
            pageLength: pageLength,
            lengthMenu: lengthMenu,
            "scrollCollapse": true,
            "fixedColumns": {
                left: 1,
                right: 1
            },
            buttons: [
                'pageLength', 'spacer',
                {
                    extend: 'collection',
                    text: '导出',
                    pageSize: 'A4',
                    buttons: [
                        {
                            extend: 'csv',
                            title: title || '*'
                        },
                        {
                            extend: 'pdf',
                            title: title || '*',
                            customize: function(doc, config, dt) {
                                doc.defaultStyle.font = 'fzy'

                                let width = 0
                                let widths = []
                                $th.each((id, th) => {
                                    width += th.offsetWidth
                                })
                                if (width <= 0 || $th.length == 0) { return }
                                $th.each((id, th) => {
                                    widths.push(parseInt(th.offsetWidth / width * 100).toString() + '%')

                                })

                                let align = $($th[0]).css('text-align')
                                if (align == 'center' || align == 'left') {
                                    doc.styles.tableHeader.alignment = align
                                    doc.styles.tableBodyOdd.alignment = align
                                }

                                doc.content[1].table.widths = widths
                            }
                        }]
                },
                {
                    "extend": "copy",
                    "text": "复制"

                }, {
                    "extend": "print",
                    title: title || '*',
                    "text": "打印"

                }
            ],
            columns: columnList,
            "processing": true,
            "serverSide": true,
            "colReorder": true,
            "ajax": ajax,
        }

        if (customs.length > 0) {
            options['buttons'].push({
                "extend": "colvis",
                columns: customs,
                "text": "自定义列"
            })
        }

        if (searchBuilder) {
            options['buttons'].push({
                extend: 'searchBuilder',
            })
        }

        // 初始化配置
        $(this).trigger('preinit.dt', [options, DataTable]);
        let table = $(this).DataTable(options)

        // 完成初始化
        $(this).trigger('inited.dt', [table, DataTable]);
        return [table, DataTable]
    }
}
export default DataTables
import BasePlugin from './base-plugin'

// summernote 编辑器
class DataTables extends BasePlugin {
    constructor() {
        super()
        this.id = 'datatables'
        //this.jqueryFnExtend = { select2x: this.select2x}
        DataTables._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./datatables.net/datatables.net.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async select2x(config) {
        const select2 = await DataTables._currentInstance.load()
        //return new select2(this, config)
    }
}
export default DataTables
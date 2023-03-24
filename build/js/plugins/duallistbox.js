import BasePlugin from './base-plugin'

// summernote 编辑器
class Duallistbox extends BasePlugin {
    constructor() {
        super()
        this.id = 'duallistbox'
        this.jqueryFnExtend = { duallistbox: this.duallistbox}
        Duallistbox._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./bootstrap4-duallistbox/bootstrap4-duallistbox.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async duallistbox(...option) {
        const switchx = await Duallistbox._currentInstance.load()
        return $(this).bootstrapDualListbox.apply(this, option)
    }
}
export default Duallistbox
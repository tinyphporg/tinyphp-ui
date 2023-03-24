import BasePlugin from './base-plugin'

// summernote 编辑器
class Select2 extends BasePlugin {
    constructor() {
        super()
        this.id = 'select2'
        this.jqueryFnExtend = { select2x: this.select2x}
        Select2._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./select2/select2.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async select2x(config) {
        const select2 = await Select2._currentInstance.load()
        return new select2(this, config)
    }
}
export default Select2
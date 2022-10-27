import BasePlugin from './base-plugin'

// summernote 编辑器
class Uplot extends BasePlugin {
    constructor() {
        super()
        this.id = 'uplot'
        //this.jqueryFnExtend = { select2x: this.select2x}
        Uplot._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./uplot/uplot.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async chartx(...config) {
        const chart = await Uplot._currentInstance.load()
        return new chart(...config)
       // return new select2(this, config)
    }
}
export default Uplot
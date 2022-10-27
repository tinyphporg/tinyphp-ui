import BasePlugin from './base-plugin'

// summernote 编辑器
class Sparklines extends BasePlugin {
    constructor() {
        super()
        this.id = 'sparklines'
        //this.jqueryFnExtend = { select2x: this.select2x}
        Sparklines._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./sparklines/sparklines.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async chartx(...config) {
        const chart = await Sparklines._currentInstance.load()
        return new chart(...config)
       // return new select2(this, config)
    }
}
export default Sparklines
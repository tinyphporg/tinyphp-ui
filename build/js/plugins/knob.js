import BasePlugin from './base-plugin'

// summernote 编辑器
class Knob extends BasePlugin {
    constructor() {
        super()
        this.id = 'knob'
        //this.jqueryFnExtend = { select2x: this.select2x}
        Knob._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./knob/knob.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async chartx(...config) {
        const chart = await Knob._currentInstance.load()
        return new chart(...config)
       // return new select2(this, config)
    }
}
export default Knob
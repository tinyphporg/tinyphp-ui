import BasePlugin from './base-plugin'

// summernote 编辑器
class Flot extends BasePlugin {
    constructor() {
        super()
        this.id = 'flot'
        //this.jqueryFnExtend = { select2x: this.select2x}
        Flot._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./flot/flot.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async chartx(...config) {
        const flot = await Flot._currentInstance.load()
        return new flot(...config)
       // return new select2(this, config)
    }
}
export default Flot
import BasePlugin from './base-plugin'

// summernote 编辑器
class Chart extends BasePlugin {
    constructor() {
        super()
        this.id = 'chart'
        //this.jqueryFnExtend = { select2x: this.select2x}
        Chart._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./chartjs/chartjs.js')
        console.log(module.default)
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async chartx(...config) {
        const chart = await Chart._currentInstance.load()
        return new chart(...config)
       // return new select2(this, config)
    }
}
export default Chart
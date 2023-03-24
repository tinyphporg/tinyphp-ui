import BasePlugin from './base-plugin'

// summernote 编辑器
class Echarts extends BasePlugin {
    constructor() {
        super()
        this.id = 'echarts'
        this.jqueryFnExtend = { echartx: this.echartx}
        Echarts._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./echarts/echarts.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async echartx(options) {
        const echarts = await Echarts._currentInstance.load()
        $(this).each(function(){
            $(this).data('echart', echarts.init(this).setOption(options))
        })
       // return new select2(this, config)
    }
}
export default Echarts
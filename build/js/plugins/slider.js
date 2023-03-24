import BasePlugin from './base-plugin'

// summernote 编辑器
class Slider extends BasePlugin {
    constructor() {
        super()
        this.id = 'slider'
        this.jqueryFnExtend = { sliderx: this.sliderx}
        Slider._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./bootstrap-slider/bootstrap-slider.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async sliderx(...config) {
        const slider = await Slider._currentInstance.load()
        return $(this).bootstrapSlider(...config)
       // return new select2(this, config)
    }
}
export default Slider
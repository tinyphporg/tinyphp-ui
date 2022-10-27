import BasePlugin from './base-plugin'

// summernote 编辑器
class Switch extends BasePlugin {
    constructor() {
        super()
        this.id = 'switch'
        this.jqueryFnExtend = { switchx: this.switchx}
        Switch._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./bootstrap-switch-bs42/bootstrap-switch-bs42.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async switchx(...option) {
        const switchx = await Switch._currentInstance.load()
        return $(this).bootstrapSwitch.apply(this, option)
    }
}
export default Switch
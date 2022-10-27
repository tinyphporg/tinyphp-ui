import BasePlugin from './base-plugin'

// summernote 编辑器
class Validation extends BasePlugin {
    constructor() {
        super()
        this.id = 'validation'
        this.jqueryFnExtend = {validatex: this.validatex}
        Validation._currentInstance = this
    }

    /* webpackChunkName: "jquery-validation" */
    async load() {
        const module = await import('./jquery-validation/jquery-validation.js')
        return module.default
    }
    
    async validatex(config, defaults) {
        const validation = await Validation._currentInstance.load();
        if (typeof defaults === 'object') {
           // validation.defaults = defaults
        }
        return $(this).validate(config);
    }
    
}
export default Validation
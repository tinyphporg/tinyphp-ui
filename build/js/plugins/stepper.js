import BasePlugin from './base-plugin'

// summernote 编辑器
class Stepper extends BasePlugin {
    constructor() {
        super()
        this.id = 'stepper'
        this.jqueryFnExtend = { stepperx: this.stepperx}
        Stepper._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./bs-stepper/bs-stepper.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async stepperx(callback) {
        const Stepperx = await Stepper._currentInstance.load()
        $(this).each(function() {
            const stepperInstance = new Stepperx(this);
            if (callback && typeof callback === 'function') {
                callback.call(this, stepperInstance)
            }
        })
    }
}
export default Stepper
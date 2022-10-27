import BasePlugin from './base-plugin'

// summernote 编辑器
class Datetimepicker extends BasePlugin {
    constructor() {
        super()
        this.id = 'datetimepicker'
        // this.jqueryFnExtend = {daterangepickerx: this.daterangepickerx}
        Datetimepicker._currentInstance = this
    }

    /* webpackChunkName: "jquery-validation" */
    async load() {
        const module = await import('./tempusdominus-bootstrap-4/tempusdominus-bootstrap-4.js')
        return module.default
    }
    async timepickerx(config, defaults) {
        const daterangepicker = await Datetimepicker._currentInstance.load();
        if (typeof defaults === 'object') {
           // validation.defaults = defaults
        }
        return $(this).daterangepicker(daterangepicker);
    }
}
export default Datetimepicker
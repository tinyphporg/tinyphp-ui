import BasePlugin from './base-plugin'

// summernote 编辑器
class Daterangepicker extends BasePlugin {
    constructor() {
        super()
        this.id = 'daterangepicker'
        this.jqueryFnExtend = {daterangepickerx: this.daterangepickerx}
        Daterangepicker._currentInstance = this
    }

    /* webpackChunkName: "jquery-validation" */
    async load() {
        const module = await import('./daterangepicker/daterangepicker.js')
        return module.default
    }
    async daterangepickerx(...config) {
        await Daterangepicker._currentInstance.load()
        return $(this).daterangepicker(...config);
    }
}
export default Daterangepicker
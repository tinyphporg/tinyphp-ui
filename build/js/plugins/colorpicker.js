import BasePlugin from './base-plugin'

// summernote 编辑器
class ColorPicker extends BasePlugin {
    constructor() {
        super()
        this.id = 'colorpicker'
        this.jqueryFnExtend = { colorpickerx: this.colorpickerx }
        ColorPicker._currentInstance = this
    }

    /* webpackChunkName: "jquery-validation" */
    async load() {
        const module = await import('./bootstrap-colorpicker/bootstrap-colorpicker.js')
        return module.default
    }

    async colorpickerx(config, defaults) {
        const colorpicker = await ColorPicker._currentInstance.load();
        if (typeof defaults === 'object') {
            // validation.defaults = defaults
        }
        return $(this).colorpicker(config);
    }

}
export default ColorPicker
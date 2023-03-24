import BasePlugin from './base-plugin'

// summernote 编辑器
class Dropzone extends BasePlugin {
    constructor() {
        super()
        this.id = 'dropzone'
      //  this.jqueryFnExtend = { switchx: this.switchx}
        Dropzone._currentInstance = this
    }
    
    /* webpackChunkName: "select2" */
    async load() {
        const module = await import('./dropzone/dropzone.js')
        return module.default
    }
    
    /* rewrite $.fn.select2 */
    async switchx(...option) {
        const dropzone = await Dropzone._currentInstance.load()
        //return $(this).bootstrapSwitch(...option)
    }
}
export default Dropzone
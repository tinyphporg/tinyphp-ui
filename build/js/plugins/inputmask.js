import BasePlugin from './base-plugin'

// summernote 编辑器
class Inputmask extends BasePlugin {
    constructor() {
        super()
        this.id = 'inputmask'
       // this.jqueryFnExtend = {summernotex: this.summernotex}
        Inputmask ._currentInstance = this
    }

    /* webpackChunkName: "sweetalert2" */
    async load() {
        const module = await import('./inputmask/inputmask.js')
        return module.default
    }
    async summernotex(config) {
        const summernote = await Inputmask ._currentInstance.load();
        return $(this).summernote(config);
    }
    
}
export default Inputmask 
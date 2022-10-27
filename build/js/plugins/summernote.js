import BasePlugin from './base-plugin'

// summernote 编辑器
class Summernote extends BasePlugin {
    constructor() {
        super()
        this.id = 'summernote'
        this.jqueryFnExtend = {summernotex: this.summernotex}
        Summernote._currentInstance = this
    }

    /* webpackChunkName: "sweetalert2" */
    async load() {
        const module = await import('./summernote/summernote.js')
        return module.default
    }
    async summernotex(config) {
        const summernote = await Summernote._currentInstance.load();
        return $(this).summernote(config);
    }
    
}
export default Summernote
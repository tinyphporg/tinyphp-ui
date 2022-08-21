import BasePlugin from './base-plugin'

// summernote 编辑器
class Summernote extends BasePlugin {
    constructor() {
        super()
        this.id = 'summernote'
    }

    /* webpackChunkName: "sweetalert2" */
    async load() {
        const module = await import('./summernote/summernote.js')
        return module.default
    }
}
export default Summernote
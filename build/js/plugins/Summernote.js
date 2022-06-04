
class Summernote {
    
	id = 'summernote'

    preload = false

    jqueryExtend = {}
    
    jqueryFnExtend = {}

    module = null;

    /* webpackChunkName: "sweetalert2" */
    async load() {
		const module = await import('./summernote/summernote.js');
        this.module = module.default;
        return this.module;
    }
	
    helper() {
        return {}
    }
}


export default new Summernote()
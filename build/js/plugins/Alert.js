
class Alert {

	id = 'alert';

    preload = true;

    postload = false;

    jqueryFnExtend = {};

    jqueryExtend = {}
	
	module = false
	
    /* webpackChunkName: sweetalert2 */
    load = async () => {
        const module = await import('~plugin/sweetalert2/sweetalert2.js');
        this.module = module.default;
        return this.module;
    }
	
    alert = async (...arg) =>{
		const m = await this.load();
        return m(...arg);
    }
	
	constructor() {
		this.jqueryExtend = {
        		alert: this.alert,
    	}
	}
}
export default new Alert();
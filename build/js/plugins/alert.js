import BasePlugin from './base-plugin'

// swal
class Alert extends BasePlugin {
    constructor() {
        super()
        this.id = 'alert'
        this.jqueryExtend = { alert: this.alert}
    }

    /* webpackChunkName: sweetalert2 */
    load = async () => {
        const module = await import('./sweetalert2/sweetalert2.js')
        return module.default
    }
    
    alert = async (...arg) => {
        const swal = await this.load()
        return swal.fire(...arg);
    }    
}
export default Alert;
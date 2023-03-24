import BasePlugin from './base-plugin'

// swal
class Alert extends BasePlugin {
    constructor() {
        super()
        this.id = 'modal'
        this.jqueryExtend = { alert: this.alert, modalx: this.modalx, toastx: this.toastx, toast: this.toast}
    }

    /* webpackChunkName: sweetalert2 */
    load = async () => {
        const module = await import('./sweetalert2/sweetalert2.js')
        return module.default
    }
    
    alert = (...arg) => {
        
    }
    
    toast = (...arg) => {
        return $(document).toasts(...arg)
    }
    
    toastx = async (config) => {
        const Swal = await this.load()
        let toastConfig = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        }
        if ($.tiny.isObject(config)) {
            $.tiny.extend(toastConfig, config)
        }
        return Swal.fire(toastConfig)

    }

    modalx = async (...arg) => {
        const Swal = await this.load()

        $.tiny.extend({ swal: Swal })
        return Swal.fire(...arg);
    }
}
export default Alert;
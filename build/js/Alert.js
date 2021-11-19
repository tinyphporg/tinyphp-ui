class Alert {

    static id = 'alert';

    static preload = true;

    static postload = false;

    static jqueryFnExtend = null;

    static jqueryExtend = {
        alert: Alert.alert
    }
    /* webpackChunkName: sweetalert2 */
    static async load() {
        const module = await import('~plugin/sweetalert2');
        Alert.module = module.default;
        return Alert.module;
    }

    static async alert(...arg) {
        const m = await Alert.load();
        return m(...arg);
    }
    
    static helper() {
        return {}
    }
}

export default Alert;
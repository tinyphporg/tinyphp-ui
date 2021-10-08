class Alert {

    static id = 'alert';

    static preload = true;

    static postload = false;

    static jqueryFnExtend = null;

    static jqueryExtend = {
        alert: Alert.alert
    }
    
    static async load() {
        const module = await import('@lib/sweetalert2');
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


class Alert {

    static id = 'alert';

    static module = null;

    static async load() {
        const module = await import('@lib/sweetalert2');
        Alert.module = module.default;
        return Alert.module;
    }

    static helper() {
        return {}
    }

    static alert(...arg) {
        return Alert.load().then(m => {
            return m(...arg);
        });
    }

    static _init() {
        Alert.alert._self = Alert;
        $.extend({ alert: Alert.alert });
    }
}

export default Alert;
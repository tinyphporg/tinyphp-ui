import BasePlugin from './base-plugin'

// Cookie
class Cookie extends BasePlugin {

    constructor() {
        super()
        this.id = 'cookie'
        this.jqueryExtend = { cookie: this }
    }
    
    set(name, value, expires = 86400, domain = undefined, path = undefined) {
        
        name = escape(name)
        value = escape(value)
        
        // expires
        let exp = new Date()
        exp.setTime(exp.getTime() + expires  * 1000)
        expires = exp.toGMTString()
        
        // path
        path = (path === undefined || typeof path !== 'string') ? '/' : path
        
        //domain
        domain = (domain === undefined || typeof domain !== 'string') ? '' : domain
        
        // setting
        document.cookie = `${name}=${value};expires=${expires};path=${path};${domain}`
        return this;
    }

    get(name) {
        let arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
        return (arr !== null) ? unescape(arr[2]) : null;
    }

    remove(name, domain = undefined, path = undefined) {
        if (this.get(name) === null) {
            return this
        }
        
        // expires -1
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let expires = exp.toGMTString();

        // path
        path = (path === undefined || typeof path !== 'string') ? '/' : path
        
        //domain
        domain = (domain === undefined || typeof domain !== 'string') ? '' : domain
        return this.set(name, '', expires, domain, path)
    }
}

export default Cookie;
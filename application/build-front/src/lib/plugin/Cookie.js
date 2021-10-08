
class Cookie {

    static id = 'cookie';

    static preload = true;

    static postload = false;

    static jqueryFnExtend = null;

    static jqueryExtend = {
        cookie: Cookie
    }
    
    static set() {
        let exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000 / 2);
        exp = exp.toGMTString();
        if (arguments.length === 2) {
            document.cookie = arguments[0] + "=" + escape(arguments[1]) + ";expires=" + exp + ";path=/";
        }
        else if (arguments.length === 3) {
            document.cookie = arguments[0] + "=" + escape(arguments[1]) + ";expires=" + exp + ";path=/;domain=" + __T.domain;
        }
    }

    static get(name) {
        let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        return (arr !== null) ? unescape(arr[2]) : null;
    }
    
    static remove(name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        exp = exp.toGMTString();
        let val = this.get(name);
        if (val !== null) {
            document.cookie = name + "=" + val + ";expires=" + exp + ";path=/;domain=" + __T.cookieDomain;
        }
    }

}

export default Cookie;
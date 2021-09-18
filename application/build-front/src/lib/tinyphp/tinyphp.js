import $ from 'jquery'
import './tinyphp.scss'

const plugins = require('./plugins.json');
console.log(plugins);
(($, window) => {

    const isArray = (arr) => Array.isArray(arr);
    const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

    const __T = function(config) {
        __T.config = isObject(config)  ? __T.merge(__T._defaultConfig, config) : __T._defaultConfig;
    }

    __T.config = null;
    __T._defaultConfig = plugins;

    __T.merge = (target, ...arg) => {
        return arg.reduce((acc, cur) => {

            return Object.keys(cur).reduce((subAcc, key) => {
                const srcVal = cur[key]
                if (isObject(srcVal)) {
                    subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
                } else if (isArray(srcVal)) {
                    subAcc[key] = srcVal.map((item, idx) => {
                        if (isObject(item)) {
                            const curAccVal = subAcc[key] ? subAcc[key] : []
                            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
                        } else {
                            return item
                        }
                    })
                } else {
                    subAcc[key] = srcVal
                }
                return subAcc
            }, acc)
        }, target)
    }

    /* 继承元素 */
    /* @param: destination 继承对象 */
    /* @param: source 继承源对象 */
    __T.extend = function() {
        if (arguments.length <= 1) { return; }

        let destination = arguments[0];
        let source = arguments[1];
        let property;
        for (property in source) {
            if (Object.prototype.hasOwnProperty.call(source, property)) {
                destination[property] = source[property];
            }

        }
    } /* end of __T.extend... */

    /* 初始化开始 */
    __T.extend(window.Array.prototype, {
        each: (callback, args) => {
            if (typeof callback !== 'function') {
                return false;
            }
            let params = (args instanceof Array) ? args : [];
            if (this.length === undefined || typeof this === 'object') {
                for (let i in this) {
                    if (this.prototype.hasOwnProperty.call(this, i)) {
                        callback.apply(this[i], params);
                    }
                }
            }
            else {
                for (let i = 0; i < this.length;) {
                    callback.apply(this[i], params);
                }
            }
            return this;
        },
        inArray: (val) => {
            for (let i = 0, len = this.length; i < len; i++) {
                if (val === this[i]) {
                    return true;
                }
            }
            return false;
        },
        unquie: () => {
            for (let i = 0; i < this.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (this[i] === arr[j]) {
                        this.splice(j, 1);
                        j--;
                    }
                }
            }
            return this;
        },
        uniqueObj: function() {
            let re = [];
            for (let i = 0, l = this.length; i < l; i++) {
                if (typeof this[i]["_uniqObjects"] === "undefined") {
                    this[i]["_uniqObjects"] = 1;
                    re.push(this[i]);
                }
            }
            // 取出标签
            for (i = 0, l = re.length; i < l; i++) {
                delete re[i]["_uniqObjects"];
            }
            return re;

        }
    });

    /* 字符串扩展 */
    __T.extend(window.String.prototype, {
        isNum: function() {
            return !isNaN(parseFloat(this)) && isFinite(this);
        },
        isInt: function() {
            return (/^\d+$/).test(this);
        },
        isFloat: function() {
            return (/^\-?\d+\.\d+/).test(this);
        },
        isEnglish: function() {
            return (/^[a-zA-Z]+$/).test(this);
        },
        isLower: function() {
            return (/^[a-z]+$/).test(this);
        },
        isUpper: function() {
            return (/^[A-Z]+$/).test(this);
        },
        isChinese: function() {
            return (/^[\u4e00-\u8fa5]+$/).test(this);
        },
        isUrl: function() {
            return (/^(http:\/\/])?\w+(\.\w+)+((\/\w*)*)?$/).test(this);
        },
        isEmail: function() {
            return (/^([\-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/).test(this);
        },
        isDomain: function() {
            return (!/^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(la))$/).test(this);
        },
        isMobileCode: () => {
            return this.match(/^1[358]\d{9}$/);
        },
        isIdcard: function() {
            return this.match(/^([1-9]{0,1})?(\d){1,16}((\d)|x)?$/i);
        },
        parseJSON: function() {
            console.log(this)
            if (typeof JSON !== 'undefined' && JSON.hasOwnProperty('parse')) {

                return JSON.parse(this);
            }
            try {
                return window.eval("(" + this.trim(str) + ")");
            }
            catch (e) {
                return false;
            }
        },
        parseXML: function(data) {
            let xml;
            try {
                if (window.DOMParser) {
                    xml = (new DOMParser()).parseFromString(data, "text/xml");
                }
                else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            }
            catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                return false;
            }
            return xml;
        },
        trim: function() {
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        },
        ltrim: function() {
            return this.replace(/^\s+/, '');
        },
        rtrim: function() {
            return this.replace(/\s+$/, '');
        },
        ucfirst: function() {
            return this.toLowerCase().replace(/\b(\w)|\s(\w)/g, function(m) {
                return m.toUpperCase();
            });
        },
        getLength: function(str) {
            let len = 0;
            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                    len++;
                }
                len++;
            }
            return len;
        },
        toInt: function() {
            return parseInt(this, 10);
        },
        toFloat: function() {
            return parseFloat(this);
        },
        md5: function() {
            let str = this;
            let hexcase = 0;
            let chrsz = 8;
            let isHmac = arguments[1] === true;
            const safe_add = (x, y) => {
                let lsw = (x & 0xFFFF) + (y & 0xFFFF);
                let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }
            const bit_rol = (num, cnt) => {
                return (num << cnt) | (num >>> (32 - cnt));
            }

            const core_md5 = (x, len) => {
                x[len >> 5] |= 0x80 << ((len) % 32);
                x[(((len + 64) >>> 9) << 4) + 14] = len;
                let a = 1732584193;
                let b = -271733879;
                let c = -1732584194;
                let d = 271733878;
                for (let i = 0; i < x.length; i += 16) {
                    let olda = a;
                    let oldb = b;
                    let oldc = c;
                    let oldd = d;
                    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                    a = safe_add(a, olda);
                    b = safe_add(b, oldb);
                    c = safe_add(c, oldc);
                    d = safe_add(d, oldd);
                }
                return [a, b, c, d];
            }

            const md5_cmn = (q, a, b, x, s, t) => {
                return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
            }
            const md5_ff = (a, b, c, d, x, s, t) => {
                return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
            }
            const md5_gg = (a, b, c, d, x, s, t) => {
                return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
            }
            const md5_hh = (a, b, c, d, x, s, t) => {
                return md5_cmn(b ^ c ^ d, a, b, x, s, t);
            }
            const md5_ii = (a, b, c, d, x, s, t) => {
                return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
            }

            const core_hmac_md5 = (key, data) => {
                let bkey = str2binl(key);
                if (bkey.length > 16) {
                    bkey = core_md5(bkey, key.length * chrsz);
                }
                let ipad = [16];
                let opad = [16];
                for (let i = 0; i < 16; i++) {
                    ipad[i] = bkey[i] ^ 0x36363636;
                    opad[i] = bkey[i] ^ 0x5C5C5C5C;
                }
                let hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
                return core_md5(opad.concat(hash), 512 + 128);
            }

            const str2binl = (str) => {
                let bin = [];
                let mask = (1 << chrsz) - 1;
                for (let i = 0; i < str.length * chrsz; i += chrsz) {
                    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
                }
                return bin;
            }

            const binl2hex = (binarray) => {
                let hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                let str = "";
                for (let i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
                }
                return str;
            }

            const hashMd5 = (s) => {
                return binl2hex(isHmac ? core_hmac_md5(str2binl(s), s.length * chrsz) : core_md5(str2binl(s), s.length * chrsz));
            }

            return hashMd5(str);
        },
        base64Encode: function() {
            const base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            const str = this;
            const len = str.length;

            let out = '';
            let i = 0;
            let c1;
            let c2;
            let c3;
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += base64encodechars.charAt(c1 >> 2);
                    out += base64encodechars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += base64encodechars.charAt(c1 >> 2);
                    out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                    out += base64encodechars.charAt((c2 & 0xf) << 2);
                    out += '=';
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64encodechars.charAt(c1 >> 2);
                out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
                out += base64encodechars.charAt(c3 & 0x3f);
            }  /* end of while (i < len) */
            return out;
        },
        base64Decode: function() {
            const str = this;
            const len = str.length;
            const base64decodechars = [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
                52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
                -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
                -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
            ];

            let c1;
            let c2;
            let c3;
            let c4;
            let i = 0;
            let out = '';
            while (i < len) {
                do {
                    c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 === -1);

                if (c1 === -1) {
                    break;
                }

                do {
                    c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 === -1);

                if (c2 === -1) {
                    break;
                }
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 === 61) {
                        return out;
                    }
                    c3 = base64decodechars[c3];
                } while (i < len && c3 === -1);

                if (c3 === -1) {
                    break;
                }

                out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 === 61) {
                        return out;
                    }
                    c4 = base64decodechars[c4];
                } while (i < len && c4 === -1);

                if (c4 === -1) {
                    break;
                }
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        }

    });

    window.tinyphp = __T;
})($, window);
/*Tiny.js组件库*/
(function(window, undefined) {
	/*元素选择*/
	var __T = function(select, context) {
		return new __T.query(select, context).doSelect(select, context);
	}

	__T.window = window;
	__T.document = window.document;
	__T.domain = '';

	__T.debug = 1;

	/*异常对象*/
	__T.exception = {
		collection: [],
		setDebug: function(bool) {
			__T.debug = bool;
		},
		append: function() {
			var es = __T.exception.collection, debug = __T.debug;
			es.push(arguments);
			if (!debug) {
				return
			}
			var innerHTML = "";
			for (var i in es) {
				innerHTML += "<b>原因： </b>" + es[i][0] + "<br />\n" + "<b>URL： </b>";
				innerHTML += es[i][1] + "<br />\n" + "<b>LINE： </b>" + es[i][2] + "<br />";
			}
			alert(innerHTML)
		}
	};

	/*绑定错误事件*/
	__T.window.onerror = __T.exception.append;


	/* 继承元素 */
	/* @param: destination 继承对象 */
	/* @param: source 继承源对象 */
	__T.extend = function(source) {
		var destination, source;
		if (arguments.length == 2) {
			destination = arguments[0];
			source = arguments[1];
		}
		else {
			destination = this;
		}
		for (var property in source) {
			destination[property] = source[property];
		}
	} /* end of __T.extend... */


	__T.query = function(select, context) {
		this.select = select;
		this.context = context;
	}

	__T.query.prototype = {
		_tagReg: /^([0-9A-Za-z]+)$/i,
		_idReg: /^#[^\.<=>#]+$/,
		_classReg: /^\.([^\.<=>]+)$/,
		_nameReg: /^([0-9A-Za-z]+)\s*=\s*([\w\d]+)$/i,

		doSelect: function(select, context) {
			if (!select) {
				return __T.document;
			}

			if (typeof select == 'function') /*onload*/ {
				return __T.ready(select)
			}

			/* 添加一个属性值不存在的函数 */
			if (typeof select == 'string' && typeof context == 'function') {
				if (__T[select]) {
					return false;
				}
				__T[select] = context;
				if (arguments[2] == true) {
					__T.ready(__T[select]);
				}
				return __T[select];
			}
			select = select.toString().trim();
			if (select == "body" || !context) {
				context = __T.document;
			}
			this.selectNodes = select.replace(/\s+/, ' ').split(' ');
			this.element = context;
			return this._selectElement();
		},

		_selectElement: function() {
			var res = [], s, e = this.element, sn = this.selectNodes;
			while (s = sn.shift()) {
				if (!(e instanceof Array)) {
					e = this._getElement(s, e);
					continue;
				}
				for (var i = 0; i < e.length; i++) {
					if (!e[i]) {
						continue;
					}
					var es = this._getElement(s, e[i]);
					if (es instanceof Array) {
						for (var j in es) {
							res.push(es[j]);
						}
					}
					else {
						res.push(es);
					}

				}
				if (res.length == 0) {
					return res;
				}
				e = res;
			}

			if (e && !e['__isTinyLoaded']) {
				e['__isTinyLoaded'] = true;

				e.each = function(c) {
					if (typeof c != 'function') {
						return this;
					}
					if (!(this instanceof Array)) {
						c.call(this, this);
						return this;
					}
					for (var i = 0; i < this.length; i++) {
						c.call(this[i], this[i]);
					}
					return e;
				}
				e.bind = function(event, c) {
					if (typeof c != 'function') {
						return this;
					}
					if (!(this instanceof Array)) {
						__T.bind(this, event, c);
						return this;
					}
					for (var i = 0; i < this.length; i++) {
						__T.bind(this[i], event, c);
					}
					return e;
				}
				e.show = function() {
					var t = arguments[0];
					this.each.call(this, function() {
						__T.ui.show(this, t);
					});
					return e;
				}
				e.hide = function() {
					var t = arguments[0];
					this.each.call(this, function() {
						__T.ui.hide(this, t);
					});
					return e;
				}
				e.moveTo = function() {
					var args = arguments;
					this.each.call(this, function() {
						__T.ui.moveTo(this, args[0], args[1]);
					});
				}
			}
			return e;
		},
		_getElement: function(select, context) {
			var match, es = new Array();
			if (select.length == 0) {
				return null;
			}
			if (select == 'head') {
				return context.getElementsByTagName('head')[0];
			}
			if (select == 'body') {
				return document.all ? document.documentElement : document.body;
			}

			if (select.match(this._idReg)) {
				if (!context['getElementById']) {
					context = document;
				}
				return context.getElementById(select.substr(1));
			}

			if (select.match(this._tagReg)) {
				var all = context.getElementsByTagName(select);
				for (var i = 0; i < all.length; i++) {
					es.push(all[i]);
				}
				return es;
			}

			if (match = select.match(this._classReg)) {
				var ac, all = document.all ? context.all : context.getElementsByTagName("*");
				var reg = new RegExp("^(" + match[1] + "|" + match[1] + "\\s+.*|.*\\s+" + match[1] + "|.*\\s+" + match[1] + "\\s+.*)$");
				for (i = 0; i < all.length; i++) {
					ac = all[i]['className'];
					if (ac && reg.test(ac.trim())) {
						es.push(all[i]);
					}
				}
				return es;
			}

			if (match = select.match(this._nameReg)) {
				var am, all = document.all ? context.all : context.getElementsByTagName("*");
				for (i = 0; i < all.length; i++) {
					am = all[i][match[1]];
					if (am && am == match[2]) {
						es.push(all[i]);
					}
				}
				return es;
			}

		}
	}

	__T.apply = function(object, fun) {
		return function() {
			return fun.apply(object, arguments);
		}
	}

	/* 绑定事件 */
	__T.bind = function(e, type, context) {
		if (!e) {
			return;
		}
		if (type instanceof Array) {
			for (var i = 0; i < type.length; i++) {
				this(e, type[i], context);
			}
			return;
		}

		if (e.addEventListener) {
			e.addEventListener(type, context, false);
		}
		else if (e.attachEvent) {
			e.attachEvent('on' + type, context);
		}
		else {
			e['on' + type] = context;
		}
	}

	// 移除事件
	__T.unbind = function(e, type, context) {
		if (!e) {
			return;
		}
		if (type instanceof Array) {
			for (var i = 0; i < type.length; i++) {
				this(e, type[i], context);
			}
			return;
		}
		if (e.removeEventListener) {
			e.removeEventListener(type, context, false);
		}
		else if (e.detachEvent) {
			e.detachEvent("on" + type, handle);
		}
		else {
			e["on" + type] = null;
		}
	}

	// 加载完成后绑定事件
	__T.ready = function(callback) {
		if (typeof callback != 'function' && typeof callback == "string") {
			eval("callback = function(){" + callback + "}");
		}
		__T.bind(window, 'load', callback);
	}

	/*obj对象*/
	__T.obj = {
		type: function(obj) {
			return (!obj && obj != 0) ? new String(obj) : typeof obj;
		},
		isArray: function(obj) {
			return obj instanceof Array ? true : false;
		},
		isUndefined: function(obj) {
			return (typeof obj == 'undefined') ? true : false;
		},
		isFunction: function(obj) {
			return typeof obj == 'function' ? true : false;
		},
		isEmptyObject: function(obj) {
			for (var name in object) {
				return false;
			}
			return true;
		},
		getEmptyObject: function() {
			return {};
		},
		getEmptyFunc: function() {
			return function() { };
		}
	}

	/*数组*/
	__T.array = {
		inArray: function(val, arr) {
			if (!(arr instanceof Array)) {
				return false;
			}
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] == val) {
					return true;
				}
			}
			return false;
		},
		unique: function(arr) {
			if (!(arr instanceof Array)) {
				return false;
			}
			for (var i = 0; i < arr.length; i++) {
				for (var j = i + 1; j < arr.length; j++) {
					if (arr[i] === arr[j]) {
						arr.splice(j, 1);
						j--;
					}
				}
			}
			return arr;
		},
		uniqueObj: function(array) {
			var re = [];
			for (var i = 0, l = array.length; i < l; i++) {
				if (typeof array[i]["_uniqObjects"] == "undefined") {
					array[i]["_uniqObjects"] = 1;
					re.push(array[i]);
				}
			}
			// 取出标签
			for (var i = 0, l = re.length; i < l; i++) {
				delete re[i]["_uniqObjects"];
			}
			return re;

		},
		each: function(obj, callback, args) {
			if (typeof callback != 'function') {
				return false;
			}
			if (!(args instanceof Array)) {
				args = [];
			}

			if (ob.length === undefined || typeof obj == 'object') {
				for (var i in obj) {
					callback.apply(obj[i], args);
				}
			}
			else {
				for (var i = 0; i < obj.length;) {
					callback.apply(obj[i], args);
				}
			}
			return obj;
		}
	}

	/*string对象*/
	__T.string = {
		_trimLeft: /^\s+/,                                    /* 左空格 */
		_trimRight: /\s+$/,
		isNum: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		},
		isInt: function(n) {
			return (parseInt(n) == n) ? true : false;
		},
		isFloat: function(n) {
			return (/^\-?\d+\.\d+/).test(n);
		},
		isEnglish: function(str) {
			return (/^[a-zA-Z]+$/).test(str);
		},
		isLower: function(str) {
			return (/^[a-z]+$/).test(str);
		},
		isUpper: function(str) {
			return (/^[A-Z]+$/).test(str);
		},
		isChinese: function(str) {
			return (/^[\u4e00-\u8fa5]+$/).test(str);
		},
		isUrl: function(str) {
			return (/^(http:\/\/])?\w+(\.\w+)+((\/\w*)*)?$/).test(str);
		},
		isEmail: function(str) {
			return (/^([\-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/).test(str);
		},
		isDomain: function(str) {
			return (!/^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(la))$/).test(str);
		},
		isMobileCode: function(str) {
			return str.match(/^1[358]\d{9}$/);
		},
		isIdcard: function(str) {
			return str.match(/^([1-9]{0,1})?(\d){1,16}((\d)|x)?$/i);
		},
		parseJSON: function(str) {
			try {
				return eval('(' + __T.string.trim(str) + ')');
			}
			catch (e) {
				return false;
			}
		},
		parseXML: function(data) {
			var xml, tmp;
			try {
				if (window.DOMParser) {
					tmp = new DOMParser();
					xml = tmp.parseFromString(data, "text/xml");
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
		trim: function(str) {
			return str.replace(this._trimLeft, '').replace(this._trimRight, '');
		},
		ltrim: function(str) {
			return str.replace(this._trimLeft, '');
		},
		rtrim: function(str) {
			return str.replace(this._trimRight, '');
		},
		ucfirst: function(str) {
			str = str.toLowerCase();
			return str.replace(/\b(\w)|\s(\w)/g, function(m) {
				return m.toUpperCase();
			});
		},
		getLength: function(str) {
			var len = 0;
			for (var i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
					len += 2;
				}
				else {
					len++;
				}
			}
			return len;
		},
		md5: function(str) {
			var hexcase = 0, b64pad = "", chrsz = 8;
			hashMd5 = function(s) {
				return binl2hex(core_md5(str2binl(s), s.length * chrsz));
			}
			core_md5 = function(x, len) {
				x[len >> 5] |= 0x80 << ((len) % 32);
				x[(((len + 64) >>> 9) << 4) + 14] = len;
				var a = 1732584193;
				var b = -271733879;
				var c = -1732584194;
				var d = 271733878;
				for (var i = 0; i < x.length; i += 16) {
					var olda = a; var oldb = b; var oldc = c; var oldd = d;
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
				return Array(a, b, c, d);
			}

			md5_cmn = function(q, a, b, x, s, t) {
				return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
			}
			md5_ff = function(a, b, c, d, x, s, t) {
				return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
			}
			md5_gg = function(a, b, c, d, x, s, t) {
				return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
			}
			md5_hh = function(a, b, c, d, x, s, t) {
				return md5_cmn(b ^ c ^ d, a, b, x, s, t);
			}
			md5_ii = function(a, b, c, d, x, s, t) {
				return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
			}

			core_hmac_md5 = function(key, data) {
				var bkey = str2binl(key);
				if (bkey.length > 16) {
					bkey = core_md5(bkey, key.length * chrsz);
				}
				var ipad = Array(16), opad = Array(16);
				for (var i = 0; i < 16; i++) {
					ipad[i] = bkey[i] ^ 0x36363636;
					opad[i] = bkey[i] ^ 0x5C5C5C5C;
				}
				var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
				return core_md5(opad.concat(hash), 512 + 128);
			}

			safe_add = function(x, y) {
				var lsw = (x & 0xFFFF) + (y & 0xFFFF);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return (msw << 16) | (lsw & 0xFFFF);
			}

			bit_rol = function(num, cnt) {
				return (num << cnt) | (num >>> (32 - cnt));
			}
			str2binl = function(str) {
				var bin = Array();
				var mask = (1 << chrsz) - 1;
				for (var i = 0; i < str.length * chrsz; i += chrsz) {
					bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
				}
				return bin;
			}
			binl2hex = function(binarray) {
				var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
				var str = "";
				for (var i = 0; i < binarray.length * 4; i++) {
					str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
						hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
				}
				return str;
			}
			return hashMd5(str);
		},
		base64Encode: function(str) {
			var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				out = '', i = 0, len = str.length,
				c1, c2, c3;
			while (i < len) {
				c1 = str.charCodeAt(i++) & 0xff;
				if (i == len) {
					out += base64encodechars.charAt(c1 >> 2);
					out += base64encodechars.charAt((c1 & 0x3) << 4);
					out += '==';
					break;
				}
				c2 = str.charCodeAt(i++);
				if (i == len) {
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
		base64Decode: function(str) {
			var base64decodechars = new Array(
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
				52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
				-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
				15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
				-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
				41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
			),
				c1, c2, c3, c4,
				i = 0, len = str.length, out = '';
			while (i < len) {
				do {
					c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
				} while (i < len && c1 == -1);

				if (c1 == -1) {
					break;
				}

				do {
					c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
				} while (i < len && c2 == -1);

				if (c2 == -1) {
					break;
				}
				out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

				do {
					c3 = str.charCodeAt(i++) & 0xff;
					if (c3 == 61) {
						return out;
					}
					c3 = base64decodechars[c3];
				} while (i < len && c3 == -1);

				if (c3 == -1) {
					break;
				}

				out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

				do {
					c4 = str.charCodeAt(i++) & 0xff;
					if (c4 == 61) {
						return out;
					}
					c4 = base64decodechars[c4];
				} while (i < len && c4 == -1);

				if (c4 == -1) {
					break;
				}
				out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
			}
			return out;
		},
		toInt: function(str) {
			return parseInt();
		},
		toFloat: function(str) {
			return parseFloat(str);
		}

	};

	/*浏览器对象*/
	__T.browser = {
		isIE: function() {
			return (!document.all) ? false : true;
		},
		isIE6: function() {
			return (navigator.userAgent.indexOf("MSIE 6") > -1) ? true : false;
		},
		isIE7: function() {
			return (navigator.userAgent.indexOf("MSIE 7") > -1) ? true : false;
		},
		isIE8: function() {
			return (navigator.userAgent.indexOf("MSIE 8") > -1) ? true : false;
		},
		isIE9: function() {
			return (navigator.userAgent.indexOf("MSIE 9") > -1) ? true : false;
		},
		isIE10: function() {
			return (navigator.userAgent.indexOf("MSIE 10") > -1) ? true : false;
		},
		isIE11: function() {
			return (navigator.userAgent.indexOf("MSIE 11") > -1) ? true : false;
		},
		isIE12: function() {
			return (navigator.userAgent.indexOf("MSIE 12") > -1) ? true : false;
		},
		isFireFox: function() {
			return (navigator.userAgent.indexOf("Firefox") > -1) ? true : false;
		},
		isChrome: function() {
			return (navigator.userAgent.indexOf("Chrome") > -1) ? true : false;
		}
	}

	/*cookie操作类*/
	__T.cookie = {
		set: function() {
			var args = arguments,
				exp = new Date();
			exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000 / 2);
			exp = exp.toGMTString();
			if (args.length == 2) {
				document.cookie = args[0] + "=" + escape(args[1]) + ";expires=" + exp + ";path=/";
			}
			else if (args.length == 3) {
				document.cookie = args[0] + "=" + escape(args[1]) + ";expires=" + exp + ";path=/;domain=" + __T.domain;
			}
		},
		get: function(name) {
			var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			return (arr != null) ? unescape(arr[2]) : null;
		},
		del: function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			exp = exp.toGMTString();
			var val = this.get(name);
			if (val != null) {
				document.cookie = name + "=" + val + ";expires=" + exp + ";path=/;domain=" + __T.cookieDomain;
			}
		}
	}

	/*复制内容*/
	__T.copy = function(obj) {
		var text = obj;
		if (typeof (obj) == 'object') {
			text = obj.value;
		}

		if (!window.clipboardData) {
			return __T.alert("浏览器不支持自动复制，请手动复制");
		}
		if (window.clipboardData.setData("Text", text)) {
			__T.alert("你已复制成功!");
		}
	}

	// 格式化金额
	__T.fmoney = function(s, n, data) {
		var i, r, l, t;
		n = ((n > 0) && (n <= 20)) ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1];
		t = "";
		for (i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		r = t.split("").reverse().join("") + "." + r;

		if (typeof data == 'string') {
			r = data + r
		}
		return r;
	}

	// 获取event对象
	__T.getEvent = function() {
		if (document.all) {
			return window.event;
		}
		func = getEvent.caller;
		while (func != null) {
			var arg0 = func.arguments[0];
			if (arg0) {
				if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) return arg0;
			}
			func = func.caller;
		}
		return null;
	}

	// 获取target对象(须先获取event对象)
	__T.getEventTarget = function(e) {
		return e.target || e.srcElement;
	}

	/**
	 * 获取元素坐标定位
	 */
	__T.getPos = function(el) {
		var ua = navigator.userAgent.toLowerCase();
		var isOpera = (ua.indexOf('opera') != -1);
		var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof;
		el = (typeof el == 'string') ? __T("#" + el) : el;
		if (el.parentNode === null || el.style.display == 'none') {
			return false;
		}

		var parent = null;
		var pos = [];
		var box;
		if (el.getBoundingClientRect)    //IE
		{
			box = el.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			return { x: box.left + scrollLeft, y: box.top + scrollTop };
		}
		else if (document.getBoxObjectFor)    // gecko    
		{
			box = document.getBoxObjectFor(el);
			var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
			var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
			pos = [box.x - borderLeft, box.y - borderTop];
		}
		else    // safari & opera    
		{
			pos = [el.offsetLeft, el.offsetTop];
			parent = el.offsetParent;
			if (parent != el) {
				while (parent) {
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
				}
			}
			if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
				pos[0] -= document.body.offsetLeft;
				pos[1] -= document.body.offsetTop;
			}
		}

		parent = (el.parentNode) ? el.parentNode : null;
		while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') // account for any scrolled ancestors
		{
			pos[0] -= parent.scrollLeft;
			pos[1] -= parent.scrollTop;
			parent = (parent.parentNode) ? parent.parentNode : null;
		}
		return { x: pos[0], y: pos[1] };
	}

	/* 格式化日期 */
	__T.getLocTime = function(nS) {
		return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日|六|七|一|二|三|四|五|星期/g, "");
	}

	/*脚本库加载*/
	__T.lib = function(script, callback, isSync) {
		scripts = (typeof script == 'string') ? new Array(script) : script;
		var header = document.getElementsByTagName("head").item(0) || document.documentElement;
		var s = new Array();
		var last = scripts.length - 1;

		if (isSync) {
			var load = function(i) {
				s[i] = document.createElement("script");
				s[i].setAttribute("type", "text/javascript");
				s[i].onload = s[i].onreadystatechange = function() {
					if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
						this.onload = this.onreadystatechange = null;
						this.parentNode.removeChild(this);
						if (i != last) {
							load(i + 1);
						}
						else if (typeof (callback) == "function") {
							callback();
						}
					}
				}
				s[i].setAttribute("src", scripts[i]);
				header.appendChild(s[i]);
			}
			load(0);
			return;
		}

		var loaded = 0;
		for (var i = 0; i < scripts.length; i++) {
			s[i] = document.createElement("script");
			s[i].setAttribute("type", "text/javascript");
			s[i].onload = s[i].onreadystatechange = function() {
				if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
					loaded++;
					this.onload = this.onreadystatechange = null;
					this.parentNode.removeChild(this);
					if (loaded == scripts.length && typeof (callback) == "function") {
						callback();
					}
				}
			}

			s[i].setAttribute("src", scripts[i]);
			header.appendChild(s[i]);
		}
	}


	__T.load = function(url, callBack) {
		this.get(url, '', callBack);
	}

	__T.loadCss = function(url) {
		var css = __T.ui.create("link", { "href": url, "rel": "stylesheet", "type": "text/css" });
		__T.ui.insertHead(css);
	}

	__T.loadScript = function(url) {
		setTimeout(function() {
			var script = __T.ui.create("script", { "src": url, "type": "text/javascript" });
			__T.ui.insertHead(script);
		}, 0);
	}

	/* Location 操作类库 */
	__T.reload = function() {
		if (arguments[1]) {
			return setTimeout(' location.assign("' + arguments[0] + '")', parseInt(arguments[1]) * 1000);
		}
		if (!arguments[0]) {
			location.reload();
		}
		else {
			location.assign(arguments[0]);
		}
	}


	__T.thread = {
		_mIns: [],
		_sIns: [],
		single: function(input) {
			var t = parseInt(arguments[1]),
				k = (typeof input == 'function') ? input.toString().md5() : input.md5();
			if (this._sIns[k]) {
				clearTimeout(this._sIns[k]);
			}
			this.sIns[k] = setTimeout(input, t);
		},
		loop: function(input) {
			var t = parseInt(arguments[1]),
				k = (typeof input == 'function') ? input.toString().md5() : input.md5();
			if (this._sIns[k]) {
				clearInterval(this._sIns[k]);
			}
			this.sIns[k] = setInterval(input, t);
		}
	}

	/*UI类*/
	__T.ui = {
		_eBox: null,
		create: function(tag, attrs) {
			var e = document.createElement(tag);
			if (typeof attrs != 'object') {
				return e;
			}
			for (var n in attrs) {
				if (!attrs.hasOwnProperty(n)) {
					continue;
				}
				if (n == 'class' || n == 'className') {
					e.className = attrs[n];
				}
				else if (n == 'style') {
					e.style.cssText = attrs[n];
				}
				else {
					e.setAttribute(n, attrs[n]);
				}
			}
			return e;
		},
		insertHead: function(obj) {
			__T('head').appendChild(obj);
		},
		insertBody: function(obj) {
			var body = __T('body');
			body.insertBefore(obj, body.childNodes[0]);

		},
		insertToBox: function(e) {
			if (!e) {
				return false;
			}
			if (!this._eBox) {
				this._eBox = this.create('div', {});
				this.insertBody(this._eBox);
			}
			this._eBox.appendChild(e);
		},

		show: function() {
			var i = 0, e = arguments[0],
				t = arguments[1] || 0,
				op = arguments[2] || 100;
			if (!arguments[0] || !arguments[0].style) {
				return false;
			}
			(function() {
				if (t <= 0 || i > op) {
					return;
				}
				if (e.style.display == 'none') {
					e.style.display = '';
					e.style.filter = 'alpha(opacity=0)';
					e.style.opacity = 0;
				}
				e.style.filter = 'alpha(opacity=' + i + ')';
				e.style.opacity = i / 100;
				setTimeout(arguments.callee, t);
				i = i + 16;
			})();
		},

		hide: function() {
			var i = 100, e = arguments[0],
				t = arguments[1] || 0,
				op = arguments[2] || 0;
			if (!arguments[0] || !arguments[0].style) {
				return false;
			}
			(function() {
				if (t <= 0 || i < op) {
					e.style.display = 'none';
					return;
				}
				e.style.filter = 'alpha(opacity=' + i + ')';
				e.style.opacity = i / 100;
				setTimeout(arguments.callee, t);
				i = i - 16;
			})();
		},
		getStyle: function(obj, attr) {
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
		},
		getWH: function() {
			var s = (!arguments[0]) ? __T('body') : arguments[0],
				r = {};
			r.width = Math.max(s.scrollWidth, s.clientWidth);
			r.height = Math.max(s.scrollHeight, s.clientHeight);
			return r;
		}
	}

	/*遮罩层*/
	__T.ui.cover = function() {
		if (__T.ui.cover._obj) {
			return __T.ui.cover._obj;
		}
		var _cover = function() {
			this._coverObj = __T.ui.create('div', { 'style': 'position:absolute; background:#666; z-index:99999; top:0; left:0;' })
			__T.ui.insertToBox(this._coverObj);
			this.show = function() {
				var wh = __T.ui.getWH();
				this._coverObj.style.width = wh.width + 'px';
				this._coverObj.style.height = wh.height + 'px';
				__T.ui.show(this._coverObj, 1, 50);
			}

			this.hide = function() {
				__T.ui.hide(this._coverObj, 1);
			}
		}
		__T.ui.cover._obj = new _cover();
		return __T.ui.cover._obj;
	}

	/*输入框*/
	__T.ui.input = {
		onlyInt: function(id) {
			id = (typeof id == 'string') ? document.getElementById(id) : id;
			__T.bind(id, ['keyup', 'change', 'afterpaste'], function() {
				this.value = this.value.replace(/\D/g, '');
				if (this.value == '' || this.value == '0') {
					this.value = '';
				}
			});
		},
		onlyString: function(id) {
			id = (typeof id == 'string') ? document.getElementById(id) : id;
			__T.bind(id, ['keyup', 'change', 'afterpaste'], function() {
				this.value = this.value.repalce(/\W/g, '');
			});
		},
		getNameValue: function(name) {
			var i, dos = 0;
			__T('name=' + name).each(function() {
				if (this.checked) {
					return this.value;
				}
			});
		}
	}

	/*滚动条*/
	__T.ui.scrollBar = function(showBoxId, boxId, scrollId) {

		this.box = '';
		this.scrollBar = '';
		this.doBind = function() {
			var scrollBar = __T("#" + scrollId)
			if (!scrollBar) {
				return;
			}
			var showBox = __T('#' + showBoxId),
				fun, self = this,
				box = __T("#" + boxId);

			this.box = box;
			this.scrollBar = scrollBar;

			fun = function(ev) {
				self.doroll(ev);
			}
			showBox.onmouseover = function() {
				if (window.addEventListener) {
					window.addEventListener('DOMMouseScroll', fun, false);
					window.onmousewheel = document.onmousewheel = fun;
				}
			}

			showBox.onmouseout = function() {
				if (window.addEventListener) {
					window.removeEventListener('DOMMouseScroll', fun);
					window.onmousewheel = document.onmousewheel = function() {
					};
				}
			}

			scrollBar.onmousedown = function(ev) {
				var _this = this;
				var oEvent = ev || event;
				var disy = oEvent.clientY - _this.offsetTop;
				document.onmousemove = function(ev) {
					var oEvent = ev || event;
					var l = oEvent.clientY - disy;
					self.setLeft(l);
				};
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmouseup = null;
				};

				if (ev && ev.preventDefault) {

					ev.preventDefault();

				} else {

					// IE中阻止函数器默认动作的方式

					window.event.returnValue = false;

				}

				return false;
			}

		}

		this.setLeft = function(l) {
			var obj = this.scrollBar;
			if (l < 0) {
				l = 0;
			}
			else if (l > obj.parentNode.offsetHeight - obj.offsetHeight) {
				l = obj.parentNode.offsetHeight - obj.offsetHeight;
			}
			obj.style.top = l + 'px';
			var scale = l / (obj.parentNode.offsetHeight - obj.offsetHeight);
			this.box.style.top = -(this.box.offsetHeight + 34 - obj.parentNode.offsetHeight) * scale + 'px';
		}

		this.doroll = function(event) {
			var delta = 0;
			if (!event) {
				event = window.event;
			}
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) {
					delta = -delta;
				}
			}
			else if (event.detail) {
				delta = -event.detail / 3;
			}

			var top = parseInt(this.scrollBar.style.top);
			if (!top) {
				top = 0;
			}
			top -= delta * 3;
			this.setLeft(top);

		}

		this.doBottom = function() {
			this.setLeft(100000);
		}

		this.doBind();
	}

	/*悬浮提示窗 */
	__T.ui.popupTrigger = function() {
		if (__T.ui.popupTrigger._msgbox) {
			return false;
		}
		var msgBox = __T.ui.create('div', { 'style': 'position:absolute; background:#FFF3E9;line-height:20px;display:none;padding:0px 20px;border:1px solid #FFC56A;color:#000; z-index:999; top:0; left:0;' })
		__T.ui.insertToBox(msgBox);
		__T('.__T_popupTrigger').bind('mouseover', function() {
			var pos = __T.getPos(this);
			var top = pos.y + this.offsetHeight;
			var left = pos.x + this.offsetWidth;
			left = (left > 800) ? left - msgBox.offsetWidth - this.offsetWidth : left + this.offsetWidth;
			msgBox.innerHTML = this.getAttribute("data-popupmsg");
			msgBox.style.top = top + "px";
			msgBox.style.left = left + "px";
			msgBox.style.display = '';
		}).bind('mouseout', function() {
			msgBox.style.display = 'none';
		})
		__T.ui.popupTrigger._msgbox = msgBox;
		__T.ui.popupTrigger.setStyle = function(config) {
			if (typeof config != 'object') {
				return false;
			}
			__T.extend(__T.ui.popupTrigger._msgbox.style, config);
		}

	}

	/*移动*/
	__T.ui.moveTo = function(obj, conf, fn) {
		if (obj._moveTimer) {
			clearInterval(obj._moveTimer);
		}
		obj._moveTimer = setInterval(function() {
			var bStop = true;//这一次运动就结束了——所有的值都到达了
			for (var attr in conf) {
				//1.取当前的值
				var style = __T.ui.getStyle(obj, attr);
				var iCur = (attr == 'opacity') ? Math.round(parseFloat(style) * 100) : parseInt(style);
				//2.算速度
				var iSpeed = (conf[attr] - iCur) / 8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

				//3.检测停止
				if (iCur != conf[attr]) {
					bStop = false;
				}
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				}
				else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if (!bStop) {
				return;
			}
			clearInterval(obj._moveTimer);
			if (typeof fn == 'function') {
				fn();
			}
		}, 10)
	}
	/*滑动舌签*/
	__T.ui.slidingDoors = function(c) {
		var _door = function(c) {
			if (typeof c != 'object' || !c.id) {
				return;
			}
			var e, id = c.id,
				isLoop = c.loop ? true : false,
				act = (c.act == 'click') ? 'click' : 'mouseover',
				t = c.intval ? parseInt(c.intval) : 5,
				tag = c.tag ? c.tag : 'div',
				on = c.on || 'on',
				off = c.off || 'off',
				es = $('#' + id + ' ' + tag);
			if (es.length == 0) {
				return;
			}
			var currentId = 0;
			for (var i = 0; i < es.length; i++) {
				e = es[i];
				e.orderId = i;
				e.nextId = (i == es.length - 1) ? 0 : i + 1;
				e.toE = __T("#" + e.getAttribute('toid'));
				e['on' + act] = function() {
					for (var j = 0; j < es.length; j++) {

						if (j == this.orderId) {
							this.className = on;
							if (this.toE) {
								this.toE.style.display = '';
							}
						}
						else {
							es[j].className = off;
							if (es[j].toE) {
								es[j].toE.style.display = 'none';
							}
						}

					}
					currentId = this.nextId;
				}
			}

			if (!(isLoop && t > 0)) {
				return;
			}
			setInterval(function() {
				es[currentId]['on' + act]();
			}, t * 1000);
		}
		return new _door(c);
	}

	/*弹窗*/
	__T.ui.popupLayer = function() {
		if (__T.ui.popupLayer._obj) {
			return __T.ui.popupLayer._obj;
		}
		var _popupLayer = function() {
			var position = __T.browser.isIE6() ? 'absolute' : 'fixed';
			this._divs = {};
			this._eMain = __T.ui.create('DIV', { 'style': 'position:' + position + ';width:0px;height:0px; display:none;background:#fff; z-index:100001; top:100px; left:100px;opacity:1; -moz-opacity:1; filter:alpha(opacity=100);' });
			__T.ui.insertToBox(this._eMain);
			this._eBorder = __T.ui.create('DIV', { 'style': 'position:' + position + '; z-index:10000;display:none; background:#fff;top:0px; left:0px;opacity:0.3; -moz-opacity:0.3; filter:alpha(opacity=30);' });
			__T.ui.insertToBox(this._eBorder);
			this._eClose = __T.ui.create('DIV', { 'style': 'position:' + position + ';color:#fff;border-radius:30px;background-color:#000;background:rgba(0,0,0,0.7);width:20px;height:20px;line-height:20px;text-align:center;font-size:16px;cursor:pointer; display:none; z-index:100002; top:0px; left:0px;opacity:1; -moz-opacity:1; filter:alpha(opacity=100);' });
			this._eClose.innerHTML = 'X';
			__T.bind(this._eClose, 'click', function() { __T.ui.popupLayer().hide() });
			__T.ui.insertToBox(this._eClose);
			this._ef = __T.ui.create('iframe', { 'style': 'overflow:hidden', 'scrolling': 'no', 'frameborder': '0' });
			this._ed = __T.ui.create('div', {});
			this._eMain.appendChild(this._ef);
			this._eMain.appendChild(this._ed);

			this.isShow = function() {
				return this._eMain.style.display == 'none' ? false : true;
			}

			this.show = function() {
				var str = arguments[0] || '';
				var config = typeof arguments[1] == 'object' ? arguments[1] : {};
				var type = config.type != 'DIV' ? '' : 'DIV';
				var w = parseInt(config.width ? config.width : 500);
				var h = parseInt(config.height ? config.height : 290);
				var md5 = str.md5();
				var callback = (arguments[2] && typeof arguments[2] == 'function') ? arguments[2] : function() { };
				for (var i in this._divs) {
					if (this._divs[i].style.display != 'none') {
						this._divs[i].style.display = 'none';
					}
				}

				var di = this._divs[md5];
				if (!di) {
					di = __T.ui.create('div', { 'style': 'display:;' });
					di.innerHTML = str;
					this._ed.appendChild(di);
					this._divs[md5] = di;
				}
				di.style.display = '';
				this.changePos(di, w, h);
				if (type != 'DIV') {

					//='about:blank';
					this._ef.src = str;
					this._ed.style.display = 'none';
					this._ef.width = w + 'px';
					this._ef.height = h + 'px';
					this._ef.style.display = '';
				}
				else {
					this._ef.style.display = 'none';
					this._ed.width = w + 'px';
					this._ed.height = h + 'px';
					this._ed.style.display = '';
				}
				if (!(config.isCover === false)) {
					__T.ui.cover().show(1);
				}
				if (!(config.isBorder === false)) {
					__T.ui.show(this._eBorder, 1, 70);
				}
				__T.ui.show(this._eMain, 1);
				if (!(config.isClose === false)) {
					__T.ui.show(this._eClose, 1, 80);
				}
				callback();
			}

			this.hide = function() {
				var callback = (arguments[0] && typeof arguments[0] == 'function') ? arguments[0] : function() { };
				__T.ui.cover().hide(1);
				__T.ui.hide(this._eBorder, 1);
				__T.ui.hide(this._eMain, 1);
				__T.ui.hide(this._eClose, 1);
				callback();
			}

			this.changePos = function(e, w, h) {
				var bodyWidth = __T.ui.getWH().width;
				var left = window.screen.width / 2 - w / 2;
				var top = __T.browser.isIE6() ? (__T('body').scrollTop + window.screen.height / 2 - h / 2 - 100) : (window.screen.height / 2 - h / 2 - 100);

				__T.extend(this._eMain.style, {
					'width': w + 'px',
					'height': h + 'px',
					'left': left + 'px',
					'top': top + 'px'
				});

				__T.extend(this._eBorder.style, {
					'width': (w + 16) + 'px',
					'height': (h + 16) + 'px',
					'left': (left - 8) + 'px',
					'top': (top - 8) + 'px'
				});
				__T.extend(this._eClose.style, {
					'left': (w + left - 3) + 'px',
					'top': (top - 20) + 'px'
				});
			}

			this.setStyle = function(config) {
				if (config.main) {
					__T.extend(this._eMain, config.main);
				}
				if (config.borer) {
					__T.extend(this._eMain, config.main);
				}
				if (config.close) {
					__T.extend(this._eClose, config.main);
				}
				return __T.ui.popupLayer._obj;
			}
		}

		__T.ui.popupLayer._obj = new _popupLayer();
		return __T.ui.popupLayer._obj;
	}

	/*弹出窗*/
	__T.ui.messageBox = function(w, h) {
		if (__T.ui.messageBox._obj) {
			return __T.ui.messageBox._obj;
		}

		var _messageBox = function() {
			this.w = w || 400;
			this.h = h || 139;
			this.mbID = '__T_UI_MESSAGEBOX';
			this.mbcID = '__T_UI_MESSAGEBOX_CONTENT';
			this.mbtID = '__T_UI_MESSAGEBOX_TITLE';

			this.innerHTML = '<div style="font-size:12px" id="__T_UI_MESSAGEBOX">' +
				'<div class="ziliaoA">' +
				'<div style="background:#CE1E1E;height:30px;line-height:30px;padding:0px 10px;color:#FFFFFF; border-bottom:1px solid #000"><div id="__T_UI_MESSAGEBOX_TITLE" style="float:left">提示</div><a onclick="__T.ui.messageBox().hide()" style="float:right;cursor:pointer;color:#FFFFFF">关闭</a></div>' +
				'<div style="padding:5px 10px">' +
				'<dl style="min-height:50px;_height:50px" id="__T_UI_MESSAGEBOX_CONTENT"></dl>' +
				'<dl><span onclick="__T.ui.messageBox().hide()" class="button02" style=""><span style="margin-left:145px;text-align:center;width:60px;height:22px;line-height:22px;cursor:pointer;display:block;padding:2px;background:#CE1E1E;border:1px solid #000;color:#FFFFFF">确定</span></span></dl>' +
				'</div></div></div>';

			this.show = function(m, t) {
				t = arguments[1] || '提示';
				m = arguments[0] || '';
				__T.ui.popupLayer().show(this.innerHTML, { 'type': 'DIV', 'width': this.w, 'height': this.h, 'isClose': false });
				$('#' + this.mbcID).innerHTML = m;
				$('#' + this.mbtID).innerHTML = t;
			}

			this.hide = function() {
				__T.ui.popupLayer().hide();
			}
		}

		__T.ui.messageBox._obj = new _messageBox(w, h);
		return __T.ui.messageBox._obj;
	}

	/* AJAX操作函数 */
	__T.ajax = function(config) {
		if (typeof config != 'object') {
			return false;
		}

		var toQueryString = function(obj) {
			var query = '';
			for (var param in obj) {
				query += param + '=' + encodeURIComponent(obj[param]) + '&';
			}
			return query.substring(0, query.length - 1);
		}

		try {
			var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e2) {

			}
		}
		if ((!httpRequest) && (typeof XMLHttpRequest != 'undefined')) {
			httpRequest = new XMLHttpRequest();
		}

		var i, url = config['url'];
		if (!config['url']) {
			return false;
		}

		var data = (typeof config['data'] != 'string') ? toQueryString(config['data']) : config['data'];
		var method = (config['method'] && config['method'].toUpperCase() == "POST") ? 'POST' : 'GET';
		var dataType = (typeof config['dataType'] == 'string' && config['dataType'] == 'JSON') ? 'JSON' : 'XML';
		var headers = (typeof config['headers'] == 'object') ? config['headers'] : {};
		var callback = (typeof config['callback'] == 'function') ? config['callback'] : function() { };

		if (method == "POST") {
			headers["Content-type"] = "application/x-www-form-urlencoded";
		}
		else {
			if (url.indexOf('?') < 0) {
				url += '?';
			}
			if (method == 'GET' && url.indexOf('&') > -1) {
				url += '&' + data;
			}
			data = null;
		}
		httpRequest.onreadystatechange = function() {
			if (parseInt(httpRequest.readyState) != 4) {
				return;
			}

			var res = httpRequest.responseText;
			if (dataType == 'JSON') {
				res = res.parseJSON();
			}
			callback.call(httpRequest, res);
		}
		httpRequest.open(method, url, true);
		for (i in headers) {
			httpRequest.setRequestHeader(i, headers[i]);
		}
		httpRequest.send(data);
	}

	__T.get = function(url, data, callback, type) {
		if (typeof data == 'function') {
			callback = data;
			data = {};
		}
		return __T.ajax({ 'url': url, 'callback': callback, 'data': data, 'dataType': type });
	}

	__T.jsonp = {};

	__T.getJSON = function(url, data, callback) {
		if (typeof data == 'function') {
			callback = data;
			data = {};
		}
		if (typeof data != 'object') {
			return false;
		}
		if (typeof callback != 'function') {
			return false;
		}

		var query = '';
		for (var i in data) {
			query += i + "=" + encodeURIComponent(data[param]) + "&";
		}

		var fn = 'jsonp' + new Date().getTime();
		if (!__T.jsonp[fn]) {
			__T.jsonp[fn] = function(res) {
				callback(res);
			}
		}

		query += "jsonpCallback=$.jsonp." + fn;
		url += (url.indexOf("?") > -1) ? query : "?" + query;
		__T.loadScript(url);
	}

	__T.post = function(url, data, callback, type) {
		return __T.ajax({ 'url': url, "method": "POST", "callback": callback, "data": data, "dataType": type });
	}

	__T.comet = function(url) {
		if (!url || typeof url != 'string') {
			return;
		}
		var isWs = window.WebSocket ? 1 : 0;
		url = (isWs ? 'ws://' : 'http://') + url;
		url += (url.indexOf('?') > -1) ? '&is_ws=' + isWs : '?is_ws=' + isWs;

		var WebSocket = window.WebSocket || function(url) {
			var xmlHttp, self = this;
			this.xmlHttp = xmlHttp;
			this.onopen = function() { };
			this.onclose = function() { };
			this.onerror = function() { };
			this.onmessage = function() { };
			this.send = function() { };
			if (typeof XMLHttpRequest != 'undefined') {
				xmlHttp = new XMLHttpRequest();
			}
			else {
				try {
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) {
					try {
						xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e2) {
						xmlHttp = false;
					}
				}
			}
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 1) {
					self.onopen();
				}
				else if (xmlHttp.readyState == 4) {
					if (xmlHttp.status == 200) {
						self.onmessage({ data: this.responseText, status: this.status });
					}
					else {
						self.onerror({ data: this.responseText, status: this.status });
					}

					self.onclose();
				}
			}
			xmlHttp.open("GET", url, true);
			xmlHttp.send(null);
		}

		var Client = function(url) {
			var self = this;
			this.url = url;
			this.isConnected = false;
			this.events = [];
			this.ws = null;

			this.daemon = function() {
				if (!this.ws) {
					this.connect();
				}
			}

			this.send = function() {
				if (this.ws && this.isConnected) {
					this.ws.send(text);
				}
			}
			this.connect = function() {
				var ws = this.ws = new WebSocket(self.url);
				ws.onopen = function() {
					self.isConnected = true;
					this.send(self.url);
				}
				ws.onerror = function() {
					self.ws = null;
					self.isConnected = false;
				}
				ws.onmessage = function() {
					self.onmessage.apply(self, arguments);
				}
				ws.onclose = function() {
					self.ws = null;
					self.isConnected = false;
				}
			}
			this.onmessage = function(e) {
				var es = this.events;
				for (var i = 0; i < es.length; i++) {
					es[i](e.data);
				}
			}

			//绑定推送事件
			this.bind = function(handle) {
				if (typeof handle != 'function') {
					return this;
				}
				this.events.push(handle);
				return this;
			}
			self.daemon();
			setInterval(function() { self.daemon(); }, 2000);
		}

		return new Client(url);
	}


	// 弹出对话框
	__T.alert = function(str) {
		__T.ui.messageBox(400, 139).show(str);
	}

	/* 滑动舌签 简单幻灯片 */
	__T.door = function(c) {
		return __T.ui.slidingDoors(c);
	}
	/*循环数组或者对象*/
	__T.each = __T.array.each;

	__T.show = __T.ui.show;

	__T.hide = __T.ui.hide;



	__T.slide = function(options, height) {
		var slide = new __T.slideCreate();
		var id = __T.slideCollection.length;
		__T.slideCollection[id] = slide;
		slide.id = id;
		slide.setOptions(options, height);
		slide.start();
		return slide;

	}

	__T.slideCollection = new Array();
	__T.slideCreate = function(options) {
		this.beSwitchs = new Array();   /* 被切换的元素 */
		this.switchs = new Array();    /* 启动切换的触发元素 */
		this.cutoverType = 1;   /* 幻灯片切换方式99 随机切换 0 直接切换, 1 = 上下切换 2 左右切换 3 透明切换 */
		this.cutoverInterval = 5   /* 为整数秒,最小为1 最大为60 */;
		this.currentId = 0;   /* 当前展示的Id */
		this.lastId = 0;   /* 需要被切换的ID */
		this.timeHandle = null;
		this.width = 500;
		this.height = 300;
		this.onClass = "on";
		this.offClass = "";
		this.tHandle = null;
		this.mainBox = null;
		this.clickBox = null;
		this.isClick = false;
		/* 设置 */
		this.setOptions = function(options, height) {
			if (typeof options == "object") {
				this.cutoverType = (!__T.isNumeric(options["type"])) ? 1 : parseInt(options["type"]);
				(this.cutoverType < 0 || this.cutoverType > 3) && (this.cutoverType = 99);
				(options["interval"] != undefined) && (this.cutoverInterval = parseInt(options["interval"]));
				(options["on"] != undefined) && (this.onClass = options["on"]);
				(options["off"] != undefined) && (this.offClass = options["off"]);
				(options["click"] != undefined) && (this.offClass = options["click"]);
				(this.cutoverInterval < 1 || this.cutoverInterval > 60) && (this.cutoverInterval = 5);
				if ((options["beSwitchs"] != undefined) && (options["switchs"] != undefined)) {
					var length = Math.min(options["beSwitchs"].length, options['switchs'].length);
					for (var i = 0; i < length; i++) {
						this.addGroup(options["beSwitchs"][i], options['switchs'][i]);
					}
				}
			}
			else {
				this.type == "auto";
				__T.isNumeric(options) && (this.width = options);
				__T.isNumeric(height) && (this.height = height);
				this.createSlide();
			}
		}
		this.createSlide = function() {
			var id = String("sidle_" + this.id).md5(),
				clickId = id.md5();
			string = '<div style="width:' + this.width + 'px;height:' + this.height + 'px;overflow:hidden;" id="' + id + '"><div  style="float:right;position:absolute;bottom:0px;right:0px;z-index:1005" id="' + clickId + '">';
			document.write(string + '</div></div>');
			this.mainBox = __T("#" + id);
			this.clickBox = __T("#" + clickId);
		}
		this.add = function(src, href) {
			if (!href) { href = "/"; }
			var image = document.createElement("IMG");
			image.src = src;
			image.h = href;
			image.onclick = function() { window.open(this.h); }
			image.style.cssText = "width:" + this.width + "px;height:" + this.height + "px;position:absolute;opacity:1; -moz-opacity:1; filter:alpha(opacity=100);cursor:poniter";
			this.beSwitchs.push(image);
			this.mainBox.appendChild(image);
			var span = document.createElement("SPAN");
			this.switchs.push(span);
			span.id = this.switchs.length;

			if (this.isClick) {
				span.onclick = this.clickCutover;
			}
			else {
				span.onmouseover = this.clickCutover;
			}
			span.style.cssText = "display:block;margin:2px 1px;padding:2px 5px;width:25px;text-align:center;float:left;cursor:pointer;background:#aaa;opacity:0.7; -moz-opacity:0.7; filter:alpha(opacity=70)";
			span.innerHTML = this.switchs.length;
			this.clickBox.appendChild(span);
			return this;
		}
		this.clickCutover = function() {
			var parent = arguments.callee.parent;
			parent.lastId = parent.currentId;
			parent.currentId = this.id;
			if (!parent.timeHandle) {
				clearTimeout(parent.timeHandle);
			}
			parent.cutover();
		}
		/* 添加一张幻灯片 */
		this.addGroup = function(beSwitch, switching) {
			var bs = __T.getWH(beSwitch);
			beSwitch.width = bs.width;
			beSwitch.height = bs.height;
			this.beSwitchs.push(beSwitch);
			switching.id = this.switchs.length;
			this.switchs.push(switching);
			if (this.isClick) {
				switching.onclick = this.clickCutover;
			}
			else {
				switching.onmouseover = this.clickCutover;
			}
		}

		this.start = function() {
			if (this.beSwitchs.length <= 1) {
				return;
			}
			this.cutover();
		}

		this.clickCutover.parent = this;

		/* 执行切换 */
		this.cutover = function() {
			if (this.timeHandle) {
				clearTimeout(this.timeHandle)
			}
			var downId;
			if (this.currentId >= this.beSwitchs.length) {
				this.currentId = 0;
			}
			this.beSwitchs[this.currentId].style.display = "none";
			for (var cid = this.currentId, len = this.beSwitchs.length, index = len - 1, i = 0; i < len; i++) {
				if (cid == len) {
					cid = 0;
				}
				if (index >= len) {
					index = 0;
				}
				this.beSwitchs[cid].style.zIndex = index;
				if (index == len - 2) {
					downId = cid;
				}

				this.switchs[i].className = (this.currentId == i || (this.currentId == 0 && i == this.beSwitchs.length)) ?
					this.onClass : this.offClass;

				index++;
				cid++;
			}

			var types = [0, 1, 2, 3];
			var ix = this.cutoverType;
			if (!__T.inArray(this.cutoverType, types)) {
				var ix = Math.ceil(Math.random() * 3);
			}

			if (ix == 3) {

			}
			else if (ix == 1) {

				if (this.currentId < this.lastId) {
					this.downToUp(this.currentId, downId, this.beSwitchs[this.currentId].height);
				}
				else {
					this.upToDown(this.currentId, downId, this.beSwitchs[this.currentId].height);
				}

			}
			else if (ix == 2) {
				if (this.currentId >= this.lastId) {
					this.leftToRight(this.currentId, downId, this.beSwitchs[this.currentId].height);
				}
				else {
					this.rightToLeft(this.currentId, downId, this.beSwitchs[this.currentId].height);
				}
			}
			this.beSwitchs[this.currentId].style.display = "";
			this.lastId = parseInt(this.currentId);
			this.currentId++;
			this.timeHandle = setTimeout("__T.slideCollection[" + this.id + "].cutover()", this.cutoverInterval * 1000);
		}

		this.upToDown = function(currentId, downId, top) {
			if (top <= 0) {
				this.beSwitchs[downId].style.marginTop = "0px";
				this.beSwitchs[currentId].style.marginTop = "0px";
				if (this.tHandle) {
					clearTimeout(this.tHandle);
				}
				return;
			}

			this.beSwitchs[currentId].style.marginTop = -1 * top + "px";
			this.beSwitchs[downId].style.marginTop = String((this.beSwitchs[downId].height - top)) + "px";
			var one = Math.ceil(this.beSwitchs[downId].height / 30 * 0.2);
			top -= one;
			if (top >= 30) {
				top -= one * 8;
			}
			if (!this.tHandle) {
				this.beSwitchs[downId].style.marginLeft = "0px";
				this.beSwitchs[currentId].style.marginLeft = "0px";
				clearTimeout(this.tHandle);
			}
			this.tHandle = setTimeout("__T.slideCollection[" + this.id + "].upToDown(" + currentId + "," + downId + "," + top + ")", 10);
		}

		this.downToUp = function(currentId, downId, top) {
			if (top <= 0) {
				this.beSwitchs[downId].style.marginTop = "0px";
				this.beSwitchs[currentId].style.marginTop = "0px";
				if (this.tHandle) {
					clearTimeout(this.tHandle);
				}
				return;
			}

			this.beSwitchs[currentId].style.marginTop = String(top) + "px";
			this.beSwitchs[downId].style.marginTop = String(-1 * (this.beSwitchs[downId].height - top)) + "px";
			var one = Math.ceil(this.beSwitchs[downId].height / 20 * 0.1);
			top -= one;
			if (top >= 30) {
				top -= one * 8;
			}
			if (!this.tHandle) {
				this.beSwitchs[downId].style.marginLeft = "0px";
				this.beSwitchs[currentId].style.marginLeft = "0px";
				clearTimeout(this.tHandle);
			}
			this.tHandle = setTimeout("__T.slideCollection[" + this.id + "].downToUp(" + currentId + "," + downId + "," + top + ")", 10);
		}

		this.leftToRight = function(currentId, downId, top) {
			if (top <= 0) {
				this.beSwitchs[downId].style.marginLeft = "0px";
				this.beSwitchs[currentId].style.marginLeft = "0px";
				if (this.tHandle) {
					clearTimeout(this.tHandle);
				}
				return;
			}

			this.beSwitchs[currentId].style.marginLeft = -1 * top + "px";
			this.beSwitchs[downId].style.marginLeft = String((this.beSwitchs[downId].width - top)) + "px";
			var one = Math.ceil(this.beSwitchs[downId].width / 20 * 0.1);
			top -= one;
			if (top >= 30) {
				top -= one * 8;
			}
			if (!this.tHandle) {
				this.beSwitchs[downId].style.marginLeft = "0px";
				this.beSwitchs[currentId].style.marginLeft = "0px";
				clearTimeout(this.tHandle);
			}
			this.tHandle = setTimeout("__T.slideCollection[" + this.id + "].leftToRight(" + currentId + "," + downId + "," + top + ")", 10);
		}

		this.rightToLeft = function(currentId, downId, top) {
			if (top <= 0) {
				this.beSwitchs[downId].style.marginLeft = "0px";
				this.beSwitchs[currentId].style.marginLeft = "0px";
				if (this.tHandle) {
					clearTimeout(this.tHandle);
				}
				return;
			}

			this.beSwitchs[currentId].style.marginLeft = top + "px";
			this.beSwitchs[downId].style.marginLeft = String(-1 * (this.beSwitchs[downId].width - top)) + "px";
			var one = Math.ceil(this.beSwitchs[downId].width / 20 * 0.1);
			top -= one;
			if (top >= 30) {
				top -= one * 8;
			}
			if (!this.tHandle) {
				this.beSwitchs[downId].style.marginLeft = "0px";
				this.beSwitchs[currentId].style.marginLeft = "0px";
				clearTimeout(this.tHandle);
			}
			this.tHandle = setTimeout("__T.slideCollection[" + this.id + "].rightToLeft(" + currentId + "," + downId + "," + top + ")", 10);
		}
	}

	/* 原型库 */






	__T.upload = function() {
		// 文件上传类
		var fileUpload = function() {
			this.initialize.apply(this, arguments);
		}

		fileUpload.prototype = {

			// 表单对象，文件控件存放空间
			initialize: function(form, folder, options) {

				// 表单
				this.Form = __T("#" + form);

				// 文件控件存放空间
				this.Folder = __T("#" + folder);

				// 文件集合
				this.Files = [];

				this.SetOptions(options);

				this.FileName = this.options.FileName;
				this._FrameName = this.options.FrameName;
				this.Limit = this.options.Limit;
				this.Distinct = !!this.options.Distinct;
				this.ExtIn = this.options.ExtIn;
				this.ExtOut = this.options.ExtOut;

				this.onIniFile = this.options.onIniFile;
				this.onEmpty = this.options.onEmpty;
				this.onNotExtIn = this.options.onNotExtIn;
				this.onExtOut = this.options.onExtOut;
				this.onLimite = this.options.onLimite;
				this.onSame = this.options.onSame;
				this.onFail = this.options.onFail;
				this.onIni = this.options.onIni;
				this.onComplete = this.options.onComplete;
				this.className = this.options.className

				if (!this._FrameName) {
					// 为每个实例创建不同的iframe
					this._FrameName = "uploadFrame_" + Math.floor(Math.random() * 1000);

					// ie不能修改iframe的name
					var oFrame = __T.broswer.isIE() ? document.createElement("<iframe name=\"" + this._FrameName + "\" >") : document.createElement("iframe");

					// 为ff设置name
					oFrame.name = this._FrameName;
					oFrame.style.display = "none";

					this._isInit = false;
					__T.bind(oFrame, "load", __T.apply(this, this.completeUpload));

					// 在ie文档未加载完用appendChild会报错
					document.body.insertBefore(oFrame, document.body.childNodes[0]);
				}

				// 设置form属性，关键是target要指向iframe
				this.Form.target = this._FrameName;
				this.Form.method = "post";

				// 注意ie的form没有enctype属性，要用encoding
				this.Form.encoding = "multipart/form-data";

				// 整理一次
				this.Ini();
			},
			// 设置默认属性
			SetOptions: function(options) {
				this.options = {// 默认值
					FileName: "Files[]",// 文件上传控件的name，配合后台使用
					FrameName: "",// iframe的name，要自定义iframe的话这里设置name
					onIniFile: function() { },// 整理文件时执行(其中参数是file对象)
					onEmpty: function() { },// 文件空值时执行
					Limit: 10,// 文件数限制，0为不限制
					onLimite: function() { },// 超过文件数限制时执行
					Distinct: true,// 是否不允许相同文件
					onSame: function() { },// 有相同文件时执行
					ExtIn: ["gif", "jpg", "rar", "zip", "iso", "swf", "exe", "txt", "csv"],// 允许后缀名  
					onNotExtIn: function() { },// 不是允许后缀名时执行
					ExtOut: [],// 禁止后缀名，当设置了ExtIn则ExtOut无效
					onExtOut: function() { },// 是禁止后缀名时执行
					onFail: function() { },// 文件不通过检测时执行(其中参数是file对象)
					onIni: function() { }, // 重置时执行,
					onComplete: function() { }, //完成上传时调用 
					className: ""
				};
				__T.extend(this.options, options || {});
			},
			// 整理空间
			Ini: function() {

				// 整理文件集合
				this.Files = [];

				// 整理文件空间，把有值的file放入文件集合
				__T.each(this.Folder.getElementsByTagName("input"), __T.apply(this, function(o) {
					if (o.type == "file") {
						o.value && this.Files.push(o);
						this.onIniFile(o);
					}
				}))

				// 插入一个新的file
				var file = document.createElement("input");
				file.name = this.FileName;
				file.type = "file";
				file.className = this.className;

				file.onchange = __T.apply(this, function() {
					// 是否为单文件模式

					if (this.options.isSingleton && this.Files.length > 0) {
						this.Clear();
						this.Files = [];
					}

					//this.Ini();
					var s = this.Check(file);
					if (this.options.isSingleton && s) {
						this.Form.submit();
					}


				});

				this.Folder.appendChild(file);

				// 执行附加程序
				this.onIni();
			},

			// 检测file对象
			Check: function(file) {

				// 检测变量
				var bCheck = true;

				// 空值、文件数限制、后缀名、相同文件检测
				if (!file.value) {
					bCheck = false;
					this.onEmpty();
				}
				else if (this.Limit && (this.Files.length >= this.Limit)) {
					bCheck = false;
					this.onLimite();
				}
				else if ((!!this.ExtIn.length) && !RegExp("\.(" + this.ExtIn.join("|") + ")$", "i").test(file.value)) {
					// 检测是否允许后缀名
					bCheck = false;
					this.onNotExtIn();
				}
				else if (!!this.ExtOut.length && RegExp("\.(" + this.ExtOut.join("|") + ")$", "i").test(file.value)) {
					// 检测是否禁止后缀名
					bCheck = false;
					this.onExtOut();
				} else if (!!this.Distinct) {
					__T.each(this.Files, function(o) {
						if (o.value == file.value) {
							bCheck = false;
						}
					});

					if (!bCheck) {
						this.onSame();
					}
				}

				// 没有通过检测
				if (!bCheck) {
					this.onFail(file);
				}
				return bCheck;

			},

			// 删除指定file
			Delete: function(file) {
				// 移除指定file
				this.Folder.removeChild(file); this.Ini();
			},

			// 删除全部file
			Clear: function() {

				// 清空文件空间
				__T.each(this.Files, __T.apply(this, function(o) {

					this.Folder.removeChild(o);
				}
				));
				this.Ini();
			},

			completeUpload: function() {
				if (!this._isInit) {
					this._isInit = true;
					return false;
				}

				var frame = window.frames[this._FrameName];
				var content = frame.document.documentElement.outerHTML;
				if (content != "") {
					var reg = /<\/?[^>]*>/g;
					content = content.replace(reg, '');
					var json = content.parseJSON(content);
					this.onComplete(json);
				}

			}
		}
		return new fileUpload(arguments[0], arguments[1], arguments[2]);
	};

	/*初始化开始*/
	__T.extend(window.Array.prototype, {
		each: function(callback, args) {
			__T.array.each(this, callback, args);
			return this;
		},
		inArray: function(val) {
			return __T.array.inArray(val, this);
		},
		unquie: function() {
			return __T.array.unique(this);
		},
		uniqueObj: function() {
			return __T.array.uniqueObj(this);
		}
	});

	/* 字符串扩展 */
	__T.extend(window.String.prototype, {
		trim: function() {
			return __T.string.trim(this);
		},
		ltrim: function() {
			return __T.string.ltrim(this);
		},
		rtrim: function() {
			return __T.string.rtrim(this);
		},
		ucfirst: function() {
			return __T.string.ucfirst(this);
		},
		parseJSON: function() {
			return __T.string.parseJSON(this)
		},
		/* 解析XML字符串 */
		parseXML: function() {
			return __T.string.parseXML(this);
		},
		isNumeric: function() {
			return __T.string.isNumeric(this);
		},
		isInt: function() {
			return __T.string.isInt(this);
		},
		isEnglish: function() {
			return __T.string.isEnglish(this);
		},
		isChinese: function() {
			return __T.string.isChinese(this);
		},
		isFloat: function() {
			return __T.string.isFloat(this);
		},
		isMobileCode: function() {
			return __T.string.isMobileCode(this);
		},
		isIdcard: function() {
			return __T.string.isIdcard(this);
		},
		isLower: function() {
			return __T.string.isLower(this);
		},
		isUpper: function() {
			return __T.string.isUpper(this);
		},
		isUrl: function() {
			return __T.string.isUrl(this);
		},
		isEmail: function() {
			return __T.string.isEmail(this);
		},
		isDomain: function() {
			return __T.string.isDomain(this);
		},
		getLength: function() {
			return __T.string.getLength(this);
		},
		md5: function() {
			return __T.string.md5(this);
		},
		toInt: function() {
			return parseInt(this);
		},
		toFloat: function() {
			return parseFloat(this);
		},
		base64Encode: function() {
			return __T.string.base64Encode(this);
		},
		base64Decode: function() {
			return __T.string.base64Decode(this);
		}

	});

	window.__T = window.$ = __T;

})(window);

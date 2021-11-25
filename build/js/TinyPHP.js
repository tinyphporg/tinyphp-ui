import '~scss/tinyphp.ui.scss';

import $ from 'jquery';
import Prototype from './Prototype.js';
import Bootstrap from './Bootstrap.js';
import Alert from './Alert.js';
import Cookie from './Cookie.js';
import Summernote from './Summernote.js';
import * as AdminLTE from 'admin-lte/build/js/AdminLTE';

class Tiny {

    static _$ = $;

    static _window = window;

    static _Prototype = Prototype;

    static _Boostrap = Bootstrap;
    
    static _adminlte = AdminLTE;

    static _Plugin = Plugin;

    static _postLoadPlugins = [];

    static _isPostLoaded = false;

    static merge = Prototype.merge;

    static extend = Prototype.extend;

    static isArray = Prototype.isArray;

    static isObject = Prototype.isObject;
    
    static _plugins = {
        alert: Alert,
        summernote: Summernote,
        cookie: Cookie
        
    };

    static _preload() {
        let jqueryExtends = {
            tiny: Tiny
        }
        for (let i in Tiny._plugins) {
            if (!Tiny._plugins.hasOwnProperty(i)) {
                continue;
            }
            let plugin = Tiny._plugins[i];
            if (!plugin.preload) {
                continue;
            }
            if (plugin.jqueryExtend !== null) {
                for (let id in plugin.jqueryExtend) {
                    if (plugin.jqueryExtend.hasOwnProperty(id)) {
                        jqueryExtends[id] = plugin.jqueryExtend[id];
                    }
                }
            }
            $.extend(jqueryExtends);

            let jqueryFnExtends = {}
            if (plugin.jqueryFnExtend !== null) {
                for (let id in plugin.jqueryFnExtend) {
                    if (plugin.jqueryFnExtend.hasOwnProperty(id)) {
                        jqueryFnExtends[id] = plugin.jqueryFnExtend[id];
                    }
                }
            }

        }

    }

    static load(config) {
        if (typeof config === 'string' && Tiny._plugins.hasOwnProperty(config)) {
            return Tiny._plugins[config].load();
        }
        else if (Array.isArray(config)) {
            let loads = [];
            config.forEach(pid => {
                if (typeof pid == 'string' && Tiny._plugins.hasOwnProperty(pid)) {
                    loads.push(Tiny._plugins[pid].load());
                }
            });
            return Promise.all(loads);
        }
        else if (Object.prototype.toString.call(config) === '[object Object]') {
            let loads = [];
            for (let pid in config) {
                if (config.hasOwnProperty(pid) && Tiny._plugins.hasOwnProperty(pid) && Boolean(config[pid])) {
                    if (config[pid] === 'postload' && !Tiny._isPostLoaded) {
                        Tiny._postLoadPlugins.push(Tiny._plugins[pid]);
                    }
                    else {
                        loads.push(Tiny._plugins[pid].load());
                    }
                }
            }
            return Promise.all(loads);
        }
    }

    static _postload() {
        Tiny._isPostLoaded = true;
        let loads = [];
        
        Tiny._postLoadPlugins.forEach(plugin => {
            loads.push(plugin.load());
        });

        return Promise.all(loads);
    }
    
}

Tiny._preload();
$(Tiny._postload);
export default Tiny;

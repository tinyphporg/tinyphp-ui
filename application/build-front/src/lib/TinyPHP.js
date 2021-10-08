import $ from 'jquery';
import Prototype from '@lib/tinyphp/Prototype';
import '@lib/bootstrap';
import AdminLTE from '@lib/adminlte';

import Alert from './plugin/Alert';
import Summernote from './plugin/Summernote';

class Tiny {

    static _$ = $;

    static _window = window;

    static _Prototype = Prototype;

    static _AdminLTE = AdminLTE;

    static _Plugin = Plugin;

    static _postLoadPlugins = [];

    static _isPostLoaded = false;

    static merge = Prototype.merge;

    static extend = Prototype.extend;

    static isArray = Prototype.isArray;

    static isObject = Prototype.isObject;
    
    static _plugins = {
        alert: Alert,
        summernote: Summernote
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
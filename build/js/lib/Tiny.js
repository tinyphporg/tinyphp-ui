import Prototype from './prototype'
import * as BootstrapWidgets from '../widgets/bootstrap'
import Summernote from '../plugins/summernote'
import Alert from '../plugins/alert.js'
import Cookie from '../plugins/cookie.js'


class Tiny extends Prototype {
    constructor(config) {
        super()
        this._init(config)
        this._preloadPlugins()
    }

    // async load plugins
    load(config) {
        let loads = []
        console.log(this)
        // string
        if (typeof config === 'string' && this.plugins.hasOwnProperty(config)) {
            return Promise.all([this.plugins[config].load()])
        }
        // array
        if (Array.isArray(config)) {
            config.forEach(pname => {
                if (typeof pname === 'string' && this.plugins.hasOwnProperty(pname)) {
                    loads.push(this.plugins[pname].load());
                }
            })
            return Promise.all(loads);
        }
        // object
        if (Object.prototype.toString.call(config) === '[object Object]') {
            for (let pname in config) {
                if (config.hasOwnProperty(pname) && this.plugins.hasOwnProperty(pname) && Boolean(config[pid])) {
                    loads.push(Tiny._plugins[pid].load());
                }
            }
            return Promise.all(loads);
        }
    }

    _init(config) {
        // define
        this.data = {}
        this.jqueryExtends = {
            tiny: this,
            load: (p) => {return this.load(p)}
        }
        this.jqueryFnExtends = {}

        //
        this.widgets = BootstrapWidgets
        this.plugins = {
            summernote: new Summernote(),
            alert: new Alert(),
            cookie: new Cookie()
        }

        // config
        this._initConfig(config)
        this._initData(window)
    }

    _initConfig(config) {
        if (!Tiny.isObject(config)) {
            return;
        }

        // widgets
        if (config.hasOwnProperty('widgets') && Tiny.isObject(config.widgets)) {
            for (let wname in config.widgets) {
                if (config.widgets.hasOwnProperty(wname)) {
                    this.widgets[wname] = config.widgets[wname];
                }
            }
        }

        // plugins
        if (config.hasOwnProperty('plugins') && Tiny.isObject(config.plugins)) {
            for (let pname in config.plugins) {
                if (config.plugins.hasOwnProperty(pname)) {
                    this.plugins[pname] = config.plugins[pname];
                }
            }
        }
    }

    //
    _initData() {
        // preload
        const data = this._parseMetaData()
        data.preload.forEach((pname) => {
            if (!this.plugins.hasOwnProperty(pname)) {
                return
            }
            this.plugins[pname].preload = true
        })

        // post load
        data.postload.forEach((pname) => {

            if (!this.plugins.hasOwnProperty(pname)) {
                return
            }
            this.plugins[pname].postload = true
        })
    }

    _parseMetaData() {
        let data = { preload: [], postload: [] }

        // meta config
        const content = $("meta[name='tinyphp-ui']").attr('content')
        if (content === undefined) {
            return data
        }
        content.split(';').forEach((nodeContent) => {
            let node = nodeContent.split('=')
            if (node.length !== 2) {
                return
            }
            let nodeName = node[0]
            let nodeValues = node[1].split(',')
            nodeValues.forEach((val, index) => {
                if (val === '') {
                    delete nodeValues[index]
                }
            })
            if (data.hasOwnProperty(nodeName)) {
                Object.assign(data[nodeName], nodeValues)
            } else {
                data[nodeName] = nodeValues
            }
        })
        return data
    }

    _preloadPlugins() {
        for (let pname in this.plugins) {
            if (!this.plugins.hasOwnProperty(pname)) {
                continue;
            }

            // proload
            let plugin = this.plugins[pname];
            if (!plugin.preload) {
                continue
            }

            // jquery extend
            for (let pluginId in plugin.jqueryExtend) {
                if (!plugin.jqueryExtend.hasOwnProperty(pluginId)) {
                    continue
                }
                this.jqueryExtends[pluginId] = plugin.jqueryExtend[pluginId]
            }

            // jquery fn extend 
            for (let pluginFnId in plugin.jqueryFnExtend) {
                if (!plugin.jqueryFnExtend.hasOwnProperty(pluginFnId)) {
                    continue
                }
                this.jqueryFnExtends[pluginFnId] = plugin.jqueryFnExtend[pluginFnId]
            }
            $.extend(this.jqueryExtends)
            $.fn.extend(this.jqueryFnExtends)

        }
    }
}
export default Tiny
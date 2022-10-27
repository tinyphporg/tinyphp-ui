import {
    extend,
    merge,
    isArray,
    isObject
} from '../utils/prototype'
import * as basePluginConfig from './base-plugins'
import * as baseWidgets from './base-widgets'

const SELECTOR_META = "meta[name='tinyphp-ui']"

class Tiny {
    constructor(config) {
        Tiny._currentInstance = this;

        // init config
        this.widgets = baseWidgets
        this.plugins = {}
        this.data = {}
        this.jqueryExtends = {}
        this.jqueryFnExtends = {}
        
        this._pluginConfig = basePluginConfig

        // parse Config
        this._parseConfig(config)

        // init metadata

        this._parseMetaData()

        this._initPlugins()
        //this._preloadPlugins()

    }

    // async load plugins
    load(...config) {
        const self = Tiny._currentInstance

        if (!config.length) {
            return
        }
        if (config.length == 1) {
            config = config[0]
        }


        let loads = []
        console.log(config)
        console.log(typeof config)
        // string
        
        if (typeof config === 'string' && self.plugins.hasOwnProperty(config)) {
            return self.plugins[config].load()
        }
        
        console.log(self)
        // array
        if (Array.isArray(config)) {
            config.forEach(pname => {
                
                if (typeof pname === 'string' && self.plugins.hasOwnProperty(pname)) {
                    loads.push(self.plugins[pname].load());
                }
            })
            return Promise.all(loads);
        }
        // object
        if (Object.prototype.toString.call(config) === '[object Object]') {
            for (let pname in config) {
                if (config.hasOwnProperty(pname) && self.plugins.hasOwnProperty(pname) && Boolean(config[pid])) {
                    loads.push(Tiny._plugins[pid].load());
                }
            }

            return Promise.all(loads);
        }
    }

    // config
    _parseConfig(config) {
        if (!isObject(config)) {
            return;
        }

        // widgets
        if (config.hasOwnProperty('widgets') && isObject(config.widgets)) {
            Object.assign(this.widgets, config.widgets)
        }

        // plugins
        if (config.hasOwnProperty('plugins') && isObject(config.plugins)) {
            Object.assign(this._pluginConfig, config.plugins)
        }
    }

    _parseMetaData() {

        // parse meta config
        this.data = (() => {
            let data = { preload: [] }
            let content = $(SELECTOR_META).attr('content')
            if (content === undefined) {
                return data
            }
            // 解析
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
        })()
    }

    _initPlugins() {
        const pluginConfig = this._pluginConfig
        const preloadPluginNames = this.data.preload

        // init plugins to instance
        for (let pname in pluginConfig) {
            if (!pluginConfig.hasOwnProperty(pname)) {
                continue;
            }

            // create plugin
            this._createPluginInstance(pname)
        }

        // preload
        preloadPluginNames.forEach((pname) => {
            if (this.plugins.hasOwnProperty(pname)) {
                this.plugins[pname].preload = true
            }
        })
        
        let preloadPlugins = []
        for (let pname in this.plugins) {
            
            // plugin name
            let plugin = this.plugins[pname]
            if (plugin.preload) {
                preloadPlugins.push(plugin.id)
            }
            
            // plugin jquery extend
            for (let jid in plugin.jqueryExtend) {
                if (plugin.jqueryExtend.hasOwnProperty(jid)) {
                    this.jqueryExtends[jid] = plugin.jqueryExtend[jid]
                }
            }
            
            // plugin jquery fn extend
            for (let jfid in plugin.jqueryFnExtend) {
                if (plugin.jqueryFnExtend.hasOwnProperty(jfid)) {
                    this.jqueryFnExtends[jfid] = plugin.jqueryFnExtend[jfid]
                }
            }
        }

        // init jquery fn extend 
        console.log(preloadPlugins)
        $.extend(this.jqueryExtends)
        $.fn.extend(this.jqueryFnExtends)

        // prload
        if (preloadPlugins.length > 0) {
            this.load(preloadPlugins)
        }
        return
    }

    _createPluginInstance(pname) {
        if (!this._pluginConfig.hasOwnProperty(pname)) {
            return false
        }
        let pluginClass = this._pluginConfig[pname]
        let pluginInstance = new pluginClass(this)
        let pid = pluginInstance.id
        this.plugins[pid] = pluginInstance
        return pluginInstance
    }
}
export default Tiny
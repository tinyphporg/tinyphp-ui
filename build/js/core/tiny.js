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

        this._parseData()

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
        // string        
        if (typeof config === 'string' && self.plugins.hasOwnProperty(config)) {
            return self.plugins[config].load()
        }
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

    _parseData() {
        let data = { uiPreload: [], uiPublicPath: ''}
        const $script = $('script:last')[0]     
        const dataset = $script.dataset
        
        for (let name in dataset) {
            if (!dataset.hasOwnProperty(name) || !data.hasOwnProperty(name)) {
                continue
            }
            if (name  === 'uiPreload') {
                Object.assign(data[name], dataset[name].split(','))
                continue
            }
            data[name] = dataset[name]
        }
        
        if (!data['uiPublicPath'] || data['uiPublicPath'] == '') {
            const src = $script.src
            let matchs = null
            if (matchs = src.match(/^(.+)\/js\/tinyphp-ui(\.admin|)(\.min)?\.js$/)) {
                data['uiPublicPath'] = matchs[1] + '/'
            }
        }
        this.data = data
    }

    _initPlugins() {
        const pluginConfig = this._pluginConfig
        
        // 
        const preloadPluginNames = this.data.uiPreload
        const publicpath = this.data.uiPublicPath
        
        // public path 
        if (publicpath) {
            __webpack_public_path__ = publicpath
        }
        
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
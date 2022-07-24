import Prototype from './Prototype'
import Bootstrap from './widgets/Bootstrap'
import Summernote from './plugins/Summernote.js'
import Alert from './plugins/Alert.js'
import Cookie from './plugins/Cookie.js'

class Tiny extends Prototype
{
	data = {}
	
	// 部件 继承bootstrap的部件
	widgets = Bootstrap

	// 插件
	plugins = {
		Summernote,
		Alert,
		Cookie
	}
	
	jqueryExtends = {}
	
	
	jqueryFnExtends = {}

	// 构造函数
	constructor(config, window) {
		super();
		this.initConfig(config)
		this.initData(window);
		window.tiny = this
		this.window = window
		this.$ = $
		this.jqueryExtends['tiny'] = this
		this.initPlugins();
	}
	
	initConfig(data) {
		if (!this.isObject(data)) {
			return;
		}
		
		// widgets
		if (data.hasOwnProperty('widgets') && this.isObject(data.widgets)) {
			for (let wname in data.widgets) {
				if (data.widgets.hasOwnProperty(wname)) {
					this.widgets[wname] = data.widgets[wname];
				}
			}
		}
		
	    // plugins
		if (data.hasOwnProperty('plugins') && this.isObject(data.plugins)) {
			for (let pname in data.plugins) {
				if (data.plugins.hasOwnProperty(pname)) {
					this.plugins[pname] = data.plugins[pname];
				}
			}
		}
	}
	
	//
	initData(window) {
		if (!window.hasOwnProperty('tinyphp_ui_plugins')) {
			return;
		}
		let tdata = window['tinyphp_ui_config'];		
		if (tdata.hasOwnProperty('plugins')) {
			for (let pname in tdata.plugins) {
				if (!this.plugins.hasOwnProperty(pname)) {
					continue;
				}
				
				let plugin = tdata.plugins[pname];
				console.log(plugin)
			}
		}
	}
	
     initPlugins() {
        for (let i in this.plugins) {
            if (!this.plugins.hasOwnProperty(i)) {
                continue;
            }
			
            let plugin = this.plugins[i];
            if (!plugin.preload) {
                continue;
            }
            
			for (let id in plugin.jqueryExtend) {
				if (plugin.jqueryExtend.hasOwnProperty(id)) {
					this.jqueryExtends[id] = plugin.jqueryExtend[id];
                }
            }

			
            $.extend(this.jqueryExtends);
			// fn 

                for (let id in plugin.jqueryFnExtend) {
                    if (plugin.jqueryFnExtend.hasOwnProperty(id)) {
                        this.jqueryFnExtends[id] = plugin.jqueryFnExtend[id];
                    }
                }

			$.fn.extend(this.jqueryFnExtends);
        }

    }
	
}
export default Tiny
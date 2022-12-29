import {
    extend,
    merge,
    isArray,
    isObject
} from '../utils/prototype'
import BasePlugin from './base-plugin'
// summernote 编辑器
class Tiny extends BasePlugin {
    constructor(loader) {
        super()
        this.id = 'tiny'
        
        const loadPlugins = {}
        
        const load = function(...config) {
            return loader.load(...config)
        }
        
        extend(load, {
            Tiny: loader,
            extend,
            merge,
            isArray,
            isObject,         
        })

        this.jqueryExtend = {
            tiny: load,
            load:load
        }
        
        this.jqueryFnExtend = {
            serializeObject: this.serializeObject
        }
    }
    
    serializeObject = function() {
        let obj = {}
        $.each(this.serializeArray(), function(){
            if (obj[this.name] !== undefined) {
                if (!isArray(obj[this.name])) {
                    obj[this.name] = [obj[this.name]]
                }
                obj[this.name].push(this.value || '')
            } else {
                obj[this.name] = this.value || ''
            }  
        })
        return obj
    }
}
export default Tiny
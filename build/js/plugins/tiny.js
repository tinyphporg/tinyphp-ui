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
    }
}
export default Tiny
import $ from 'jQuery'

// base plugin
class BasePlugin {
    
    static _instances = {}
    
    constructor() {
        this.preload = false
        this.jqueryFnExtend = {}
        this.jqueryExtend = {}
    }

    async load(){
            return this
    }
    
}

export default BasePlugin
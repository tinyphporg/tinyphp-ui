import $ from 'jQuery'

// base plugin
class BasePlugin {
    constructor() {
        this._$ = $
        this.id = 'cookie'
        this.preload = true
        this.jqueryFnExtend = {}
        this.jqueryExtend = {}
    }
    
    async load(){
            return this
    }
}

export default BasePlugin
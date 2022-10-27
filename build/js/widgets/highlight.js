import {
    defineJQueryPlugin,
    typeCheckConfig
} from '~bootstrap/src/util/index'

import BaseComponent from '~bootstrap/src/base-component'
import SelectorEngine from '~bootstrap/src/dom/selector-engine'
import Manipulator from '~bootstrap/src/dom/manipulator'
import EventHandler from '~bootstrap/src/dom/event-handler'
import Codemirror from '../plugins/codemirror'

const NAME = 'highlight'
const DATA_KEY = 'ui.highlight'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`


const Default = {
    language: "javascript",
    readonly: true,
    callback: function() { }
}


const DefaultType = {
    language: 'string',
    readonly: 'boolean',
    callback: "function"
}

// SELECTOR
const SELECTOR_DATA_TOGGLE = '[data-widget="highlight"], code[class^="language-"], textarea[class^="language-"]'

class Highlight extends BaseComponent {
    constructor(element, config) {
        super(element)
        this._config = this._getConfig(config)
    }

    // Getters

    static get NAME() {
        return NAME
    }

    static get Default() {
        return Default
    }

    // public
    toggle(relatedTarget) {
        return (new Codemirror).codemirrorx.call(relatedTarget, this._config);
    }

    // Private    
    _getConfig(config) {
        config = {
            ...Default,
            ...Manipulator.getDataAttributes(this._element),
            ...(typeof config === 'object' ? config : {})
        }
        typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    // Static
    static jQueryInterface(config) {
        if (typeof config === 'function') {
            config = {
                callback: config
            }
        }

        return this.each(function() {
            const data = Highlight.getOrCreateInstance(this, config)
            data.toggle(this)
        })
    }
}


EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach(el => Highlight.getOrCreateInstance(el).toggle(el))
})

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */
defineJQueryPlugin(Highlight)
export default Highlight
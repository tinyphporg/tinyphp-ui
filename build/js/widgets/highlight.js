import HighLight  from'../plugins/codemirror'
import EventHandler from '~bootstrap/src/dom/event-handler'
const DATA_KEY = 'bs.highlight'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-widget="highlight"], code[class^="language-"]'

// load
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const $element = $(SELECTOR_DATA_TOGGLE)
    if ($element.length < 1) {
        return
    }
    $.load('codemirror').then(()=>{
         $(SELECTOR_DATA_TOGGLE).highlight()
    })
})

export default HighLight
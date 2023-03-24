import Select2 from'../plugins/select2'
import EventHandler from '~bootstrap/src/dom/event-handler'
const DATA_KEY = 'ui.select2'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-ui-widget="select2"]'

// load
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const $element = $(SELECTOR_DATA_TOGGLE)
    if ($element.length < 1) {
        return
    }
    $(SELECTOR_DATA_TOGGLE).select2x()
})

export default Select2
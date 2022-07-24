/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.3): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
  defineJQueryPlugin,
  getElementFromSelector,
  isDisabled,
  isVisible,
  typeCheckConfig
} from '~bootstrap/src/util/index'
import ScrollBarHelper from '~bootstrap/src/util/scrollbar'
import EventHandler from '~bootstrap/src/dom/event-handler'
//import BaseComponent from '~bootstrap/src/base-component'
//import Offcanvas from "~bootstrap/src/offcanvas"
import SelectorEngine from '~bootstrap/src/dom/selector-engine'
import Manipulator from '~bootstrap/src/dom/manipulator'
import Backdrop from '~bootstrap/src/util/backdrop'
import FocusTrap from '~bootstrap/src/util/focustrap'
import { enableDismissTrigger } from '~bootstrap/src/util/component-functions'


/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


const DATA_KEY = 'bs.siderbar'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = 'Escape'

const Default = {
  backdrop: true,
  keyboard: true,
  scroll: false
}

const DefaultType = {
  backdrop: 'boolean',
  keyboard: 'boolean',
  scroll: 'boolean'
}

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop'
const OPEN_SELECTOR = '.offcanvas.show'

const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-widget="siderbar"]'



//class Siderbar extends Offcanvas {
	
//}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation*
*/

EventHandler.on(window, 'load', () =>
  SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach(el =>  el.setAttribute('data-bs-toggle', 'offcanvas'))
)

//enableDismissTrigger(Siderbar)
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

//defineJQueryPlugin(Siderbar)

export default {}

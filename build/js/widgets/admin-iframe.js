import {
    defineJQueryPlugin,
    getElement,
    getElementFromSelector,
    getSelector,
    isDisabled,
    isVisible,
    typeCheckConfig
} from '~bootstrap/src/util/index'

import Storager from '../utils/storager'

import ScrollBarHelper from '~bootstrap/src/util/scrollbar'
import BaseComponent from '~bootstrap/src/base-component'
import SelectorEngine from '~bootstrap/src/dom/selector-engine'
import Manipulator from '~bootstrap/src/dom/manipulator'
import Backdrop from '~bootstrap/src/util/backdrop'
import FocusTrap from '~bootstrap/src/util/focustrap'
import { enableDismissTrigger } from '~bootstrap/src/util/component-functions'

import EventHandler from '~bootstrap/src/dom/event-handler'
import Offcanvas from '~bootstrap/src/offcanvas'

const NAME = 'admin-iframe'
const DATA_KEY = 'bs.admin-iframe'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = 'Escape'

const Default = {
    backdrop: true,
    keyboard: true,
    scroll: false,
    onTabClick(item) {
        return item
  },
  onTabChanged(item) {
    return item
  },
  onTabCreated(item) {
    return item
  },
  autoIframeMode: true,
  autoItemActive: true,
  autoShowNewTab: true,
  allowDuplicates: false,
  loadingScreen: true,
  useNavbarItems: true,
  scrollOffset: 40,
  scrollBehaviorSwap: false,
  iconMaximize: 'fa-expand',
  iconMinimize: 'fa-compress'    
}

const DefaultType = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
}


const SELECTOR_DATA_TOGGLE = '[data-bs-widget="admin-iframe"]'
const SELECTOR_DATA_TOGGLE_CLOSE = '[data-widget="iframe-close"]'
const SELECTOR_DATA_TOGGLE_SCROLL_LEFT = '[data-widget="iframe-scrollleft"]'
const SELECTOR_DATA_TOGGLE_SCROLL_RIGHT = '[data-widget="iframe-scrollright"]'
const SELECTOR_DATA_TOGGLE_FULLSCREEN = '[data-widget="iframe-fullscreen"]'
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'
const SELECTOR_CONTENT_IFRAME = `${SELECTOR_CONTENT_WRAPPER} iframe`
const SELECTOR_TAB_NAV = `${SELECTOR_DATA_TOGGLE}.iframe-mode .nav`
const SELECTOR_TAB_NAVBAR_NAV = `${SELECTOR_DATA_TOGGLE}.iframe-mode .navbar-nav`
const SELECTOR_TAB_NAVBAR_NAV_ITEM = `${SELECTOR_TAB_NAVBAR_NAV} .nav-item`
const SELECTOR_TAB_NAVBAR_NAV_LINK = `${SELECTOR_TAB_NAVBAR_NAV} .nav-link`
const SELECTOR_TAB_CONTENT = `${SELECTOR_DATA_TOGGLE}.iframe-mode .tab-content`
const SELECTOR_TAB_EMPTY = `${SELECTOR_TAB_CONTENT} .tab-empty`
const SELECTOR_TAB_LOADING = `${SELECTOR_TAB_CONTENT} .tab-loading`
const SELECTOR_TAB_PANE = `${SELECTOR_TAB_CONTENT} .tab-pane`
const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link'
const SELECTOR_SIDEBAR_SEARCH_ITEM = '.sidebar-search-results .list-group-item'
const SELECTOR_HEADER_MENU_ITEM = '.main-header .nav-item a.nav-link'
const SELECTOR_HEADER_DROPDOWN_ITEM = '.main-header a.dropdown-item'
const CLASS_NAME_IFRAME_MODE = 'iframe-mode'
const CLASS_NAME_FULLSCREEN_MODE = 'iframe-mode-fullscreen'


class IFrame extends BaseComponent {
  constructor(element, config) {
    super(element)
    
    this._config = this._getConfig(config)
    this._isEnabled = false
    this._isFrameElement = false
    
    // in iframe
    if (window.frameElement && window.frameElement.hasAttribute('iframe-tab-id')) {
        this._isFrameElement = true
        $('body').addClass('iframe-mode')
        return;
    }
    this._tabNavBar = this._getTabNavBar()
    this._tabContent = this._getTabContent()
    this._init()
    this._initIframe()
  } 
    // Getters
    static get NAME() {
        return NAME
    }

    static get Default() {
        return Default
    }
    static _sidebarTarget = null
    
    
    static getOrCreateSidebarTarget(element) {
       if (this._sidebarTarget) {
            return this._sidebarTarget
        }
        let target = null
        if (element.hasAttribute('data-bs-target')) {
           target = getElementFromSelector(element)
        } else {
            const targetId = 'control-sidebar-target-' + Math.random().toString().md5().substr(0, 8)
            target = document.createElement('aside')
            target.id = targetId     
            let targetParent = SelectorEngine.findOne("body")
            targetParent.append(target)
            element.setAttribute('data-bs-target', '#' + targetId)      
        }
        return this._sidebarTarget = target
    }
    
    toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget)
    }
    
    _getConfig(config) {
    config = {
      ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    }
    typeCheckConfig(NAME, config, DefaultType)
    return config
  }
      
    init = () => {
            $('.nav-sidebar').addClass('nav-flat nav-compact nav-collapse-hide-child nav-child-indent')
            const options = Storager.get(NAME)
            if (options) {
                this.initOptions(options)
            }
    }
    
    initOptions = (options) => {
        this.options = options
        
        // init dark-mode
        this.changeDarkMode(options['dark-mode'] !== false)
                
        // init themes
        options['themes'] && this.changeThemes(options['themes'])
        
        // sidebar
        this.changeSidebarDarkMode(options['sidebar'] !== false)
        
        // layouts
        Default.layouts.forEach((className) => {
            this.changeFixed(className, options[className] === true, false)
        })
        
        // multi pages
        this.changeIFrame(options['multipages'] === true)

    }
    
    saveOptions = (key, value) =>{
        this.options[key] = value
        Storager.set(NAME, this.options)
    }
    
    enable = () => {
    if (!this._isShown) {
      return
    }
    this._isShown = false     
   // this._getOrOffcanvas().hide()
    }
    
    disable = () => {
    if (this._isShown) {
      return
    }
    this._isShown = true           
    //    this._getOrOffcanvas().show()
    }
    
  dispose() {
  //  this._getOrOffcanvas().dispose()
    super.dispose()
  } 
  
  // Public

  onTabClick(item) {
    this._config.onTabClick(item)
  }

  onTabChanged(item) {
    this._config.onTabChanged(item)
  }

  onTabCreated(item) {
    this._config.onTabCreated(item)
  }

  createTab(title, link, uniqueName, autoOpen) {
    let tabId = `panel-${uniqueName}`
    let navId = `tab-${uniqueName}`

    if (this._config.allowDuplicates) {
      tabId += `-${Math.floor(Math.random() * 1000)}`
      navId += `-${Math.floor(Math.random() * 1000)}`
    }

    const newNavItem = `<li class="nav-item" role="presentation"><a class="nav-link" data-toggle="row" id="${navId}" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">${title}</a> <a href="javascript:void(0)" class="btn-iframe-close" data-widget="iframe-close" data-type="only-this"><i class="bi bi-x"></i></a></li>`
    $(SELECTOR_TAB_NAVBAR_NAV).append(unescape(escape(newNavItem)))

    const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe id="iframe-${tabId}" iframe-tab-id="${tabId}" iframe-nav-id="${navId}"  src="${link}#admin-iframe-mode"></iframe></div>`
    $(SELECTOR_TAB_CONTENT).append(unescape(escape(newTabItem)))
    
    if (autoOpen) {
      if (this._config.loadingScreen) {
        const $loadingScreen = $(SELECTOR_TAB_LOADING)
        $loadingScreen.fadeIn()
        $(`${tabId} iframe`).ready(() => {
          if (typeof this._config.loadingScreen === 'number') {
            this.switchTab(`#${navId}`)
            setTimeout(() => {
              $loadingScreen.fadeOut()
            }, this._config.loadingScreen)
          } else {
            this.switchTab(`#${navId}`)
            $loadingScreen.fadeOut()
          }
        })
      } else {
        this.switchTab(`#${navId}`)
      }
    }

    this.onTabCreated($(`#${navId}`))
  }

  openTabSidebar(item, autoOpen = this._config.autoShowNewTab) {
    let $item = $(item).clone()
    if ($item.attr('href') === undefined) {
      $item = $(item).parent('a').clone()
    }

    $item.find('.right, .search-path').remove()
    let title = $item.find('p').text()
    if (title === '') {
      title = $item.text()
    }

    const link = $item.attr('href')
    if (link === '#' || link === '' || link === undefined) {
      return
    }

    const uniqueName = link.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(--)/gi, '')
    const navId = `tab-${uniqueName}`

    if (!this._config.allowDuplicates && $(`#${navId}`).length > 0) {
      return this.switchTab(`#${navId}`)
    }

    if ((!this._config.allowDuplicates && $(`#${navId}`).length === 0) || this._config.allowDuplicates) {
      this.createTab(title, link, uniqueName, autoOpen)
    }
  }

  switchTab(item) {
    const $item = $(item)
    const tabId = $item.attr('href')

    $(SELECTOR_TAB_EMPTY).hide()
    $(`${SELECTOR_TAB_NAVBAR_NAV} .active`).tab('dispose').removeClass('active')
    this._fixHeight()

    $item.tab('show')
    $item.parents('li').addClass('active')
    this.onTabChanged($item)

    if (this._config.autoItemActive) {
      this._setItemActive($(`${tabId} iframe`).attr('src'))
    }
  }

  removeActiveTab(type, element) {
    if (type == 'all') {
      $(SELECTOR_TAB_NAVBAR_NAV_ITEM).remove()
      $(SELECTOR_TAB_PANE).remove()
      $(SELECTOR_TAB_EMPTY).show()
    } else if (type == 'all-other') {
      $(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}:not(.active)`).remove()
      $(`${SELECTOR_TAB_PANE}:not(.active)`).remove()
    } else if (type == 'only-this') {
      const $navClose = $(element)
      const $navItem = $navClose.parent('.nav-item')
      const $navItemParent = $navItem.parent()
      const navItemIndex = $navItem.index()
      const tabId = $navClose.siblings('.nav-link').attr('aria-controls')
      $navItem.remove()
      $(`#${tabId}`).remove()
      if ($(SELECTOR_TAB_CONTENT).children().length == $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        $(SELECTOR_TAB_EMPTY).show()
      } else {
        const prevNavItemIndex = navItemIndex - 1
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'))
      }
    } else {
      const $navItem = $(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}.active`)
      const $navItemParent = $navItem.parent()
      const navItemIndex = $navItem.index()
      $navItem.remove()
      $(`${SELECTOR_TAB_PANE}.active`).remove()
      if ($(SELECTOR_TAB_CONTENT).children().length == $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        $(SELECTOR_TAB_EMPTY).show()
      } else {
        const prevNavItemIndex = navItemIndex - 1
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'))
      }
    }
  }

  toggleFullscreen() {
    if ($('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
      $(`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMinimize).addClass(this._config.iconMaximize)
      $('body').removeClass(CLASS_NAME_FULLSCREEN_MODE)
      $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height('auto')
      $(SELECTOR_CONTENT_WRAPPER).height('auto')
      $(SELECTOR_CONTENT_IFRAME).height('auto')
    } else {
      $(`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMaximize).addClass(this._config.iconMinimize)
      $('body').addClass(CLASS_NAME_FULLSCREEN_MODE)
    }

    $(window).trigger('resize')
    this._fixHeight(true)
  }

  // Private

  _init() {
    if (!$(this._element).hasClass(CLASS_NAME_IFRAME_MODE)) {
         $(this._element).addClass(CLASS_NAME_IFRAME_MODE)
    }
    if ($(SELECTOR_TAB_CONTENT).children().length > 2) {
        const $el = $(`${SELECTOR_TAB_PANE}:first-child`)
        $el.show()
        this._setItemActive($el.find('iframe').attr('src'))
    }

    this._setupListeners()
      this._fixHeight(true)
  }
  
  
  
  _initIframe() {
    
    // first
    const $sidebar = $(`${SELECTOR_SIDEBAR_MENU_ITEM}[href!='#']:first`)
    this.openTabSidebar($sidebar)
}

  _navScroll(offset) {
    const leftPos = $(SELECTOR_TAB_NAVBAR_NAV).scrollLeft()
    $(SELECTOR_TAB_NAVBAR_NAV).animate({ scrollLeft: (leftPos + offset) }, 250, 'linear')
  }

  _setupListeners() {
    $(window).on('resize', () => {
      setTimeout(() => {
        this._fixHeight()
      }, 1)
    })
    $(document).on('click', `${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_SIDEBAR_SEARCH_ITEM}`, e => {
      e.preventDefault()
      this.openTabSidebar(e.target)
    })

    if (this._config.useNavbarItems) {
      $(document).on('click', `${SELECTOR_HEADER_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`, e => {
        e.preventDefault()
        this.openTabSidebar(e.target)
      })
    }

    $(document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, e => {
      e.preventDefault()
      this.onTabClick(e.target)
      this.switchTab(e.target)
    })
    $(document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, e => {
      e.preventDefault()
      this.onTabClick(e.target)
      this.switchTab(e.target)
    })
    $(document).on('click', SELECTOR_DATA_TOGGLE_CLOSE, e => {
      e.preventDefault()
      let { target } = e

      if (target.nodeName == 'I') {
        target = e.target.offsetParent
      }

      this.removeActiveTab(target.attributes['data-type'] ? target.attributes['data-type'].nodeValue : null, target)
    })
    $(document).on('click', SELECTOR_DATA_TOGGLE_FULLSCREEN, e => {
      e.preventDefault()
      this.toggleFullscreen()
    })
    let mousedown = false
    let mousedownInterval = null
    $(document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_LEFT, e => {
      e.preventDefault()
      clearInterval(mousedownInterval)

      let { scrollOffset } = this._config

      if (!this._config.scrollBehaviorSwap) {
        scrollOffset = -scrollOffset
      }

      mousedown = true
      this._navScroll(scrollOffset)

      mousedownInterval = setInterval(() => {
        this._navScroll(scrollOffset)
      }, 250)
    })
    $(document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_RIGHT, e => {
      e.preventDefault()
      clearInterval(mousedownInterval)

      let { scrollOffset } = this._config

      if (this._config.scrollBehaviorSwap) {
        scrollOffset = -scrollOffset
      }

      mousedown = true
      this._navScroll(scrollOffset)

      mousedownInterval = setInterval(() => {
        this._navScroll(scrollOffset)
      }, 250)
    })
    $(document).on('mouseup', () => {
      if (mousedown) {
        mousedown = false
        clearInterval(mousedownInterval)
        mousedownInterval = null
      }
    })
  }

  _setItemActive(href) {
    $(`${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`).removeClass('active')
    $(SELECTOR_HEADER_MENU_ITEM).parent().removeClass('active')

    const $headerMenuItem = $(`${SELECTOR_HEADER_MENU_ITEM}[href$="${href}"]`)
    const $headerDropdownItem = $(`${SELECTOR_HEADER_DROPDOWN_ITEM}[href$="${href}"]`)
    const $sidebarMenuItem = $(`${SELECTOR_SIDEBAR_MENU_ITEM}[href$="${href}"]`)

    $headerMenuItem.each((i, e) => {
      $(e).parent().addClass('active')
    })
    $headerDropdownItem.each((i, e) => {
      $(e).addClass('active')
    })
    $sidebarMenuItem.each((i, e) => {
      $(e).addClass('active')
      $(e).parents('.nav-treeview').prevAll('.nav-link').addClass('active')
    })
  }

  _fixHeight(tabEmpty = false) {
    if ($('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
      const windowHeight = $(window).height()
      const navbarHeight = $(SELECTOR_TAB_NAV).outerHeight()
      $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}, ${SELECTOR_CONTENT_IFRAME}`).height(windowHeight - navbarHeight)
      $(SELECTOR_CONTENT_WRAPPER).height(windowHeight)
    } else {
      const contentWrapperHeight = parseFloat($(SELECTOR_CONTENT_WRAPPER).css('height'))
      const navbarHeight = $(SELECTOR_TAB_NAV).outerHeight()
      if (tabEmpty == true) {
        setTimeout(() => {
          $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height(contentWrapperHeight - navbarHeight)
        }, 50)
      } else {
        $(SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight - navbarHeight)
      }
    }
  }     
  
  _getTabNavBar() {
    
        const navbar = document.createElement('div')
        navbar.className = "nav navbar navbar-expand navbar-white navbar-light border-bottom p-0 pt-1"
        navbar.id = 'iframe-navbar-' + Math.random().toString().md5().substr(0, 8)
        navbar.innerHTML = [
                ' <a class="nav-link bg-light" href="#" data-widget="iframe-scrollleft"><i class="fas fa-angle-double-left"></i></a>',  
            '<ul class="navbar-nav nav-tabs overflow-hidden" role="tablist"></ul>',
            '      <a class="nav-link bg-light" href="#" data-widget="iframe-scrollright"><i class="fas fa-angle-double-right"></i></a>'
        ].join("\n")
        this._element.append(navbar)
        console.log(navbar)
        return navbar
  }
    
    _getTabContent() {
        const tabContent = document.createElement('div')
        tabContent.className = "tab-content"
        tabContent.innerHTML = [
      '<div class="tab-empty">',
        '<h2 class="display-4">No tab selected!</h2>',
        '</div>',
        '<div class="tab-loading"><div>',
        '<h2 class="display-4">Tab is loading <i class="fa fa-sync fa-spin"></i></h2>'].join("\n")    
        this._element.append(tabContent)
        return tabContent
    }
    


}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

// load
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const element = SelectorEngine.findOne(SELECTOR_DATA_TOGGLE)
    if (!element) {
        return
    }
    IFrame.getOrCreateInstance(element).toggle(element)
})

enableDismissTrigger(IFrame)
export default IFrame
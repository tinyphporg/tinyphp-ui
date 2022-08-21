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
import IFrame from './admin-iframe'

import ScrollBarHelper from '~bootstrap/src/util/scrollbar'
import BaseComponent from '~bootstrap/src/base-component'
import SelectorEngine from '~bootstrap/src/dom/selector-engine'
import Manipulator from '~bootstrap/src/dom/manipulator'
import Backdrop from '~bootstrap/src/util/backdrop'
import FocusTrap from '~bootstrap/src/util/focustrap'
import { enableDismissTrigger } from '~bootstrap/src/util/component-functions'

import EventHandler from '~bootstrap/src/dom/event-handler'
import Offcanvas from '~bootstrap/src/offcanvas'

const NAME = 'admin-control-sidebar'
const DATA_KEY = 'bs.admin-control-sidebar'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = 'Escape'

const Default = {
    backdrop: true,
    keyboard: true,
    scroll: false,
    colors: [
        'primary',
        'secondary',
        'info',
        'success',
        'danger',
        'indigo',
        'purple',
        'pink',
        'navy',
        'lightblue',
        'teal',
        'cyan',
        'dark',
        'gray-dark',
        'gray',
        'light',
        'warning',
        'white',
        'orange'
    ],
    layouts : [
        'layout-navbar-fixed',
        'layout-fixed',
        'layout-footer-fixed',
    ],
    layoutTexts : {
        'layout-navbar-fixed' : '顶部导航栏',
        'layout-fixed' : '侧边导航栏',
        'layout-footer-fixed' : '底部导航栏',       
    }
}

const DefaultType = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
}

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop'
const OPEN_SELECTOR = '.admin-control-sidebar.show'

const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-widget="admin-control-sidebar"]'



class ControlSidebar extends BaseComponent {
  constructor(element, config) {
    super(element)
    this._config = this._getConfig(config)
    this._isShown = false
    //   this._addEventListeners()
  }
  
   _offcanvasTarget = null
    
    targetId = null

    targetIds = {
        'dark-mode': null,
        'themes':  null,
        'sidebar': null,
        'fixed': null,
        'default': null,
        'multipages': null,
    }
    
    // show or hide
    isShown = false
    
    // options from storager
    options = {}
    
    isDarkMode = false
    
    themeId = 'primary'

    isSidebarDarkMode = true
    
    fixeds = {}
    
    isMultiPages = true
    
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
    
    static getOrCreateIframeTarget() {
        const contentWrapper = $('.content-wrapper')
        
        if (window.frameElement && !window.frameElement.hasAttribute('iframe-tab-id')) {
            return;
        }
       
        if (contentWrapper.length <= 0) {
            return;
        }
        if (!contentWrapper.hasClass('iframe-mode')) {
            contentWrapper.addClass('iframe-mode')
        }
        if (!contentWrapper.attr('data-bs-widget')) {
            contentWrapper.attr('data-bs-widget', 'admin-iframe').attr('data-loading-screen', 750)
        }
        return IFrame.getOrCreateInstance(contentWrapper)
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
    
    hide = () => {
    if (!this._isShown) {
      return
    }
    this._isShown = false     
    this._getOrOffcanvas().hide()
    }
    
    show = () => {
    if (this._isShown) {
      return
    }
    this._isShown = true           
        this._getOrOffcanvas().show()
    }
    
  dispose() {
    this._getOrOffcanvas().dispose()
    super.dispose()
  }    
    
    _getOrOffcanvas = () => {
        console.log('aaaa')
        const target = this._createOffcanvasTarget()
        return Offcanvas.getOrCreateInstance(target)
    }
    
    _createOffcanvasTarget = () => {
        if (this._offcanvasTarget) {
            return this._offcanvasTarget
        }
        const sidebarTarget = ControlSidebar.getOrCreateSidebarTarget()
        const targetId = 'control-sidebar-' + Math.random().toString().md5().substr(0, 8)
        const target = document.createElement('div')
        target.className = "offcanvas offcanvas-end"
        target.id = targetId
        target.setAttribute('tabindex', -1)
        target.setAttribute('aria-labelledby', 'offcanvasRightLabel')

        for (let tid in this.targetIds) {
            if (!this.targetIds.hasOwnProperty(tid)) {
                continue
            }
            this.targetIds[tid] = targetId + '-' + tid
        }
        const targetIds = this.targetIds
        const colors = Default.colors
        
        // darkmode
        let darkModeText = '深色模式'
        let darkModeClass = 'btn-dark'
        if (this.isDarkMode) {
            darkModeText = '浅色模式'
            darkModeClass = 'btn-light'
                    
        }
                
        let innerHTML = [
            '<div class="offcanvas-header">',
            '<h5 class="offcanvas-title">整体风格设置</h5>',
            `<button type="button" class="btn-close" data-bs-dismiss="admin-control-sidebar" data-bs-target="#${sidebarTarget.id}" aria-label="Close"></button>`,
            '</div><div class="offcanvas-body">',
            `<div class="mb-4 pb-2 border-bottom border-1"><button id="${targetIds['dark-mode']}" class="btn ms-2 btn-default btn-flat ${darkModeClass}">${darkModeText}</button></div>`,
            `<h6>主题设置</h6><div class="mb-4 pb-2 border-bottom border-1" id="${targetIds['themes']}">`
        ]

        // themes
        let isActive = ''
        for (let cid in colors) {
            if (!colors.hasOwnProperty(cid)) {
                continue
            }
            
            isActive = ''
            if (this.themeId == colors[cid]) {
                isActive = 'active'
            }
            innerHTML.push(`<button id="${targetIds['themes']}-${colors[cid]}" data-bs-themeid="${colors[cid]}" class="btn ms-2  bg-${colors[cid]} btn-flat btn-default ${isActive}"> </button>`)
        }
        
        // sidebar
        darkModeText = '深色模式'
        darkModeClass = 'btn-dark'
        if (this.isSidebarDarkMode) {
            darkModeText = '浅色模式'
            darkModeClass = 'btn-light'
                    
        }
        
        innerHTML = innerHTML.concat([
            "</div>",
            '<h6>导航栏设置</h6>',
            `<div class="mb-4 pb-2 mt-4 border-bottom border-1"><button id="${targetIds['sidebar']}" class="btn ms-2 btn-default btn-flat ${darkModeClass}">${darkModeText}</button></div>`,
            ])
        innerHTML = innerHTML.concat([
            '<h6>固定浮动</h6>',
            `<div class="mb-4 pb-2 mt-4 border-bottom border-1" id="${targetIds['fixed']}">`,
            ])
            
            Default.layouts.forEach(className => {
                let text = Default.layoutTexts[className]
                let checked = this.fixeds[className] ? 'checked' : ''
                innerHTML.push(`<div class="mb-1 switch"><label><input type="checkbox" ${checked} data-bs-fixed="${className}" class="me-1" /><span>${text}</span></label></div>`)
            }) 
            
        let multiPageCheckedText = this.isMultiPages ? 'checked' : ''    
        innerHTML = innerHTML.concat([            
            `</div>`,
            '<h6>基本设置</h6>',
            `<div class="mb-4 pb-2 mt-4 border-bottom border-1" id="${targetIds['default']}">`,
            //         `<div class="mb-1 switch"><label><input type="checkbox" data-bs-fixed="layout-navbar-fixed" class="me-1" /><span>深色模式</span></label></div>`,
            `<div class="mb-1"><label><input type="checkbox" id=${targetIds['multipages']} data-bs-fixed="layout-fixed" ${multiPageCheckedText} class="me-1" /><span>多页签模式</span></label></div>`,
            `</div>`,
        ])
        target.innerHTML = innerHTML.join("\n")


        sidebarTarget.append(target)
        this.initBody()
        this._offcanvasTarget = target
        return target
    }

    initBody = () => {
        const targetIds = this.targetIds
        const changeDarkMode = this.changeDarkMode
        const changeThemes = this.changeThemes
        const changeSidebarDarkMode = this.changeSidebarDarkMode
        const changeFixed = this.changeFixed
        const changeIFrame = this.changeIFrame
        const self = this
        $('#' + targetIds['dark-mode']).on('click', function() {
            if ($(this).hasClass('btn-dark')) {
                $(this).text("浅色模式").removeClass('btn-dark').addClass('btn-light')
                changeDarkMode(true)
                
            } else {
                $(this).text("深色模式").removeClass('btn-light').addClass('btn-dark')
                changeDarkMode(false)
            }
        })

        $("button", $('#' + targetIds['themes'])).each((i, element) => {

            $(element).on('click', function() {
                if ($(this).hasClass('active')) {
                    $('#' + targetIds['themes'] + '-primary').addClass('active')
                    $(this).removeClass('active')
                    changeThemes('primary')
                    
                } else {
                    $("button", $('#' + targetIds['themes'])).each((i, e) => {
                        $(e).removeClass('active')
                    })
                    $(this).addClass('active')
                    changeThemes($(this).attr('data-bs-themeid'))
                }
            })
        })

        // sidebar
        $('#' + targetIds['sidebar']).on('click', function() {

            if ($(this).hasClass('btn-dark')) {
               $(this).text("浅色模式").removeClass('btn-dark').addClass('btn-light')
                changeSidebarDarkMode(true)
            } else {
                
                 $(this).text("深色模式").removeClass('btn-light').addClass('btn-dark')
                changeSidebarDarkMode(false)
            }
            
        })

        // flex
        $(`#${targetIds['fixed']} input[type="checkbox"]`).on('click', () => {
            $(`#${targetIds['fixed']} input[type="checkbox"]`).each((index, element) => {
                let className = $(element).attr('data-bs-fixed')
                console.log(className)
                if (!className) {
                return
                }
                changeFixed(className, $(element).is(':checked')) 
            })
        })
        
        // fixed
        console.log(targetIds['multipages'])
        $(`#${targetIds['multipages']}`).on('click', function(){
           changeIFrame($(this).is(':checked'))
        })

    }
    
    changeDarkMode = (isDarkMode = false, isSave = true) => {
        isDarkMode ? $('body').addClass('dark-mode') : $('body').removeClass('dark-mode')
        this.isDarkMode = isDarkMode
        if (isSave) {
            this.saveOptions('dark-mode', isDarkMode)
        }
    }
    
    changeThemes = (themeId, isSave = true) => {
        const themeColors = Default.colors
        this.themeId = themeId
        if (isSave) {
            this.saveOptions('themes', themeId)
        }
        
        // logo
        const $logo = $('.brand-link')
        themeColors.forEach(color => {
            if ($logo.hasClass('bg-' + color)) {
                $logo.removeClass('bg-' + color)
            }
        })
        $logo.addClass('bg-' + themeId)

        // accent
        const $body = $('body:first')
        themeColors.forEach(color => {
            if ($body.hasClass('accent-' + color)) {
                $body.removeClass('accent-' + color)
            }
        })
        $body.addClass('accent-' + themeId)

        // main-header
        const $mainHeader = $('.main-header')
        themeColors.forEach(color => {
            if ($mainHeader.hasClass('navbar-' + color)) {
                $mainHeader.removeClass('navbar-' + color)
            }
        })
        $mainHeader.addClass('navbar-' + themeId)
    }

    changeSidebarDarkMode = (isDarkMode = false, isSave = true) => {
        const themeColors = Default.colors
        const $sidebar = $('.main-sidebar')
        const sidebarDarkMode = isDarkMode  ? 'dark' : 'light'
        this.isSidebarDarkMode = isDarkMode
        if (isSave) {
            this.saveOptions('sidebar', isDarkMode)
        }
        
        // remove theme colors
        themeColors.forEach(color => {
            if ($sidebar.hasClass('sidebar-light-' + color)) {
                $sidebar.removeClass('sidebar-light-' + color)
            }
            if ($sidebar.hasClass('sidebar-dark-' + color)) {
                $sidebar.removeClass('sidebar-dark-' + color)
            }
        })
        
        // change sidebar
        $sidebar.addClass('sidebar-' + sidebarDarkMode + '-' + this.themeId)
    }

    changeFixed = (className, isFixed = true, isSave = true) => {
        isFixed ? $('body:first').addClass(className) : $('body:first').removeClass(className)
        this.fixeds[className] = isFixed
        if (isSave) {
            this.saveOptions(className,isFixed)
        }
    }
    
    changeIFrame = (isMultiPages = false, isSave = true) => {
        this.isMultiPages = isMultiPages
        if (isSave) {
            this.saveOptions('multipages', isMultiPages)
        }
        
        const iframe = ControlSidebar.getOrCreateIframeTarget()
        if (!iframe) {
            return;
        }
        isMultiPages ? iframe.enable() : iframe.disable()
    }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
  const target = ControlSidebar.getOrCreateSidebarTarget(this);
  
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault()
  }

  if (isDisabled(this)) {
    return
  }
  const data = ControlSidebar.getOrCreateInstance(target)  
   data.toggle(this)
})

// load
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const element = SelectorEngine.findOne(SELECTOR_DATA_TOGGLE)
    if (!element) {
        return
    }
    const target = ControlSidebar.getOrCreateSidebarTarget(element);
    ControlSidebar.getOrCreateInstance(target).init()
})

enableDismissTrigger(ControlSidebar)
export default ControlSidebar
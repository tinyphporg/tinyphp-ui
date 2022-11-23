import {
    defineJQueryPlugin,
    getElement,
    getElementFromSelector,
    getSelector,
    isDisabled,
    isVisible,
    typeCheckConfig
} from '~bootstrap/src/util/index'

import Storager from '../../utils/storager'
import BaseComponent from '~bootstrap/src/base-component'
import SelectorEngine from '~bootstrap/src/dom/selector-engine'
import Manipulator from '~bootstrap/src/dom/manipulator'
import { enableDismissTrigger } from '~bootstrap/src/util/component-functions'

import EventHandler from '~bootstrap/src/dom/event-handler'
import Offcanvas from '~bootstrap/src/offcanvas'

const NAME = 'controlSidebar'
const DATA_KEY = 'ui.control-sidebar'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = 'Escape'

const Default = {
    backdrop: true,
    keyboard: true,
    scroll: false,
    darkThemeId: 'premium-dark',
    themeColors: [
        "light",
        "dark",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "vicious-stance",
        "midnight-bloom",
        "night-sky",
        "slick-carbon",
        "asteroid",
        "royal",
        "warm-flame",
        "night-fade",
        "sunny-morning",
        "tempting-azure",
        "amy-crisp",
        "heavy-rain",
        "mean-fruit",
        "malibu-beach",
        "deep-blue",
        "ripe-malin",
        "arielle-smile",
        "plum-plate",
        "happy-fisher",
        "happy-itmeo",
        "mixed-hopes",
        "strong-bliss",
        "grow-early",
        "love-kiss",
        "premium-dark",
        "happy-green"
    ],
    layouts: [
        'layout-navbar-fixed',
//        'layout-fixed',
        'layout-footer-fixed',
    ],
    layoutTexts: {
        'layout-navbar-fixed': '顶部导航栏',
//        'layout-fixed': '侧边导航栏',
        'layout-footer-fixed': '底部导航栏',
    }
}

const DefaultType = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
}


const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`
const SELECTOR_DATA_TOGGLE = '[data-widget="control-sidebar"]'


// 整体风格设置
class ControlSidebar extends BaseComponent {
    constructor(element, config) {
        super(element)
        this._config = this._getConfig(config)
        this._offcanvasTarget = null
        this._targetId = null

        this._targetIds = {
            'dark-mode': null,
            'themes': null,
            'sidebar': null,
            'fixed': null,
            'default': null,
        }
        this._isShown = false
        this._themeColors = this._config.themeColors
        this._headerThemeId = ''
        this._sidebarThemeId = ''
        this._isDarkMode = false
        this._fixeds = {}
        this._options = {}
        this._readOptions()
    }

    // Getters
    static get NAME() {
        return NAME
    }

    static get Default() {
        return Default
    }

    static _sidebarTarget = null

    // create sidebar body
    static getOrCreateSidebarTarget(element) {
        if (this._sidebarTarget) {
            return this._sidebarTarget
        }

        let target = null
        if (element.hasAttribute('data-target')) {
            target = getElementFromSelector(element)
        } else {
            const targetId = 'control-sidebar-target-' + Math.random().toString().md5().substr(0, 8)
            target = document.createElement('aside')
            target.id = targetId
            target.className = 'control-sidebar'
            let targetParent = SelectorEngine.findOne("body")
            targetParent.append(target)
            element.setAttribute('data-target', '#' + targetId)
        }

        this._sidebarTarget = target
        return target;
    }

    toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget)
    }

    hide() {
        if (!this._isShown) {
            return;
        }
        return this._getOrOffcanvas().hide()
    }

    show(relatedTarget) {
        if (this._isShown) {
            return;
        }
        return this._getOrOffcanvas().show(relatedTarget)
    }

    dispose() {
        this._getOrOffcanvas().dispose()
        super.dispose()
    }

    changeDarkMode = (isDarkMode = false, isSave = true) => {
        isDarkMode ? $('body').addClass('dark-mode') : $('body').removeClass('dark-mode')
        this._isDarkMode = isDarkMode
        const darkThemeId = isDarkMode ? this._config.darkThemeId : ''
       // !this._headerThemeId && this.changeHeaderThemeColor(darkThemeId, false)
       // !this._sidebarThemeId && this.changeSidebarThemeColor(darkThemeId, false)
        if (isSave) {
            this._saveOptions('dark-mode', isDarkMode)
        }
    }

    changeHeaderThemeColor = (themeId, isSave = true) => {
        const themeColors = this._config.themeColors;
        if (isSave) {
            this._headerThemeId = themeId
            this._saveOptions('themes', themeId)
        }

        const $mainHeader = $('.main-header')
        themeColors.forEach(color => {
            if ($mainHeader.hasClass('bg-' + color)) {
                $mainHeader.removeClass('bg-' + color)
            }
        })
        if (themeId) {
            $mainHeader.addClass('bg-' + themeId)
        }
    }

    // sidebar
    changeSidebarThemeColor = (themeId, isSave = true) => {
        const themeColors = this._config.themeColors;
        if (isSave) {
            this._sidebarThemeId = themeId
            this._saveOptions('sidebar', themeId)
        }

        // main-header
        const $mainSidebar = $('.main-sidebar')
        themeColors.forEach(color => {
            if ($mainSidebar.hasClass('bg-' + color)) {
                $mainSidebar.removeClass('bg-' + color)
            }
        })
        if (themeId) {
            $mainSidebar.addClass('bg-' + themeId)
        }
    }

    // change fixed
    changeFixed = (className, isFixed = true, isSave = true) => {
        isFixed ? $('body:first').addClass(className) : $('body:first').removeClass(className)
        this._fixeds[className] = isFixed
        if (isSave) {
            this._saveOptions(className, isFixed)
        }
    }

    // init configs
    _getConfig(config) {
        config = {
            ...Default,
            ...Manipulator.getDataAttributes(this._element),
            ...(typeof config === 'object' ? config : {})
        }
        typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    // create offcanvas instance
    _getOrOffcanvas() {
        const target = this._createOffcanvasTarget()
        this._addEventListeners(target)
        return Offcanvas.getOrCreateInstance(target)
    }

    // create offcanvas target
    _createOffcanvasTarget() {
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

        for (let tid in this._targetIds) {
            if (!this._targetIds.hasOwnProperty(tid)) {
                continue
            }
            this._targetIds[tid] = targetId + '-' + tid
        }

        const targetIds = this._targetIds
        const colors = this._themeColors
        const layouts = this._config.layouts
        const layoutTexts = this._config.layoutTexts

        // darkmode
        let darkModeText = '深色模式'
        let darkCheckbox = ''
        if (this._isDarkMode) {
            darkModeText = '浅色模式'
            darkCheckbox = 'checked'
        }

        let innerHTML = [
            '<div class="offcanvas-header">',
            '<h6 class="offcanvas-title">主题设置</h6>',
            `<button type="button" class="btn-close" data-bs-dismiss="controlSidebar" data-bs-target="#${sidebarTarget.id}" aria-label="Close"></button>`,
            '</div><div class="offcanvas-body"><div class="list-group">',
            `<li class="list-group-item"><div class="form-check icheck-dark">
            <input type="checkbox" ${darkCheckbox} id="${targetIds['dark-mode']}" class="form-check-input" />
            <label class="form-check-label"  id="${targetIds['dark-mode']}-text" for="${targetIds['dark-mode']}"> ${darkModeText}</label></div></li></div>`,
            `<h6 class="control-heading">顶部导航栏</h6><div class="list-group" id="${targetIds['themes']}"><li class="list-group-item">`
        ]

        // themes
        let isActive = ''
        for (let cid in colors) {
            if (!colors.hasOwnProperty(cid)) {
                continue
            }

            isActive = ''
            if (this._headerThemeId == colors[cid]) {
                isActive = 'active'
            }
            if (colors[cid] == 'vicious-stance') {
                innerHTML.push('</li><li class="list-group-item">')
            }
            innerHTML.push(`<button id="${targetIds['themes']}-${colors[cid]}" data-themeid="${colors[cid]}" class="btn bg-${colors[cid]}  ${isActive}"> </button>`)
        }

        // sidebar
        innerHTML = innerHTML.concat([
            "</li></div>",
            '<h6 class="control-heading">侧边菜单栏</h6>',
            `<div class="list-group" id="${targetIds['sidebar']}"><li class="list-group-item">`
        ])
        for (let cid in colors) {
            if (!colors.hasOwnProperty(cid)) {
                continue
            }

            isActive = ''
            if (this._sidebarThemeId == colors[cid]) {
                isActive = 'active'
            }
            if (colors[cid] == 'vicious-stance') {
                innerHTML.push('</li><li class="list-group-item">')
            }
            innerHTML.push(`<button id="${targetIds['sidebar']}-${colors[cid]}" data-themeid="${colors[cid]}" class="btn bg-${colors[cid]}  ${isActive}"> </button>`)
        }

        innerHTML = innerHTML.concat([
            '</li></div>',
            '<h6 class="control-heading">固定浮动</h6>',
            `<ul class="list-group" id="${targetIds['fixed']}">`,
        ])

        layouts.forEach(className => {
            let text = layoutTexts[className]
            let checked = this._fixeds[className] ? 'checked' : ''
            innerHTML.push(`<li class="list-group-item"><div class="form-check icheck-success"><input type="checkbox" id="${targetIds['fixed']}-${className}" class="from-check-input" ${checked} data-bs-fixed="${className}" class="me-1" /><label class="from-check-text" for="${targetIds['fixed']}-${className}"><span>${text}</span></label></div></li>`)
        })

        innerHTML = innerHTML.concat([
            `</ul>`
        ])
        target.innerHTML = innerHTML.join("\n")
        sidebarTarget.append(target)
        this._offcanvasTarget = target
        return target
    }

    // eventListeners
    _addEventListeners(offcanvasTarget) {
        const targetIds = this._targetIds
        const changeDarkMode = this.changeDarkMode
        const changeHeaderThemeColor = this.changeHeaderThemeColor
        const changeSidebarThemeColor = this.changeSidebarThemeColor
        const changeFixed = this.changeFixed

        // show event
        offcanvasTarget.addEventListener('show.bs.offcanvas', event => {
            const relatedTarget = event['relatedTarget']
            EventHandler.trigger(this._element, EVENT_SHOW, { relatedTarget, offcanvasTarget })
        })


        //shown event
        offcanvasTarget.addEventListener('shown.bs.offcanvas', event => {
            const relatedTarget = event['relatedTarget']
            this._isShown = true
            EventHandler.trigger(this._element, EVENT_SHOWN, { relatedTarget, offcanvasTarget })
        })

        // hide event
        offcanvasTarget.addEventListener('hide.bs.offcanvas', event => {
            const relatedTarget = event['relatedTarget']
            EventHandler.trigger(this._element, EVENT_HIDE, { relatedTarget, offcanvasTarget })
        })

        //hidden event
        offcanvasTarget.addEventListener('hidden.bs.offcanvas', event => {
            const relatedTarget = event['relatedTarget']
            this._isShown = false
            EventHandler.trigger(this._element, EVENT_HIDDEN, { relatedTarget, offcanvasTarget })
        })

        // dark-mode
        $('#' + targetIds['dark-mode']).on('click', function() {
            $('#' + targetIds['dark-mode'] + '-text').text(this.checked ? "浅色模式" : '深色模式')
            changeDarkMode(this.checked)
        })

        // nav theme color
        const $themeElement = $("button", $('#' + targetIds['themes']))
        $themeElement.each((i, element) => {
            $(element).on('click', function() {
                const $element = $(this)
                 if ($element.hasClass('active')) {
                    $element.removeClass('active')
                    return changeHeaderThemeColor()
                }                
                $themeElement.each((i, e) => {
                    $(e).removeClass('active')
                })
                $element.addClass('active')
                const themeid = $element.attr('data-themeid')
                changeHeaderThemeColor(themeid)
            })
        })

        // sidebar
        const $sidebarElement = $("button", $('#' + targetIds['sidebar']))
        $sidebarElement.each((i, element) => {
            $(element).on('click', function() {
                const $element = $(this)
                 if ($element.hasClass('active')) {
                    $element.removeClass('active')
                    return changeSidebarThemeColor()
                }               
                $sidebarElement.each((i, e) => {
                    $(e).removeClass('active')
                })

                $element.addClass('active')
                const themeid = $element.attr('data-themeid')
                changeSidebarThemeColor(themeid)
            })
        })

        // flex
        $(`#${targetIds['fixed']} input[type="checkbox"]`).on('click', () => {
            $(`#${targetIds['fixed']} input[type="checkbox"]`).each((index, element) => {
                let className = $(element).attr('data-bs-fixed')
                if (!className) {
                    return
                }
                changeFixed(className, $(element).is(':checked'))
            })
        })

    }

    // read options from storager cache and change theme style
    _readOptions() {
        this._options = Storager.get(NAME)
        const options = this._options
        const layouts = this._config.layouts


        // init themes
        options['themes'] && this.changeHeaderThemeColor(options['themes'])

        // sidebar
        options['sidebar'] && this.changeSidebarThemeColor(options['sidebar'])

        // init dark-mode
        this.changeDarkMode(options['dark-mode'] !== false)
        
        // layouts
        layouts.forEach((className) => {
            this.changeFixed(className, options[className] === true, false)
        })
        this._options = options
    }

    // save options to storager cache
    _saveOptions(key, value) {
        this._options[key] = value
        Storager.set(NAME, this._options)
    }

    // Static
    static jQueryInterface(config) {
        return this.each(function() {
            const target = ControlSidebar.getOrCreateSidebarTarget(this);
            const data = ControlSidebar.getOrCreateInstance(target, config)
            if (typeof config !== 'string') {
                return
            }

            if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                throw new TypeError(`No method named "${config}"`)
            }
            data[config](this)
        })
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
    ControlSidebar.getOrCreateInstance(target)
})

enableDismissTrigger(ControlSidebar)
defineJQueryPlugin(ControlSidebar)
export default ControlSidebar
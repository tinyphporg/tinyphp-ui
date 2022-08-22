import {
    defineJQueryPlugin,
    getElementFromSelector,
    getSelector,
    isDisabled,
    isVisible,
    typeCheckConfig
} from '~bootstrap/src/util/index'

import ScrollBarHelper from '~bootstrap/src/util/scrollbar'
import BaseComponent from '~bootstrap/src/base-component'
import SelectorEngine from '~bootstrap/src/dom/selector-engine'
import Manipulator from '~bootstrap/src/dom/manipulator'
import Backdrop from '~bootstrap/src/util/backdrop'
import FocusTrap from '~bootstrap/src/util/focustrap'

import EventHandler from '~bootstrap/src/dom/event-handler'
import Offcanvas from '~bootstrap/src/offcanvas';

const NAME = 'control-sidebar'
const DATA_KEY = 'bs.control-sidebar'
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
    ]
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

const SELECTOR_DATA_TOGGLE = '[data-bs-widget="control-sidebar"]'



class ControlSidebar extends BaseComponent {
  constructor(element, config) {
    super(element)
    this._config = this._getConfig(config)
    this._isShown = false
    //this._backdrop = this._initializeBackDrop()
   // this._focustrap = this._initializeFocusTrap()
 //   this._addEventListeners()
  }
  
    targetId = null

    targetIds = {
        'dark-mode': null,
        'themes':  null,
        'sidebar': null,
        'flex': null,
        'default': null,
    }

    themeId = 'primary'

    sidebarId = 'dark'

    // Getters
    static get NAME() {
        return NAME
    }

    static get Default() {
        return Default
    }
    
    getOrCreateTarget = () => {
        const element = this._element
        let target = getElementFromSelector(element)
        if (target) {
            return target
        }

        const targetId = 'control-sidebar-' + Math.random().toString().md5().substr(0, 8);
        target = document.createElement('div', { "uid": "xxxxx" });
        target.className = "offcanvas offcanvas-end";
        target.id = targetId;
        target.setAttribute('tabindex', -1);
        target.setAttribute('aria-labelledby', 'offcanvasRightLabel');

        for (let tid in this.targetIds) {
            if (!this.targetIds.hasOwnProperty(tid)) {
                continue;
            }
            this.targetIds[tid] = targetId + '-' + tid
        }
        const targetIds = this.targetIds;
        const colors = Default.colors;
        let innerHTML = [
            '<div class="offcanvas-header">',
            '<h5 class="offcanvas-title">整体风格设置</h5>',
            '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>',
            '</div><div class="offcanvas-body">',
            `<div class="mb-4 pb-2 border-bottom border-1"><button id="${targetIds['dark-mode']}" class="btn ms-2 btn-default btn-flat btn-outline-dark">深色模式</button></div>`,
            `<h6>主题设置</h6><div class="mb-4 pb-2 border-bottom border-1" id="${targetIds['themes']}">`
        ]

        // themes
        for (let cid in colors) {
            if (!colors.hasOwnProperty(cid)) {
                continue;
            }
            innerHTML.push(`<button id="${targetIds['themes']}-${colors[cid]}" data-bs-themeid="${colors[cid]}" class="btn ms-2  bg-${colors[cid]} btn-flat btn-default"> </button>`)
        }
        innerHTML = innerHTML.concat([
            "</div>",
            '<h6>导航栏设置</h6>',
            `<div class="mb-4 pb-2 mt-4 border-bottom border-1"><button id="${targetIds['sidebar']}" class="btn ms-2 btn-default btn-flat btn-outline-dark">深色模式</button></div>`,
            '<h6>固定浮动</h6>',
            `<div class="mb-4 pb-2 mt-4 border-bottom border-1" id="${targetIds['flex']}">`,
            `<div class="mb-1 switch"><label><input type="checkbox" data-bs-fixed="layout-navbar-fixed" class="me-1" /><span>顶部导航</span></label></div>`,
            `<div class="mb-1"><label><input type="checkbox" data-bs-fixed="layout-fixed"  class="me-1" /><span>侧边栏</span></label></div>`,
            `<div class="mb-1"><label><input type="checkbox" data-bs-fixed="layout-footer-fixed"  class="me-1" /><span>底部</span></label></div>`,
            `</div>`,
            '<h6>基本设置</h6>',
            `<div class="mb-4 pb-2 mt-4 border-bottom border-1" id="${targetIds['default']}">`,
            //         `<div class="mb-1 switch"><label><input type="checkbox" data-bs-fixed="layout-navbar-fixed" class="me-1" /><span>深色模式</span></label></div>`,
            `<div class="mb-1"><label><input type="checkbox" data-bs-fixed="layout-fixed"  class="me-1" /><span>多页签模式</span></label></div>`,
            `</div>`,
        ])
        target.innerHTML = innerHTML.join("\n");

        let targetParent = SelectorEngine.findOne("body");
        targetParent.append(target);
        element.setAttribute('data-bs-target', '#' + targetId);
        this.initBody();
        return target
    }

    initBody = () => {
        const targetIds = this.targetIds
        const changeThemes = this.changeThemes
        const changeSidebar = this.changeSidebar
        const self = this
        $('#' + targetIds['dark-mode']).on('click', function() {

            if ($(this).hasClass('btn-outline-dark')) {
                $(this).text("浅色模式").removeClass('btn-outline-dark').addClass('btn-light')
                $('body').addClass('dark-mode')
            } else {
                $(this).text("深色模式")
                $('body').removeClass('dark-mode')
                $(this).removeClass('btn-light');
                $(this).addClass('btn-outline-dark');
            }
        })

        $("button", $('#' + targetIds['themes'])).each((i, element) => {

            $(element).on('click', function() {
                if ($(this).hasClass('active')) {
                    $('#' + targetIds['themes'] + '-primary').addClass('active')
                    $(this).removeClass('active');
                    changeThemes('primary');
                } else {
                    $("button", $('#' + targetIds['themes'])).each((i, e) => {
                        $(e).removeClass('active')
                    })
                    $(this).addClass('active');
                    changeThemes($(this).attr('data-bs-themeid'))
                }
            })
        })

        // sidebar
        $('#' + targetIds['sidebar']).on('click', function() {

            if ($(this).hasClass('btn-outline-dark')) {
                $(this).text("深色模式").removeClass('btn-outline-dark').addClass('btn-light')
                self.sidebarId = 'light'
            } else {
                $(this).text("浅色模式")
                $(this).removeClass('btn-light');
                $(this).addClass('btn-outline-dark');
                self.sidebarId = 'dark'
            }
            changeSidebar();
        })

        // flex
        console.log(`#${targetIds['flex']} input[type="checkbox"]`)
        $(`#${targetIds['flex']} input[type="checkbox"]`).on('click', () => {
            this.changeFlex()
        })

    }

    changeThemes = (themeId) => {
        const themeColors = Default.colors
        this.themeId = themeId
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

        // admin-header
        const $mainHeader = $('.admin-header')
        themeColors.forEach(color => {
            if ($mainHeader.hasClass('navbar-' + color)) {
                $mainHeader.removeClass('navbar-' + color)
            }
        })
        $mainHeader.addClass('navbar-' + themeId);

        // sidebar
        this.changeSidebar()
    }

    changeSidebar = () => {
        const themeColors = Default.colors
        const $sidebar = $('.admin-sidebar')
        themeColors.forEach(color => {
            if ($sidebar.hasClass('sidebar-light-' + color)) {
                $sidebar.removeClass('sidebar-light-' + color)
            }
            if ($sidebar.hasClass('sidebar-dark-' + color)) {
                $sidebar.removeClass('sidebar-dark-' + color)
            }
        })
        $sidebar.addClass('sidebar-' + this.sidebarId + '-' + this.themeId);
    }

    changeFlex = () => {
        $(`#${this.targetIds['flex']} input[type="checkbox"]`).each((index, element) => {
            let className = $(element).attr('data-bs-fixed')
            console.log(className)
            if (!className) {
                return
            }
            if ($(element).is(':checked')) {
                $('body').addClass(className)
            } else {
                $('body').removeClass(className)
            }


        })
    }


}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    const target = ControlSidebar.getOrCreateInstance(this).getOrCreateTarget();
    if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault()
    }

    if (isDisabled(this)) {
        return
    }
    const data = Offcanvas.getOrCreateInstance(target)
    data.toggle(this)
})

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    $('.nav-sidebar').addClass('nav-flat nav-compact nav-collapse-hide-child nav-child-indent');
});

export default {}
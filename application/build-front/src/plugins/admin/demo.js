$(function() {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    function createSkinBlock(colors, callback, noneSelected) {
        let $block = $('<select />', {
            class: noneSelected ? 'custom-select mb-3 border-0' : 'custom-select mb-3 text-light border-0 ' + colors[0].replace(/accent-|navbar-/, 'bg-')
        })

        if (noneSelected) {
            let $default = $('<option />', {
                text: 'None Selected'
            })
            if (callback) {
                $default.on('click', callback)
            }

            $block.append($default)
        }

        colors.forEach(function(color) {
            let $color = $('<option />', {
                class: (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-'),
                text: capitalizeFirstLetter((typeof color === 'object' ? color.join(' ') : color).replace(/navbar-|accent-|bg-/, '').replace('-', ' '))
            })

            $block.append($color)

            $color.data('color', color)

            if (callback) {
                $color.on('click', callback)
            }
        })

        return $block
    }

    let $sidebar = $('.control-sidebar')
    let $container = $('<div />', {
        class: 'p-3 control-sidebar-content'
    })

    $sidebar.append($container)

    // Checkboxes

    $container.append(
        '<h5>Customize AdminLTE</h5><hr class="mb-2"/>'
    )

    let $dark_mode_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('dark-mode'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('dark-mode')
        } else {
            $('body').removeClass('dark-mode')
        }
    })
    let $dark_mode_container = $('<div />', { class: 'mb-4' }).append($dark_mode_checkbox).append('<span>Dark Mode</span>')
    $container.append($dark_mode_container)

    $container.append('<h6>Header Options</h6>')
    let $header_fixed_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('layout-navbar-fixed'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('layout-navbar-fixed')
        } else {
            $('body').removeClass('layout-navbar-fixed')
        }
    })
    let $header_fixed_container = $('<div />', { class: 'mb-1' }).append($header_fixed_checkbox).append('<span>Fixed</span>')
    $container.append($header_fixed_container)

    let $dropdown_legacy_offset_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.main-header').hasClass('dropdown-legacy'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.main-header').addClass('dropdown-legacy')
        } else {
            $('.main-header').removeClass('dropdown-legacy')
        }
    })
    let $dropdown_legacy_offset_container = $('<div />', { class: 'mb-1' }).append($dropdown_legacy_offset_checkbox).append('<span>Dropdown Legacy Offset</span>')
    $container.append($dropdown_legacy_offset_container)

    let $no_border_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.main-header').hasClass('border-bottom-0'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.main-header').addClass('border-bottom-0')
        } else {
            $('.main-header').removeClass('border-bottom-0')
        }
    })
    let $no_border_container = $('<div />', { class: 'mb-4' }).append($no_border_checkbox).append('<span>No border</span>')
    $container.append($no_border_container)

    $container.append('<h6>Sidebar Options</h6>')

    let $sidebar_collapsed_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('sidebar-collapse'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('sidebar-collapse')
            $(window).trigger('resize')
        } else {
            $('body').removeClass('sidebar-collapse')
            $(window).trigger('resize')
        }
    })
    let $sidebar_collapsed_container = $('<div />', { class: 'mb-1' }).append($sidebar_collapsed_checkbox).append('<span>Collapsed</span>')
    $container.append($sidebar_collapsed_container)

    $(document).on('collapsed.lte.pushmenu', '[data-widget="pushmenu"]', function() {
        $sidebar_collapsed_checkbox.prop('checked', true)
    })
    $(document).on('shown.lte.pushmenu', '[data-widget="pushmenu"]', function() {
        $sidebar_collapsed_checkbox.prop('checked', false)
    })

    let $sidebar_fixed_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('layout-fixed'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('layout-fixed')
            $(window).trigger('resize')
        } else {
            $('body').removeClass('layout-fixed')
            $(window).trigger('resize')
        }
    })
    let $sidebar_fixed_container = $('<div />', { class: 'mb-1' }).append($sidebar_fixed_checkbox).append('<span>Fixed</span>')
    $container.append($sidebar_fixed_container)

    let $sidebar_mini_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('sidebar-mini'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('sidebar-mini')
        } else {
            $('body').removeClass('sidebar-mini')
        }
    })
    let $sidebar_mini_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_checkbox).append('<span>Sidebar Mini</span>')
    $container.append($sidebar_mini_container)

    let $sidebar_mini_md_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('sidebar-mini-md'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('sidebar-mini-md')
        } else {
            $('body').removeClass('sidebar-mini-md')
        }
    })
    let $sidebar_mini_md_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_md_checkbox).append('<span>Sidebar Mini MD</span>')
    $container.append($sidebar_mini_md_container)

    let $sidebar_mini_xs_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('sidebar-mini-xs'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('sidebar-mini-xs')
        } else {
            $('body').removeClass('sidebar-mini-xs')
        }
    })
    let $sidebar_mini_xs_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_xs_checkbox).append('<span>Sidebar Mini XS</span>')
    $container.append($sidebar_mini_xs_container)

    let $flat_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-flat'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-flat')
        } else {
            $('.nav-sidebar').removeClass('nav-flat')
        }
    })
    let $flat_sidebar_container = $('<div />', { class: 'mb-1' }).append($flat_sidebar_checkbox).append('<span>Nav Flat Style</span>')
    $container.append($flat_sidebar_container)

    let $legacy_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-legacy'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-legacy')
        } else {
            $('.nav-sidebar').removeClass('nav-legacy')
        }
    })
    let $legacy_sidebar_container = $('<div />', { class: 'mb-1' }).append($legacy_sidebar_checkbox).append('<span>Nav Legacy Style</span>')
    $container.append($legacy_sidebar_container)

    let $compact_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-compact'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-compact')
        } else {
            $('.nav-sidebar').removeClass('nav-compact')
        }
    })
    let $compact_sidebar_container = $('<div />', { class: 'mb-1' }).append($compact_sidebar_checkbox).append('<span>Nav Compact</span>')
    $container.append($compact_sidebar_container)

    let $child_indent_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-child-indent'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-child-indent')
        } else {
            $('.nav-sidebar').removeClass('nav-child-indent')
        }
    })
    let $child_indent_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_indent_sidebar_checkbox).append('<span>Nav Child Indent</span>')
    $container.append($child_indent_sidebar_container)

    let $child_hide_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-collapse-hide-child'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-collapse-hide-child')
        } else {
            $('.nav-sidebar').removeClass('nav-collapse-hide-child')
        }
    })
    let $child_hide_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_hide_sidebar_checkbox).append('<span>Nav Child Hide on Collapse</span>')
    $container.append($child_hide_sidebar_container)

    let $no_expand_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.main-sidebar').hasClass('sidebar-no-expand'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.main-sidebar').addClass('sidebar-no-expand')
        } else {
            $('.main-sidebar').removeClass('sidebar-no-expand')
        }
    })
    let $no_expand_sidebar_container = $('<div />', { class: 'mb-4' }).append($no_expand_sidebar_checkbox).append('<span>Disable Hover/Focus Auto-Expand</span>')
    $container.append($no_expand_sidebar_container)

    $container.append('<h6>Footer Options</h6>')
    let $footer_fixed_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('layout-footer-fixed'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('layout-footer-fixed')
        } else {
            $('body').removeClass('layout-footer-fixed')
        }
    })
    let $footer_fixed_container = $('<div />', { class: 'mb-4' }).append($footer_fixed_checkbox).append('<span>Fixed</span>')
    $container.append($footer_fixed_container)

    $container.append('<h6>Small Text Options</h6>')

    let $text_sm_body_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('body').addClass('text-sm')
        } else {
            $('body').removeClass('text-sm')
        }
    })
    let $text_sm_body_container = $('<div />', { class: 'mb-1' }).append($text_sm_body_checkbox).append('<span>Body</span>')
    $container.append($text_sm_body_container)

    let $text_sm_header_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.main-header').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.main-header').addClass('text-sm')
        } else {
            $('.main-header').removeClass('text-sm')
        }
    })
    let $text_sm_header_container = $('<div />', { class: 'mb-1' }).append($text_sm_header_checkbox).append('<span>Navbar</span>')
    $container.append($text_sm_header_container)

    let $text_sm_brand_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.brand-link').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.brand-link').addClass('text-sm')
        } else {
            $('.brand-link').removeClass('text-sm')
        }
    })
    let $text_sm_brand_container = $('<div />', { class: 'mb-1' }).append($text_sm_brand_checkbox).append('<span>Brand</span>')
    $container.append($text_sm_brand_container)

    let $text_sm_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('text-sm')
        } else {
            $('.nav-sidebar').removeClass('text-sm')
        }
    })
    let $text_sm_sidebar_container = $('<div />', { class: 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span>Sidebar Nav</span>')
    $container.append($text_sm_sidebar_container)

    let $text_sm_footer_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.main-footer').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            $('.main-footer').addClass('text-sm')
        } else {
            $('.main-footer').removeClass('text-sm')
        }
    })
    let $text_sm_footer_container = $('<div />', { class: 'mb-4' }).append($text_sm_footer_checkbox).append('<span>Footer</span>')
    $container.append($text_sm_footer_container)

    // Color Arrays

    let navbar_dark_skins = [
        'navbar-primary',
        'navbar-secondary',
        'navbar-info',
        'navbar-success',
        'navbar-danger',
        'navbar-indigo',
        'navbar-purple',
        'navbar-pink',
        'navbar-navy',
        'navbar-lightblue',
        'navbar-teal',
        'navbar-cyan',
        'navbar-dark',
        'navbar-gray-dark',
        'navbar-gray'
    ]

    let navbar_light_skins = [
        'navbar-light',
        'navbar-warning',
        'navbar-white',
        'navbar-orange'
    ]

    let sidebar_colors = [
        'bg-primary',
        'bg-warning',
        'bg-info',
        'bg-danger',
        'bg-success',
        'bg-indigo',
        'bg-lightblue',
        'bg-navy',
        'bg-purple',
        'bg-fuchsia',
        'bg-pink',
        'bg-maroon',
        'bg-orange',
        'bg-lime',
        'bg-teal',
        'bg-olive'
    ]

    let accent_colors = [
        'accent-primary',
        'accent-warning',
        'accent-info',
        'accent-danger',
        'accent-success',
        'accent-indigo',
        'accent-lightblue',
        'accent-navy',
        'accent-purple',
        'accent-fuchsia',
        'accent-pink',
        'accent-maroon',
        'accent-orange',
        'accent-lime',
        'accent-teal',
        'accent-olive'
    ]

    let sidebar_skins = [
        'sidebar-dark-primary',
        'sidebar-dark-warning',
        'sidebar-dark-info',
        'sidebar-dark-danger',
        'sidebar-dark-success',
        'sidebar-dark-indigo',
        'sidebar-dark-lightblue',
        'sidebar-dark-navy',
        'sidebar-dark-purple',
        'sidebar-dark-fuchsia',
        'sidebar-dark-pink',
        'sidebar-dark-maroon',
        'sidebar-dark-orange',
        'sidebar-dark-lime',
        'sidebar-dark-teal',
        'sidebar-dark-olive',
        'sidebar-light-primary',
        'sidebar-light-warning',
        'sidebar-light-info',
        'sidebar-light-danger',
        'sidebar-light-success',
        'sidebar-light-indigo',
        'sidebar-light-lightblue',
        'sidebar-light-navy',
        'sidebar-light-purple',
        'sidebar-light-fuchsia',
        'sidebar-light-pink',
        'sidebar-light-maroon',
        'sidebar-light-orange',
        'sidebar-light-lime',
        'sidebar-light-teal',
        'sidebar-light-olive'
    ]

    // Navbar letiants

    $container.append('<h6>Navbar letiants</h6>')

    let $navbar_letiants = $('<div />', {
        class: 'd-flex'
    })
    let navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins)
    let $navbar_letiants_colors = createSkinBlock(navbar_all_colors, function() {
        let color = $(this).data('color')
        let $main_header = $('.main-header')
        $main_header.removeClass('navbar-dark').removeClass('navbar-light')
        navbar_all_colors.forEach(function(color) {
            $main_header.removeClass(color)
        })

        $(this).parent().removeClass().addClass('custom-select mb-3 text-light border-0 ')

        if (navbar_dark_skins.indexOf(color) > -1) {
            $main_header.addClass('navbar-dark')
            $(this).parent().addClass(color).addClass('text-light')
        } else {
            $main_header.addClass('navbar-light')
            $(this).parent().addClass(color)
        }

        $main_header.addClass(color)
    })

    let active_navbar_color = null
    
    $('.main-header')[0].classList.forEach(function(className) {
        if (navbar_all_colors.indexOf(className) > -1 && active_navbar_color === null) {
            active_navbar_color = className.replace('navbar-', 'bg-')
        }
    })

    $navbar_letiants_colors.find('option.' + active_navbar_color).prop('selected', true)
    $navbar_letiants_colors.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_navbar_color)

    $navbar_letiants.append($navbar_letiants_colors)

    $container.append($navbar_letiants)

    // Sidebar Colors

    $container.append('<h6>Accent Color letiants</h6>')
    let $accent_letiants = $('<div />', {
        class: 'd-flex'
    })
    $container.append($accent_letiants)
    $container.append(createSkinBlock(accent_colors, function() {
        let color = $(this).data('color')
        let accent_class = color
        let $body = $('body')
        accent_colors.forEach(function(skin) {
            $body.removeClass(skin)
        })

        $body.addClass(accent_class)
    }, true))

    let active_accent_color = null
    $('body')[0].classList.forEach(function(className) {
        if (accent_colors.indexOf(className) > -1 && active_accent_color === null) {
            active_accent_color = className.replace('navbar-', 'bg-')
        }
    })

    // $accent_letiants.find('option.' + active_accent_color).prop('selected', true)
    // $accent_letiants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_accent_color)

    $container.append('<h6>Dark Sidebar letiants</h6>')
    let $sidebar_letiants_dark = $('<div />', {
        class: 'd-flex'
    })
    $container.append($sidebar_letiants_dark)
    let $sidebar_dark_letiants = createSkinBlock(sidebar_colors, function() {
        let color = $(this).data('color')
        let sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
        let $sidebar = $('.main-sidebar')
        sidebar_skins.forEach(function(skin) {
            $sidebar.removeClass(skin)
            $sidebar_light_letiants.removeClass(skin.replace('sidebar-dark-', 'bg-')).removeClass('text-light')
        })

        $(this).parent().removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color)

        $sidebar_light_letiants.find('option').prop('selected', false)
        $sidebar.addClass(sidebar_class)
        $('.sidebar').removeClass('os-theme-dark').addClass('os-theme-light')
    }, true)
    $container.append($sidebar_dark_letiants)

    let active_sidebar_dark_color = null
    $('.main-sidebar')[0].classList.forEach(function(className) {
        let color = className.replace('sidebar-dark-', 'bg-')
        if (sidebar_colors.indexOf(color) > -1 && active_sidebar_dark_color === null) {
            active_sidebar_dark_color = color
        }
    })

    $sidebar_dark_letiants.find('option.' + active_sidebar_dark_color).prop('selected', true)
    $sidebar_dark_letiants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_sidebar_dark_color)

    $container.append('<h6>Light Sidebar letiants</h6>')
    let $sidebar_letiants_light = $('<div />', {
        class: 'd-flex'
    })
    $container.append($sidebar_letiants_light)
    let $sidebar_light_letiants = createSkinBlock(sidebar_colors, function() {
        let color = $(this).data('color')
        let sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
        let $sidebar = $('.main-sidebar')
        sidebar_skins.forEach(function(skin) {
            $sidebar.removeClass(skin)
            $sidebar_dark_letiants.removeClass(skin.replace('sidebar-light-', 'bg-')).removeClass('text-light')
        })

        $(this).parent().removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color)

        $sidebar_dark_letiants.find('option').prop('selected', false)
        $sidebar.addClass(sidebar_class)
        $('.sidebar').removeClass('os-theme-light').addClass('os-theme-dark')
    }, true)
    $container.append($sidebar_light_letiants)

    let active_sidebar_light_color = null
    $('.main-sidebar')[0].classList.forEach(function(className) {
        let color = className.replace('sidebar-light-', 'bg-')
        if (sidebar_colors.indexOf(color) > -1 && active_sidebar_light_color === null) {
            active_sidebar_light_color = color
        }
    })

    if (active_sidebar_light_color !== null) {
        $sidebar_light_letiants.find('option.' + active_sidebar_light_color).prop('selected', true)
        $sidebar_light_letiants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_sidebar_light_color)
    }

    let logo_skins = navbar_all_colors
    $container.append('<h6>Brand Logo letiants</h6>')
    let $logo_letiants = $('<div />', {
        class: 'd-flex'
    })
    $container.append($logo_letiants)
    let $clear_btn = $('<a />', {
        href: '#'
    }).text('clear').on('click', function(e) {
        e.preventDefault()
        let $logo = $('.brand-link')
        logo_skins.forEach(function(skin) {
            $logo.removeClass(skin)
        })
    })

    let $brand_letiants = createSkinBlock(logo_skins, function() {
        let color = $(this).data('color')
        let $logo = $('.brand-link')

        if (color === 'navbar-light' || color === 'navbar-white') {
            $logo.addClass('text-black')
        } else {
            $logo.removeClass('text-black')
        }

        logo_skins.forEach(function(skin) {
            $logo.removeClass(skin)
        })

        if (color) {
            $(this).parent().removeClass().addClass('custom-select mb-3 border-0').addClass(color).addClass(color !== 'navbar-light' && color !== 'navbar-white' ? 'text-light' : '')
        } else {
            $(this).parent().removeClass().addClass('custom-select mb-3 border-0')
        }

        $logo.addClass(color)
    }, true).append($clear_btn)
    $container.append($brand_letiants)

    let active_brand_color = null
    $('.brand-link')[0].classList.forEach(function(className) {
        if (logo_skins.indexOf(className) > -1 && active_brand_color === null) {
            active_brand_color = className.replace('navbar-', 'bg-')
        }
    })

    if (active_brand_color) {
        $brand_letiants.find('option.' + active_brand_color).prop('selected', true)
        $brand_letiants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_brand_color)
    }

    $.widget.bridge('uibutton', $.ui.button)
    // Make the dashboard widgets sortable Using jquery UI
    $('.connectedSortable').sortable({
        placeholder: 'sort-highlight',
        connectWith: '.connectedSortable',
        handle: '.card-header, .nav-tabs',
        forcePlaceholderSize: true,
        zIndex: 999999
    })
    $('.connectedSortable .card-header').css('cursor', 'move')

    // jQuery UI sortable for the todo list
    $('.todo-list').sortable({
        placeholder: 'sort-highlight',
        handle: '.handle',
        forcePlaceholderSize: true,
        zIndex: 999999
    })

    // bootstrap WYSIHTML5 - text editor
    $('.textarea').summernote()

    $('.daterange').daterangepicker({
        ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
    }, function(start, end) {
        // eslint-disable-next-line no-alert
        alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    })

    /* jQueryKnob */
    $('.knob').knob()

    // jvectormap data
    let visitorsData = {
        US: 398, // USA
        SA: 400, // Saudi Arabia
        CA: 1000, // Canada
        DE: 500, // Germany
        FR: 760, // France
        CN: 300, // China
        AU: 700, // Australia
        BR: 600, // Brazil
        IN: 800, // India
        GB: 320, // Great Britain
        RU: 3000 // Russia
    }
    // World map by jvectormap
    $('#world-map').vectorMap({
        map: 'usa_en',
        backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: 'rgba(255, 255, 255, 0.7)',
                'fill-opacity': 1,
                stroke: 'rgba(0,0,0,.2)',
                'stroke-width': 1,
                'stroke-opacity': 1
            }
        },
        series: {
            regions: [{
                values: visitorsData,
                scale: ['#ffffff', '#0154ad'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionLabelShow: function(e, el, code) {
            if (typeof visitorsData[code] !== 'undefined') {
                el.html(el.html() + ': ' + visitorsData[code] + ' new visitors')
            }
        }
    })

    // Sparkline charts
    let sparkline1 = new Sparkline($('#sparkline-1')[0], { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })
    let sparkline2 = new Sparkline($('#sparkline-2')[0], { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })
    let sparkline3 = new Sparkline($('#sparkline-3')[0], { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })

    sparkline1.draw([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021])
    sparkline2.draw([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921])
    sparkline3.draw([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21])

    // The Calender
    $('#calendar').datetimepicker({
        format: 'L',
        inline: true
    })

    // SLIMSCROLL FOR CHAT WIDGET
    $('#chat-box').overlayScrollbars({
        height: '250px'
    })

    /* Chart.js Charts */
    // Sales chart
    let salesChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d')
    // $('#revenue-chart').get(0).getContext('2d');

    let salesChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Digital Goods',
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
                label: 'Electronics',
                backgroundColor: 'rgba(210, 214, 222, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: false,
                pointColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    }

    let salesChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    }

    // This will get the first returned node in the jQuery collection.
    // eslint-disable-next-line no-unused-vars
    let salesChart = new Chart(salesChartCanvas, { // lgtm[js/unused-local-variable]
        type: 'line',
        data: salesChartData,
        options: salesChartOptions
    })

    // Donut Chart
    let pieChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d')
    let pieData = {
        labels: [
            'Instore Sales',
            'Download Sales',
            'Mail-Order Sales'
        ],
        datasets: [
            {
                data: [30, 12, 20],
                backgroundColor: ['#f56954', '#00a65a', '#f39c12']
            }
        ]
    }
    let pieOptions = {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true
    }
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    // eslint-disable-next-line no-unused-vars
    let pieChart = new Chart(pieChartCanvas, { // lgtm[js/unused-local-variable]
        type: 'doughnut',
        data: pieData,
        options: pieOptions
    })

    // Sales graph chart
    let salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d')
    // $('#revenue-chart').get(0).getContext('2d');

    let salesGraphChartData = {
        labels: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2'],
        datasets: [
            {
                label: 'Digital Goods',
                fill: false,
                borderWidth: 2,
                lineTension: 0,
                spanGaps: true,
                borderColor: '#efefef',
                pointRadius: 3,
                pointHoverRadius: 7,
                pointColor: '#efefef',
                pointBackgroundColor: '#efefef',
                data: [2666, 2778, 4912, 3767, 6810, 5670, 4820, 15073, 10687, 8432]
            }
        ]
    }

    let salesGraphChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#efefef'
                },
                gridLines: {
                    display: false,
                    color: '#efefef',
                    drawBorder: false
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: 5000,
                    fontColor: '#efefef'
                },
                gridLines: {
                    display: true,
                    color: '#efefef',
                    drawBorder: false
                }
            }]
        }
    }

    // This will get the first returned node in the jQuery collection.
    // eslint-disable-next-line no-unused-vars
    let salesGraphChart = new Chart(salesGraphChartCanvas, { // lgtm[js/unused-local-variable]
        type: 'line',
        data: salesGraphChartData,
        options: salesGraphChartOptions
    })

    
})
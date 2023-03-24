/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'pagination'
const DATA_KEY = 'tui.pageination'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`
const SELECTOR_LINK_END = '.page-link-end'
const SELECTOR_INPUT = '.page-link-input'
const SELECTOR_DATA_WIDGET = '[data-bs-widget="pagination"]'

const DATA_ID_PREURL = 'data-bs-preurl';
const DATA_ID_TOTAL = 'data-bs-total';

const Default = {}

/**
 * Class Definition
 * ====================================================
 */
class Pagination {
	constructor(element, config) {
		this._config = config
		this._element = element
	}

	// Public
	init() {

		if ($(this._element).find(SELECTOR_INPUT).length < 1) {
			return
		}

		const $endElement = $(this._element).find(`${SELECTOR_LINK_END}:first`)
		if ($endElement.length < 1) {
			return;
		}

		let preurl = $(this._element).attr(DATA_ID_PREURL)
		let total = parseInt($(this._element).attr(DATA_ID_TOTAL))
		if (!preurl || isNaN(total)) {
			return;
		}

		let endurl = $($endElement).attr('href')
		if (!endurl) {
			endurl = this.makeurl(preurl, total)
		}
		$($endElement).attr('href', 'javascript:void(0);')

		$(this._element).find(SELECTOR_INPUT).on('keyup afterpaste change', { total: total }, event => {
			const $relativeTarget = $(event.currentTarget)
			const total = event.data.total

			let value = $relativeTarget.val();
			if (value.length == 1) {
				value = value.replace(/[^1-9]/g, '')
			} else {
				value = value.replace(/\D/g, '').replace(/^0+/, '')
			}
			if (!isNaN(total) && total > 0 && value >= total) {
				value = total;
			}
			$relativeTarget.val(value);
		});

		let data = {
			preurl: preurl,
			total: total,
			endurl: endurl
		}
		$($endElement).on('click', data, event => {
			this.next(event)
		});
	}

	makeurl(preurl, id) {
		let url = ''
		if (!preurl || isNaN(id)) {
			return url
		}

		if (preurl.indexOf('%s') > -1) {
			url = preurl.replace("%s", id);
		} else if (preurl.indexOf('%d') > -1) {
			url = preurl.replace("%d", id);
		}
		return url
	}

	next(event) {
		const preurl = event.data.preurl
		const total = event.data.total
		let url = event.data.endurl
		const $inputElement = $(this._element).find(`${SELECTOR_INPUT}:first`)
		let value = parseInt($inputElement.val());
		if (!isNaN(value)) {
			if (value < 1) {
				value = 1;
			}
			if (value > total) {
				value = total;
			}

			url = this.makeurl(preurl, value);
		}
		if (!url) {
			return;
		}
		location.href = url;
		return;
	}


	// Static

	static _jQueryInterface(config) {
		return this.each(function() {
			let data = $(this).data(DATA_KEY)
			const _options = $.extend({}, Default, $(this).data())
			if (!data) {

				data = new Pagination($(this), _options)
				$(this).data(DATA_KEY, data)
			}
			
			if (config === 'init') {
				data[config]()
			}
		})
	}
}

/**
 * Data API
 * ====================================================
 */
$(window).on(EVENT_LOAD_DATA_API, () => {
	$(SELECTOR_DATA_WIDGET).each(function() {
		Pagination._jQueryInterface.call($(this), 'init')
	})
})

/**
 * jQuery API
 * ====================================================
 */
$.fn[NAME] = Pagination._jQueryInterface
$.fn[NAME].Constructor = Pagination
$.fn[NAME].noConflict = function() {
	$.fn[NAME] = JQUERY_NO_CONFLICT
	return Pagination._jQueryInterface
}

export default Pagination

import './select2.scss'


// rewrite $.fn.select2
// delete $.fn.select2
import Select2 from 'select2/dist/js/select2.full'

// defaults

$.fn.select2.defaults.set("theme", "bootstrap-5");
$.extend({select2: Select2})
export default Select2
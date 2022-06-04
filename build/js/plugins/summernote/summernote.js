import './summernote.scss';
import 'summernote/dist/summernote-bs4.js';
import 'summernote/dist/lang/summernote-zh-CN.js';



export default  ($ => {
    if ($.hasOwnProperty('summernote')) {
        $.summernote.options.lang = 'zh-CN';
		return $.summernote;
    }
	return false
	
})($)
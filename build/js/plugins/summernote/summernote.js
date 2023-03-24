import './summernote.scss'
import 'summernote/dist/summernote-bs5.js'
import 'summernote/dist/lang/summernote-zh-CN.js'

$.summernote.options.lang = 'zh-CN'
$.extend($.tiny, {summernote: $.summernote})
export default $.summernote

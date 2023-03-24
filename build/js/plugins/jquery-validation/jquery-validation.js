import './jquery-validation.scss'
import * as Validation from 'jquery-validation/dist/jquery.validate'

$.validator.addMethod('checked', function(value, element) {
    return element.checked
}, 'checked')
export default Validation
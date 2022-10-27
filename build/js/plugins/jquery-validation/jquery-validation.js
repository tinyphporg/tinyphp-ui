import './jquery-validation.scss'
import * as Validation from 'jquery-validation/dist/jquery.validate'

$.validator.addMethod('checked', function(value, element) {
    console.log(value)
    return element.checked
}, 'checked')
export default Validation
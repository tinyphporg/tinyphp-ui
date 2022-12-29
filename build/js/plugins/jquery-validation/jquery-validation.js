import './jquery-validation.scss'
import * as Validation from 'jquery-validation/dist/jquery.validate'
$.validator.setDefaults({
    validClass: "is-valid", // 验证成功的样式
    errorClass: "is-invalid", // 验证失败的样式

});
export default Validation
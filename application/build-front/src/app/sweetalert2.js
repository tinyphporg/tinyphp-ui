/**
 * 定义swal默认属性
 */
import './sweetalert2.css';
import swal from 'sweetalert2';

if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    /* Include a polyfill for ES6 Promises (optional) for IE11, UC Browser and Android browser support */
    document.write('<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>');
}

$.extend({
    'swal':swal
});

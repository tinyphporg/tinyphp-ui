import './sweetalert2.css';
import Swal from 'sweetalert2';


const alert = (...arg) => {
    return Swal.fire(...arg);
}

alert.dest = 'prowe by sweetalert2';



export default alert;
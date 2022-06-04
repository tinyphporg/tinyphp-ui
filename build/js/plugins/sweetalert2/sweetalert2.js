import './sweetalert2.scss';
import swal2 from 'sweetalert2';

const Alert = (...arg) => {
    return swal2.fire(...arg);    
}

Alert.dependencies = {
    swal2:swal2
}

export default Alert;
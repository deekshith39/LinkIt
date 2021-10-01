import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
    
toast.configure()

class Toast {
    success(message) {
        toast.success(message, {position: toast.POSITION.BOTTOM_CENTER, autoClose:3000})
    }
    error(message) {
        toast.error(message, {position: toast.POSITION.BOTTOM_CENTER, autoClose:3000})
    }
}

const toastMessage = new Toast();

export default toastMessage;
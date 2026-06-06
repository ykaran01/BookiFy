import { toast, Zoom } from 'react-toastify';
const toastConfig = {
    position: "top-right",
    autoClose: 1200, 
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
    transition: Zoom, 
};

export const showSuccessToast = (message) => {
    toast.success(message, toastConfig);
};

export const showErrorToast = (message) => {
    toast.error(message, toastConfig);
};

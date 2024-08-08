import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...options, position: 'top-right' });
};

export const notifyError = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...options, position: 'top-right' });
};

export const notifyInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...options, position: 'top-right' });
};
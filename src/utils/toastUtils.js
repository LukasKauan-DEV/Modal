// utils/toastUtils.js
import { toast } from 'react-toastify';

export const showSuccess = (mensagem) => {
  toast.success(mensagem, {
    className: 'text-white bg-success',
    bodyClassName: 'text-white',
  });
};

export const showError = (mensagem) => {
  toast.error(mensagem, {
    className: 'text-white bg-danger',
    bodyClassName: 'text-white',
  });
};

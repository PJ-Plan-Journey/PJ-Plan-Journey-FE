import { useState } from 'react';

const useModal = () => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const showError = (message) => {
    setMessage(message);
    setIsError(true);
  };

  const hideError = () => {
    setIsError(false);
  };

  return { isError, message, showError, hideError };
};

export default useModal;

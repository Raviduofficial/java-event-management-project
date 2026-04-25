import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast = { id, message, type };
    setToasts((current) => [...current, toast]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  const success = useCallback((message) => pushToast(message, 'success'), [pushToast]);
  const error = useCallback((message) => pushToast(message, 'error'), [pushToast]);
  const info = useCallback((message) => pushToast(message, 'info'), [pushToast]);
  const warning = useCallback((message) => pushToast(message, 'warning'), [pushToast]);

  const value = useMemo(() => ({ success, error, info, warning }), [success, error, info, warning]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };

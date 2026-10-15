import React, { useEffect } from 'react';
import './Toast.css';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast-icon success" />;
      case 'warning':
      case 'error':
        return <AlertTriangle size={18} className="toast-icon warning" />;
      case 'info':
      default:
        return <Info size={18} className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast-container ${toast ? 'show' : ''}`}>
      <div className={`toast toast-${toast.type || 'info'}`}>
        <div className="toast-content">
          {getIcon()}
          <span className="toast-message">{toast.message}</span>
        </div>
        <button 
          className="toast-close" 
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

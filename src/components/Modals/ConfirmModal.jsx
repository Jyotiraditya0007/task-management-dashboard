import React, { useEffect } from 'react';
import './ConfirmModal.css';
import { AlertTriangle, Trash2, RotateCcw, X } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning'
  onConfirm,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div 
        className="confirm-modal-box" 
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="confirm-modal-top">
          <div className={`confirm-icon-box ${type}`}>
            {type === 'danger' ? <Trash2 size={22} /> : <AlertTriangle size={22} />}
          </div>
          <button 
            className="confirm-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        <div className="confirm-modal-body">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
        </div>

        <div className="confirm-modal-footer">
          <button 
            className="btn-confirm-cancel" 
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`btn-confirm-action ${type}`} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

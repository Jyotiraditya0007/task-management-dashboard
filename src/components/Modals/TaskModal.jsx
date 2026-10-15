import React, { useState, useEffect, useRef } from 'react';
import './TaskModal.css';
import { X, Calendar, AlertCircle, Plus, Check } from 'lucide-react';
import { PRIORITIES, STATUSES, CATEGORIES } from '../../data/initialTasks';
import { getTodayDateInputString } from '../../utils/dateUtils';

export const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null
}) => {
  const isEditMode = Boolean(taskToEdit);
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    category: 'Frontend',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Medium',
        status: taskToEdit.status || 'Pending',
        category: taskToEdit.category || 'Frontend',
        dueDate: taskToEdit.dueDate || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        category: 'Frontend',
        dueDate: getTodayDateInputString()
      });
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  // Focus title input on modal open & handle ESC key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleQuickDate = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setFormData((prev) => ({ ...prev, dueDate: `${year}-${month}-${day}` }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      titleInputRef.current?.focus();
      return;
    }

    onSave({
      ...taskToEdit,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      category: formData.category,
      dueDate: formData.dueDate,
      updatedAt: new Date().toISOString().split('T')[0]
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h2 id="modal-title" className="modal-title">
              {isEditMode ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="modal-subtitle">
              {isEditMode 
                ? 'Update task properties and manage sprint progress.' 
                : 'Fill in details below to log a new workflow task.'}
            </p>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Task Title <span className="required">*</span>
            </label>
            <input
              id="task-title-input"
              ref={titleInputRef}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Integrate Stripe Payment Gateway"
              className={`form-input ${errors.title ? 'has-error' : ''}`}
            />
            {errors.title && (
              <span className="error-text">
                <AlertCircle size={13} /> {errors.title}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-desc-input" className="form-label">
              Description <span className="optional">(optional)</span>
            </label>
            <textarea
              id="task-desc-input"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Outline acceptance criteria, technical details, or notes..."
              className="form-textarea"
            />
          </div>

          {/* Priority & Status Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">Priority</label>
              <select
                id="task-priority-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-status-select" className="form-label">Status</label>
              <select
                id="task-status-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & Due Date Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-cat-select" className="form-label">Category</label>
              <select
                id="task-cat-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label">Due Date</label>
              <div className="date-input-wrap">
                <input
                  id="task-due-date"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="quick-date-shortcuts">
                <button
                  type="button"
                  className="quick-date-btn"
                  onClick={() => handleQuickDate(0)}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="quick-date-btn"
                  onClick={() => handleQuickDate(1)}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  className="quick-date-btn"
                  onClick={() => handleQuickDate(7)}
                >
                  +1 Week
                </button>
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-submit"
            >
              {isEditMode ? (
                <>
                  <Check size={16} />
                  <span>Update Task</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

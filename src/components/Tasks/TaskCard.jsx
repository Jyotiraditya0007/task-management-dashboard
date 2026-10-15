import React from 'react';
import './TaskCard.css';
import {
  Calendar,
  Clock,
  Edit3,
  Trash2,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { PriorityBadge, StatusBadge, CategoryBadge } from '../Common/Badge';
import { formatDate, isOverdue, getDueBadgeType } from '../../utils/dateUtils';
import confetti from 'canvas-confetti';

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  layout = 'card'
}) => {
  const isCompleted = task.status === 'Completed';
  const overdue = isOverdue(task.dueDate, task.status);
  const dueBadge = getDueBadgeType(task.dueDate, task.status);

  const handleToggle = () => {
    if (!isCompleted) {
      // Trigger celebratory confetti!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#38bdf8']
        });
      } catch (e) {
        // Fallback silently if canvas not available
      }
    }
    onToggleComplete(task.id);
  };

  return (
    <div
      className={`task-item ${layout === 'list' ? 'task-item-list' : 'task-item-card'} ${
        isCompleted ? 'is-completed' : ''
      } ${overdue ? 'is-overdue' : ''}`}
    >
      {/* Top Header / Badges */}
      <div className="task-header">
        <div className="task-badges">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
          {task.category && <CategoryBadge category={task.category} />}
        </div>

        {/* Action Buttons */}
        <div className="task-actions">
          <button
            className="task-action-btn edit"
            onClick={() => onEdit(task)}
            title="Edit Task"
            aria-label={`Edit ${task.title}`}
          >
            <Edit3 size={15} />
          </button>
          <button
            className="task-action-btn delete"
            onClick={() => onDelete(task)}
            title="Delete Task"
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="task-body">
        <div className="task-title-row">
          <button
            className={`task-check-circle ${isCompleted ? 'checked' : ''}`}
            onClick={handleToggle}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
            title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
          >
            {isCompleted ? (
              <CheckCircle2 size={20} className="check-icon-completed" />
            ) : (
              <Circle size={20} className="check-icon-pending" />
            )}
          </button>
          <h3 className={`task-title ${isCompleted ? 'title-completed' : ''}`}>
            {task.title}
          </h3>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      {/* Footer Info */}
      <div className="task-footer">
        <div className="task-date-info">
          <Calendar size={14} className="date-icon" />
          <span className={`date-text ${overdue ? 'date-overdue' : ''} ${dueBadge === 'today' ? 'date-today' : ''}`}>
            {overdue && <AlertTriangle size={12} className="inline-overdue-icon" />}
            {formatDate(task.dueDate)}
          </span>
        </div>

        {/* Quick Status Cycler */}
        <div className="task-status-selector">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="status-quick-select"
            title="Quick update status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

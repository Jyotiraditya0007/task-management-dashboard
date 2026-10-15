import React from 'react';
import './TaskList.css';
import { TaskCard } from './TaskCard';
import { ClipboardList, Plus, RotateCcw } from 'lucide-react';

export const TaskList = ({
  tasks,
  layout = 'grid',
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onOpenNewTaskModal,
  isFiltered,
  onResetFilters
}) => {
  if (tasks.length === 0) {
    return (
      <div className="task-empty-state">
        <div className="empty-icon-box">
          <ClipboardList size={38} />
        </div>
        <h3 className="empty-title">
          {isFiltered ? 'No tasks match your criteria' : 'No tasks found'}
        </h3>
        <p className="empty-description">
          {isFiltered
            ? 'Try adjusting your search query, priority, or category filters.'
            : 'Get started by creating your first task to track your engineering workflow!'}
        </p>
        <div className="empty-actions">
          {isFiltered ? (
            <button className="btn-empty-action secondary" onClick={onResetFilters}>
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </button>
          ) : (
            <button className="btn-empty-action primary" onClick={onOpenNewTaskModal}>
              <Plus size={16} />
              <span>Add Your First Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`task-list-wrapper layout-${layout}`}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          layout={layout}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

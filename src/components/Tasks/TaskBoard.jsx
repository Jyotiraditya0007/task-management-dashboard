import React from 'react';
import './TaskBoard.css';
import { TaskCard } from './TaskCard';
import { Plus, ArrowRight, ArrowLeft, CheckCircle2, Clock, Hourglass } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TaskBoard = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onOpenNewTaskModal
}) => {
  const columns = [
    {
      id: 'Pending',
      title: 'Pending',
      description: 'Tasks in queue',
      icon: Hourglass,
      colorClass: 'col-pending',
      tasks: tasks.filter((t) => t.status === 'Pending')
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      description: 'Currently working on',
      icon: Clock,
      colorClass: 'col-progress',
      tasks: tasks.filter((t) => t.status === 'In Progress')
    },
    {
      id: 'Completed',
      title: 'Completed',
      description: 'Done & verified',
      icon: CheckCircle2,
      colorClass: 'col-completed',
      tasks: tasks.filter((t) => t.status === 'Completed')
    }
  ];

  const handleQuickAdvance = (taskId, newStatus) => {
    if (newStatus === 'Completed') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#38bdf8']
        });
      } catch (e) {}
    }
    onStatusChange(taskId, newStatus);
  };

  return (
    <div className="kanban-board-container">
      {columns.map((col) => {
        const Icon = col.icon;
        return (
          <div key={col.id} className={`kanban-column ${col.colorClass}`}>
            <div className="kanban-column-header">
              <div className="column-header-left">
                <div className="column-icon-wrap">
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="column-title">{col.title}</h3>
                  <span className="column-subtitle">{col.description}</span>
                </div>
              </div>
              <div className="column-header-right">
                <span className="column-badge-count">{col.tasks.length}</span>
                {col.id !== 'Completed' && (
                  <button
                    className="column-add-btn"
                    onClick={onOpenNewTaskModal}
                    title={`Add task to ${col.title}`}
                    aria-label={`Add task to ${col.title}`}
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="kanban-cards-list">
              {col.tasks.length === 0 ? (
                <div className="kanban-column-empty">
                  <span>No tasks in this lane</span>
                </div>
              ) : (
                col.tasks.map((task) => (
                  <div key={task.id} className="kanban-card-wrapper">
                    <TaskCard
                      task={task}
                      layout="card"
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onToggleComplete={onToggleComplete}
                      onStatusChange={onStatusChange}
                    />
                    
                    {/* Fast lane mover bar */}
                    <div className="kanban-quick-lane-bar">
                      {col.id === 'Pending' && (
                        <button
                          className="btn-lane-move next"
                          onClick={() => handleQuickAdvance(task.id, 'In Progress')}
                        >
                          <span>Start Working</span>
                          <ArrowRight size={13} />
                        </button>
                      )}
                      {col.id === 'In Progress' && (
                        <>
                          <button
                            className="btn-lane-move back"
                            onClick={() => handleQuickAdvance(task.id, 'Pending')}
                          >
                            <ArrowLeft size={13} />
                            <span>To Pending</span>
                          </button>
                          <button
                            className="btn-lane-move next complete"
                            onClick={() => handleQuickAdvance(task.id, 'Completed')}
                          >
                            <span>Mark Complete</span>
                            <CheckCircle2 size={13} />
                          </button>
                        </>
                      )}
                      {col.id === 'Completed' && (
                        <button
                          className="btn-lane-move back"
                          onClick={() => handleQuickAdvance(task.id, 'In Progress')}
                        >
                          <ArrowLeft size={13} />
                          <span>Reopen Task</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

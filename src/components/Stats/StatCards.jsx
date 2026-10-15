import React from 'react';
import './StatCards.css';
import { 
  CheckCircle2, 
  Clock, 
  Hourglass, 
  ListTodo, 
  TrendingUp, 
  Flame 
} from 'lucide-react';

export const StatCards = ({ tasks, onFilterClick, activeStatusFilter }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const urgent = tasks.filter((t) => t.priority === 'Urgent' && t.status !== 'Completed').length;

  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: total,
      subtext: urgent > 0 ? `${urgent} urgent action item${urgent > 1 ? 's' : ''}` : 'All logged tasks',
      icon: ListTodo,
      color: 'primary',
      filterValue: 'All',
      isActive: activeStatusFilter === 'All'
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: inProgress,
      subtext: 'Actively being worked on',
      icon: Clock,
      color: 'warning',
      filterValue: 'In Progress',
      isActive: activeStatusFilter === 'In Progress'
    },
    {
      id: 'pending',
      label: 'Pending',
      value: pending,
      subtext: 'Awaiting start',
      icon: Hourglass,
      color: 'sky',
      filterValue: 'Pending',
      isActive: activeStatusFilter === 'Pending'
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completed,
      subtext: `${completionPercentage}% overall completion`,
      icon: CheckCircle2,
      color: 'success',
      filterValue: 'Completed',
      isActive: activeStatusFilter === 'Completed'
    }
  ];

  return (
    <div className="stats-section">
      <div className="stats-header">
        <div className="stats-title-wrap">
          <h2 className="stats-title">Overview & Velocity</h2>
          <p className="stats-subtitle">Live project metrics synced with local storage</p>
        </div>
        
        <div className="progress-pill-wrapper">
          <div className="progress-pill-info">
            <span className="progress-pill-label">
              <TrendingUp size={14} /> Completion Rate
            </span>
            <span className="progress-pill-val">{completionPercentage}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercentage}%` }}
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`stat-card stat-${stat.color} ${stat.isActive ? 'is-active' : ''}`}
              onClick={() => onFilterClick && onFilterClick(stat.filterValue)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onFilterClick && onFilterClick(stat.filterValue);
                }
              }}
              title={`Click to filter by ${stat.label}`}
            >
              <div className="stat-card-header">
                <span className="stat-label">{stat.label}</span>
                <div className={`stat-icon-wrap icon-${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </div>
              <div className="stat-card-footer">
                <span className="stat-interactive-hint">Click to filter</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

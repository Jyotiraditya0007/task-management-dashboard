import React from 'react';
import './Badge.css';
import { AlertCircle, Clock, CheckCircle2, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export const PriorityBadge = ({ priority }) => {
  const normalized = (priority || 'medium').toLowerCase();
  
  const getIcon = () => {
    switch (normalized) {
      case 'urgent':
        return <Flame size={12} className="badge-icon" />;
      case 'high':
        return <ShieldAlert size={12} className="badge-icon" />;
      case 'medium':
        return <AlertCircle size={12} className="badge-icon" />;
      case 'low':
      default:
        return <Sparkles size={12} className="badge-icon" />;
    }
  };

  return (
    <span className={`badge badge-priority badge-priority-${normalized}`}>
      {getIcon()}
      {priority}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const normalized = (status || 'pending').toLowerCase().replace(/\s+/g, '-');

  const getIcon = () => {
    switch (normalized) {
      case 'completed':
        return <CheckCircle2 size={12} className="badge-icon" />;
      case 'in-progress':
        return <Clock size={12} className="badge-icon" />;
      case 'pending':
      default:
        return <span className="status-dot"></span>;
    }
  };

  return (
    <span className={`badge badge-status badge-status-${normalized}`}>
      {getIcon()}
      {status}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  if (!category) return null;
  return (
    <span className="badge badge-category">
      #{category}
    </span>
  );
};

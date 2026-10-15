/**
 * Utility functions for date manipulation and formatting
 */

export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  
  const targetDate = new Date(dateString + 'T00:00:00');
  if (isNaN(targetDate.getTime())) return dateString;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return targetDate.toLocaleDateString('en-US', options);
};

export const isOverdue = (dateString, status) => {
  if (!dateString || status === 'Completed') return false;
  
  const targetDate = new Date(dateString + 'T23:59:59');
  const now = new Date();
  
  return targetDate < now;
};

export const getDueBadgeType = (dateString, status) => {
  if (status === 'Completed') return 'completed';
  if (!dateString) return 'none';
  
  if (isOverdue(dateString, status)) return 'overdue';
  
  const targetDate = new Date(dateString + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays <= 2 && diffDays > 0) return 'soon';
  return 'normal';
};

export const generateId = () => {
  return 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
};

export const getTodayDateInputString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

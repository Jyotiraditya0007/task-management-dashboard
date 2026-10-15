import React from 'react';
import './Sidebar.css';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Flame,
  Tag,
  RotateCcw,
  Layers,
  Calendar,
  X,
  Code2,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES } from '../../data/initialTasks';
import { isOverdue } from '../../utils/dateUtils';

export const Sidebar = ({
  isOpen,
  onClose,
  tasks,
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  onResetData,
  onOpenNewTaskModal
}) => {
  // Compute counts for navigation badges
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const highPriorityCount = tasks.filter(
    (t) => (t.priority === 'High' || t.priority === 'Urgent') && t.status !== 'Completed'
  ).length;
  
  const todayAndOverdueCount = tasks.filter((t) => {
    if (t.status === 'Completed' || !t.dueDate) return false;
    if (isOverdue(t.dueDate, t.status)) return true;
    const today = new Date().toISOString().split('T')[0];
    return t.dueDate === today;
  }).length;

  const navItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: LayoutDashboard,
      count: totalCount
    },
    {
      id: 'urgent',
      label: 'High Priority',
      icon: Flame,
      count: highPriorityCount,
      badgeColor: 'urgent'
    },
    {
      id: 'today',
      label: 'Due / Overdue',
      icon: Calendar,
      count: todayAndOverdueCount,
      badgeColor: 'warning'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: completedCount,
      badgeColor: 'success'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand / Logo */}
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <Layers size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-title">TaskFlow</span>
            <span className="brand-badge">DevBoard</span>
          </div>
          <button 
            className="sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title">Navigation</div>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id && selectedCategory === 'All';
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveView(item.id);
                    setSelectedCategory('All');
                    if (window.innerWidth <= 900) onClose();
                  }}
                >
                  <div className="nav-item-left">
                    <Icon size={18} className="nav-icon" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`nav-count ${item.badgeColor || ''}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Categories Section */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title">
            <span>Categories</span>
            <Tag size={13} />
          </div>
          <div className="category-list">
            {CATEGORIES.map((category) => {
              const count = category === 'All'
                ? tasks.length
                : tasks.filter((t) => t.category === category).length;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  className={`category-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    if (window.innerWidth <= 900) onClose();
                  }}
                >
                  <span className="category-dot" />
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Demo Controls */}
        <div className="sidebar-demo-box">
          <div className="demo-box-header">
            <Code2 size={15} />
            <span>Developer Sandbox</span>
          </div>
          <p className="demo-box-desc">
            Changes persist in localStorage. Reset sample tasks anytime for demos.
          </p>
          <button 
            className="btn-reset-data" 
            onClick={onResetData}
            title="Reset to fresh demo sample tasks"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Developer Profile Footer */}
        <div className="sidebar-user-card">
          <div className="user-avatar">
            <span>JD</span>
            <span className="user-status-dot" title="Online" />
          </div>
          <div className="user-info">
            <span className="user-name">Junior Dev Portfolio</span>
            <span className="user-role">React & JavaScript</span>
          </div>
        </div>
      </aside>
    </>
  );
};

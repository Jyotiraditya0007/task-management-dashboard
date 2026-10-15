import React, { useRef, useEffect } from 'react';
import './Header.css';
import {
  Search,
  Plus,
  Sun,
  Moon,
  Menu,
  X,
  Calendar,
  Command
} from 'lucide-react';

export const Header = ({
  searchQuery,
  setSearchQuery,
  onOpenNewTaskModal,
  theme,
  toggleTheme,
  onToggleSidebar
}) => {
  const searchInputRef = useRef(null);

  // Keyboard shortcut: Cmd/Ctrl + K or "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === '/' && document.activeElement !== searchInputRef.current && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Mobile Menu Trigger */}
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <div className="search-bar-container">
          <Search size={16} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search tasks, descriptions, tags... (Press ⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
          <div className="search-keyboard-hint">
            <kbd>⌘K</kbd>
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Date Badge */}
        <div className="header-date-pill">
          <Calendar size={14} className="date-icon" />
          <span>{todayFormatted}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle dark/light mode"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="theme-icon sun" />
          ) : (
            <Moon size={18} className="theme-icon moon" />
          )}
        </button>

        {/* Add Task Primary CTA */}
        <button
          className="btn-create-task"
          onClick={onOpenNewTaskModal}
          title="Create a new task"
        >
          <Plus size={18} className="btn-icon" />
          <span className="btn-label">New Task</span>
        </button>
      </div>
    </header>
  );
};

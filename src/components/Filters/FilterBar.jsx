import React from 'react';
import './FilterBar.css';
import {
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  LayoutGrid,
  List,
  Kanban,
  RotateCcw,
  Check
} from 'lucide-react';
import { PRIORITIES, STATUSES, CATEGORIES } from '../../data/initialTasks';

export const FilterBar = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
  onResetFilters
}) => {
  const isFilterActive =
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    selectedCategory !== 'All' ||
    sortBy !== 'dueDateAsc';

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-left">
        {/* Status Pill Tabs */}
        <div className="status-tabs-group" role="tablist" aria-label="Filter tasks by status">
          {['All', ...STATUSES].map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                role="tab"
                aria-selected={isActive}
                className={`status-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Priority Dropdown */}
        <div className="filter-select-wrapper">
          <label htmlFor="priority-filter" className="sr-only">Filter by Priority</label>
          <div className="select-inner">
            <span className="select-icon-label">Priority:</span>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="filter-select-wrapper">
          <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
          <div className="select-inner">
            <span className="select-icon-label">Category:</span>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="filter-select-wrapper sort-wrapper">
          <label htmlFor="sort-by-select" className="sr-only">Sort Tasks</label>
          <div className="select-inner">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select sort-select"
            >
              <option value="dueDateAsc">Due: Earliest First</option>
              <option value="dueDateDesc">Due: Latest First</option>
              <option value="priorityDesc">Priority: Highest First</option>
              <option value="createdDesc">Date: Newest First</option>
              <option value="titleAsc">Title: A to Z</option>
            </select>
          </div>
        </div>

        {/* Reset Filter Button */}
        {isFilterActive && (
          <button
            className="btn-clear-filters"
            onClick={onResetFilters}
            title="Clear all active filters"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="filter-bar-right">
        {/* Results Counter */}
        <div className="results-count">
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong>
        </div>

        {/* View Switcher: Board, Grid, List */}
        <div className="view-mode-toggle" role="group" aria-label="Change display view">
          <button
            className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
            onClick={() => setViewMode('board')}
            title="Kanban Board View"
            aria-label="Kanban Board View"
          >
            <Kanban size={16} />
            <span className="view-btn-label">Board</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid Cards View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span className="view-btn-label">Grid</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Compact List View"
            aria-label="Compact List View"
          >
            <List size={16} />
            <span className="view-btn-label">List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

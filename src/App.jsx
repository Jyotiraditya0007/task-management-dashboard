import React, { useState, useMemo } from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { INITIAL_TASKS } from './data/initialTasks';
import { generateId, isOverdue } from './utils/dateUtils';

// Components
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { StatCards } from './components/Stats/StatCards';
import { FilterBar } from './components/Filters/FilterBar';
import { TaskList } from './components/Tasks/TaskList';
import { TaskBoard } from './components/Tasks/TaskBoard';
import { TaskModal } from './components/Modals/TaskModal';
import { ConfirmModal } from './components/Modals/ConfirmModal';
import { Toast } from './components/Common/Toast';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', INITIAL_TASKS);

  // Layout & View States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'board'
  const [activeView, setActiveView] = useState('all'); // 'all' | 'urgent' | 'today' | 'completed'

  // Filtering & Sorting States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  // Modals & Feedback
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: () => {}
  });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Task Actions
  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      // Edit existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
      showToast(`Updated "${taskData.title}"`, 'success');
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: generateId(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast(`Added "${newTask.title}"`, 'success');
    }
  };

  const handleDeleteRequest = (task) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Task',
      message: `Are you sure you want to permanently delete "${task.title}"? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
        showToast(`Deleted task "${task.title}"`, 'warning');
      }
    });
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isDone = t.status === 'Completed';
          const nextStatus = isDone ? 'Pending' : 'Completed';
          if (!isDone) {
            showToast(`Task completed! Great job! 🎉`, 'success');
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Status updated to ${newStatus}`, 'info');
  };

  const handleResetDemoDataRequest = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset Demo Data',
      message: 'This will restore the sample tasks dataset and reset any modifications. Continue?',
      type: 'warning',
      onConfirm: () => {
        setTasks(INITIAL_TASKS);
        setStatusFilter('All');
        setPriorityFilter('All');
        setSelectedCategory('All');
        setActiveView('all');
        setSearchQuery('');
        showToast('Sample dataset restored successfully!', 'success');
      }
    });
  };

  const handleResetFilters = () => {
    setStatusFilter('All');
    setPriorityFilter('All');
    setSelectedCategory('All');
    setSortBy('dueDateAsc');
    setSearchQuery('');
  };

  // Filter & Sort Logic
  const filteredAndSortedTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    return tasks
      .filter((task) => {
        // 1. Sidebar View Filter
        if (activeView === 'urgent') {
          if (task.status === 'Completed' || (task.priority !== 'Urgent' && task.priority !== 'High')) {
            return false;
          }
        } else if (activeView === 'today') {
          if (task.status === 'Completed') return false;
          const isOver = isOverdue(task.dueDate, task.status);
          const isDueToday = task.dueDate === today;
          if (!isOver && !isDueToday) return false;
        } else if (activeView === 'completed') {
          if (task.status !== 'Completed') return false;
        }

        // 2. Status Filter
        if (statusFilter !== 'All' && task.status !== statusFilter) {
          return false;
        }

        // 3. Priority Filter
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
          return false;
        }

        // 4. Category Filter
        if (selectedCategory !== 'All' && task.category !== selectedCategory) {
          return false;
        }

        // 5. Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = (task.description || '').toLowerCase().includes(q);
          const matchCat = (task.category || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDateAsc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'dueDateDesc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        }
        if (sortBy === 'priorityDesc') {
          const weight = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        if (sortBy === 'createdDesc') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (sortBy === 'titleAsc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, activeView, statusFilter, priorityFilter, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        tasks={tasks}
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onResetData={handleResetDemoDataRequest}
        onOpenNewTaskModal={() => {
          setTaskToEdit(null);
          setIsTaskModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNewTaskModal={() => {
            setTaskToEdit(null);
            setIsTaskModalOpen(true);
          }}
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="dashboard-main-container">
          {/* Dashboard Metrics Overview */}
          <StatCards
            tasks={tasks}
            activeStatusFilter={statusFilter}
            onFilterClick={(val) => setStatusFilter(val)}
          />

          {/* Filtering, Search & View Controls */}
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filteredCount={filteredAndSortedTasks.length}
            totalCount={tasks.length}
            onResetFilters={handleResetFilters}
          />

          {/* Main Task Display: Kanban Board OR Grid/List */}
          {viewMode === 'board' ? (
            <TaskBoard
              tasks={filteredAndSortedTasks}
              onEdit={(task) => {
                setTaskToEdit(task);
                setIsTaskModalOpen(true);
              }}
              onDelete={handleDeleteRequest}
              onToggleComplete={handleToggleComplete}
              onStatusChange={handleStatusChange}
              onOpenNewTaskModal={() => {
                setTaskToEdit(null);
                setIsTaskModalOpen(true);
              }}
            />
          ) : (
            <TaskList
              tasks={filteredAndSortedTasks}
              layout={viewMode}
              onEdit={(task) => {
                setTaskToEdit(task);
                setIsTaskModalOpen(true);
              }}
              onDelete={handleDeleteRequest}
              onToggleComplete={handleToggleComplete}
              onStatusChange={handleStatusChange}
              onOpenNewTaskModal={() => {
                setTaskToEdit(null);
                setIsTaskModalOpen(true);
              }}
              isFiltered={
                statusFilter !== 'All' ||
                priorityFilter !== 'All' ||
                selectedCategory !== 'All' ||
                Boolean(searchQuery.trim())
              }
              onResetFilters={handleResetFilters}
            />
          )}
        </main>
      </div>

      {/* Modals & Feedback Notifications */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

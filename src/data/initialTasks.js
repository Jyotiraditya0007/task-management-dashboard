/**
 * Realistic initial sample tasks for first-time demo and resume portfolio showcase
 */

export const INITIAL_TASKS = [
  {
    id: 'task_001',
    title: 'Implement OAuth 2.0 & JWT Authentication',
    description: 'Set up secure user authentication flow with access tokens, refresh tokens, and protected API routes.',
    priority: 'Urgent',
    status: 'In Progress',
    dueDate: '2026-10-18',
    category: 'Backend',
    createdAt: '2026-10-12',
  },
  {
    id: 'task_002',
    title: 'Design Responsive Dashboard Layout & Navigation',
    description: 'Build sleek collapsible sidebar, modern top bar with quick actions, and mobile-friendly drawer menu.',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-10-14',
    category: 'Frontend',
    createdAt: '2026-10-10',
  },
  {
    id: 'task_003',
    title: 'PostgreSQL Database Indexing & Query Tuning',
    description: 'Add composite indexes on frequently searched columns to reduce query execution latency by 45%.',
    priority: 'High',
    status: 'Pending',
    dueDate: '2026-10-20',
    category: 'Database',
    createdAt: '2026-10-13',
  },
  {
    id: 'task_004',
    title: 'Setup CI/CD Pipeline with GitHub Actions',
    description: 'Automate build testing, linting checks, and staging environment deployments on every pull request.',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2026-10-13',
    category: 'DevOps',
    createdAt: '2026-10-09',
  },
  {
    id: 'task_005',
    title: 'Refactor State Management & Custom Hooks',
    description: 'Extract reusable localStorage sync and filter logic into modular React hooks to improve code maintainability.',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-10-22',
    category: 'Frontend',
    createdAt: '2026-10-14',
  },
  {
    id: 'task_006',
    title: 'Audit Web Accessibility (WCAG 2.1 AA Compliance)',
    description: 'Ensure proper ARIA attributes, semantic HTML tags, keyboard navigation traps, and sufficient contrast ratios.',
    priority: 'Low',
    status: 'Pending',
    dueDate: '2026-10-25',
    category: 'UI/UX',
    createdAt: '2026-10-14',
  },
  {
    id: 'task_007',
    title: 'Write Integration Tests for Task Workflow',
    description: 'Cover creation, editing, status transitions, and persistent storage retention scenarios with end-to-end tests.',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2026-10-27',
    category: 'Testing',
    createdAt: '2026-10-15',
  },
  {
    id: 'task_008',
    title: 'Fix Dark Mode Contrast on Mobile Viewport',
    description: 'Resolve subtle border visibility issues and ensure seamless theme toggle transition animations across all devices.',
    priority: 'Urgent',
    status: 'Completed',
    dueDate: '2026-10-15',
    category: 'Frontend',
    createdAt: '2026-10-11',
  }
];

export const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'UI/UX',
  'Testing'
];

export const PRIORITIES = ['Urgent', 'High', 'Medium', 'Low'];

export const STATUSES = ['Pending', 'In Progress', 'Completed'];

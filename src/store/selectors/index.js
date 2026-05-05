import { createSelector } from 'reselect';

// Base selectors
const selectTasksState = state => state.entities.tasks;
const selectUsersState = state => state.entities.users;
const selectProjectsState = state => state.entities.projects;
const selectUiState = state => state.ui;
const selectOptimisticState = state => state.optimistic;

// Entities selectors
export const selectUsers = createSelector(
  [selectUsersState],
  (users) => users.allIds.map(id => users.byId[id])
);

export const selectProjects = createSelector(
  [selectProjectsState],
  (projects) => projects.allIds.map(id => projects.byId[id])
);

const selectAllBaseTasks = createSelector(
  [selectTasksState],
  (tasks) => tasks.allIds.map(id => tasks.byId[id])
);

// UI selectors
export const selectTaskFormState = createSelector(
  [selectUiState],
  (ui) => ui.taskForm
);

export const selectProjectUsers = createSelector(
  [selectUiState],
  (ui) => ui.projectUsers
);

export const selectFilters = createSelector(
  [selectUiState],
  (ui) => ui.filters
);

export const selectLoading = createSelector(
  [selectUiState],
  (ui) => ui.loading
);

export const selectErrors = createSelector(
  [selectUiState],
  (ui) => ui.errors
);

// Optimistic selectors
const selectPendingCreates = createSelector(
  [selectOptimisticState],
  (optimistic) => optimistic.pendingCreates
);

const selectPendingUpdates = createSelector(
  [selectOptimisticState],
  (optimistic) => optimistic.pendingUpdates
);

const selectPendingDeletes = createSelector(
  [selectOptimisticState],
  (optimistic) => optimistic.pendingDeletes
);

// Combined tasks selector (real + optimistic creates/updates - optimistic deletes)
export const selectAllTasks = createSelector(
  [selectAllBaseTasks, selectPendingCreates, selectPendingUpdates, selectPendingDeletes],
  (baseTasks, pendingCreates, pendingUpdates, pendingDeletes) => {
    // 1. Remove deleted tasks
    let tasks = baseTasks.filter(t => !pendingDeletes.includes(t.id));
    
    // 2. Apply updates
    tasks = tasks.map(t => pendingUpdates[t.id] ? { ...t, ...pendingUpdates[t.id], isOptimistic: true } : t);
    
    // 3. Add creates
    const optimisticCreates = pendingCreates.map(t => ({ ...t, isOptimistic: true }));
    
    return [...optimisticCreates, ...tasks];
  }
);

// Filtered tasks selector
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    let filteredTasks = [...tasks];

    if (filters.projectId) {
      filteredTasks = filteredTasks.filter(task => task.projectId === filters.projectId);
    }
    
    if (filters.assigneeId) {
      filteredTasks = filteredTasks.filter(task => task.assigneeId === filters.assigneeId);
    }
    
    if (filters.status && filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }
    
    if (filters.taskType && filters.taskType !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.taskType === filters.taskType);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    return filteredTasks;
  }
);

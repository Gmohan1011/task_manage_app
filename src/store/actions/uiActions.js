// UI action creators
// TODO: Implement UI state management actions

// Action Types
export const OPEN_TASK_FORM = 'OPEN_TASK_FORM';
export const CLOSE_TASK_FORM = 'CLOSE_TASK_FORM';
export const SET_FORM_MODE = 'SET_FORM_MODE';

export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const SET_SEARCH = 'SET_SEARCH';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const FETCH_PROJECT_USERS_REQUEST = 'FETCH_PROJECT_USERS_REQUEST';
export const FETCH_PROJECT_USERS_SUCCESS = 'FETCH_PROJECT_USERS_SUCCESS';
export const FETCH_PROJECT_USERS_FAILURE = 'FETCH_PROJECT_USERS_FAILURE';

// TODO: Implement action creators for UI state
// Requirements:
// 1. Task form management (open/close, mode)
// 2. Filter management
// 3. Loading states
// 4. Error handling

// TODO: Create action creators for form state, filters, loading, errors

export const openTaskForm = (mode = "create", task = null) => ({
  type: 'OPEN_TASK_FORM',
  payload: { mode, task }, // mode: create | edit
});

export const closeTaskForm = () => ({
  type: 'CLOSE_TASK_FORM',
});

export const setFormMode = (mode) => ({
  type: 'SET_FORM_MODE',
  payload: mode, // "create" | "edit"
});



// FILTERS

export const setFilters = (filters) => ({
  type: 'SET_FILTERS',
  payload: filters, // { status, type, assignee, etc }
});

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
});

export const setSearch = (searchText) => ({
  type: 'SET_SEARCH',
  payload: searchText,
});


// LOADING

export const setLoading = (value) => ({
  type: 'SET_LOADING',
  payload: value, // true / false
});



// ERROR

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error, // string
});

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});

export const fetchProjectUsersRequest = (projectId) => ({
  type: 'FETCH_PROJECT_USERS_REQUEST',
  payload: projectId,
});
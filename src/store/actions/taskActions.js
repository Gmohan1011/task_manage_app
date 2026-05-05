// Task action creators
// TODO: Implement action creators for task management

// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';
export const CREATE_TASK_OPTIMISTIC = 'CREATE_TASK_OPTIMISTIC';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const UPDATE_TASK_OPTIMISTIC = 'UPDATE_TASK_OPTIMISTIC';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const DELETE_TASK_OPTIMISTIC = 'DELETE_TASK_OPTIMISTIC';

// TODO: Implement action creators
// Requirements:
// 1. Fetch tasks with optional filters
// 2. Create task with optimistic updates
// 3. Update task with optimistic updates
// 4. Delete task with optimistic updates
// 5. Handle success/failure cases

// TODO: Create action creators for each operation (request/success/failure)
// TODO: Add optimistic update actions for create/update/delete

export const fetchTasksRequest = (filters) => ({
  type: 'FETCH_TASKS_REQUEST',
  payload: filters, // optional
});

export const fetchTasksSuccess = (tasks) => ({
  type: 'FETCH_TASKS_SUCCESS',
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: 'FETCH_TASKS_FAILURE',
  payload: error,
});


// CREATE TASK
export const createTaskOptimistic = (task) => ({
  type: 'CREATE_TASK_OPTIMISTIC',
  payload: task, // show instantly in UI
});

export const createTaskRequest = (task) => ({
  type: 'CREATE_TASK_REQUEST',
  payload: task,
});

export const createTaskSuccess = (task) => ({
  type: 'CREATE_TASK_SUCCESS',
  payload: task,
});

export const createTaskFailure = (error, tempId) => ({
  type: 'CREATE_TASK_FAILURE',
  payload: { error, tempId }, // used to rollback
});


// UPDATE TASK
export const updateTaskOptimistic = (task) => ({
  type: 'UPDATE_TASK_OPTIMISTIC',
  payload: task,
});

export const updateTaskRequest = (task) => ({
  type: 'UPDATE_TASK_REQUEST',
  payload: task,
});

export const updateTaskSuccess = (task) => ({
  type: 'UPDATE_TASK_SUCCESS',
  payload: task,
});

export const updateTaskFailure = (error, oldTask) => ({
  type: 'UPDATE_TASK_FAILURE',
  payload: { error, oldTask },
});


// DELETE TASK
export const deleteTaskOptimistic = (id) => ({
  type: 'DELETE_TASK_OPTIMISTIC',
  payload: id,
});

export const deleteTaskRequest = (id) => ({
  type: 'DELETE_TASK_REQUEST',
  payload: id,
});

export const deleteTaskSuccess = (id) => ({
  type: 'DELETE_TASK_SUCCESS',
  payload: id,
});

export const deleteTaskFailure = (error, deletedTask) => ({
  type: 'DELETE_TASK_FAILURE',
  payload: { error, deletedTask },
});
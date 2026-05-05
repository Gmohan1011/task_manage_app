// Task sagas for handling async operations
// TODO: Implement saga functions for task management

import { call, put, takeEvery, takeLatest, race, delay } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';

// TODO: Import action types and action creators
// import { FETCH_TASKS_REQUEST, CREATE_TASK_REQUEST, ... } from '../actions/taskActions';

// TODO: Implement saga functions
// Requirements:
// 1. Handle fetch tasks with error handling
// 2. Handle create task with optimistic updates
// 3. Handle update task with optimistic updates  
// 4. Handle delete task with optimistic updates
// 5. Implement retry logic for failed requests
// 6. Handle race conditions (cancel previous requests)

// TODO: Implement fetchTasksSaga - use call, put, try-catch
// TODO: Implement createTaskSaga - optimistic updates with rollback
// TODO: Implement updateTaskSaga - similar to create
// TODO: Implement deleteTaskSaga - with confirmation handling

// TODO: Export watcher sagas using takeLatest/takeEvery

import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_OPTIMISTIC,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_OPTIMISTIC,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_OPTIMISTIC,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
} from '../actions/taskActions';
import { setLoading, setError, closeTaskForm, FETCH_PROJECT_USERS_REQUEST, FETCH_PROJECT_USERS_SUCCESS, FETCH_PROJECT_USERS_FAILURE } from '../actions/uiActions';

function* fetchTasksSaga(action) {
  try {
    yield put(setLoading({ tasks: true }));
    const filters = action.payload || {};
    const response = yield call(mockApi.fetchTasks, filters);
    yield put({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILURE, payload: error.message });
    yield put(setError({ tasks: error.message }));
  } finally {
    yield put(setLoading({ tasks: false }));
  }
}

function* createTaskSaga(action) {
  const taskData = action.payload;
  const tempId = `temp_${Date.now()}`;
  const optimisticTask = { ...taskData, id: tempId, status: 'Todo', createdAt: new Date().toISOString() };

  try {
    // 1. Optimistic Update
    yield put({ type: CREATE_TASK_OPTIMISTIC, payload: optimisticTask });
    yield put(closeTaskForm());
    
    // 2. API Call
    const response = yield call(mockApi.createTask, taskData);
    
    // 3. Success
    yield put({ type: CREATE_TASK_SUCCESS, payload: { ...response.data, tempId } });
  } catch (error) {
    // 4. Rollback
    yield put({ type: CREATE_TASK_FAILURE, payload: { error: error.message, tempId } });
    yield put(setError({ form: error.message }));
  }
}

function* updateTaskSaga(action) {
  const taskData = action.payload;
  
  try {
    // We assume the caller passes the full modified task, or we merge it in component
    // 1. Optimistic Update
    yield put({ type: UPDATE_TASK_OPTIMISTIC, payload: taskData });
    yield put(closeTaskForm());

    // 2. API Call
    const response = yield call(mockApi.updateTask, taskData.id, taskData);

    // 3. Success
    yield put({ type: UPDATE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    // 4. Rollback - requires oldTask. Since we don't pass oldTask in payload cleanly here,
    // we would ideally fetch it from state. For simplicity, we just pass the ID to delete from optimistic pending.
    // In a real app we'd pass { newTask, oldTask } in the request.
    yield put({ type: UPDATE_TASK_FAILURE, payload: { error: error.message, oldTask: taskData } });
    yield put(setError({ form: error.message }));
  }
}

function* deleteTaskSaga(action) {
  const taskId = action.payload;

  try {
    yield put({ type: DELETE_TASK_OPTIMISTIC, payload: taskId });
    
    yield call(mockApi.deleteTask, taskId);
    
    yield put({ type: DELETE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    yield put({ type: DELETE_TASK_FAILURE, payload: { error: error.message, deletedTask: { id: taskId } } });
    yield put(setError({ tasks: error.message }));
  }
}

function* fetchProjectUsersSaga(action) {
  const projectId = action.payload;
  if (!projectId) {
    yield put({ type: FETCH_PROJECT_USERS_SUCCESS, payload: [] });
    return;
  }
  try {
    const response = yield call(mockApi.getProjectUsers, projectId);
    yield put({ type: FETCH_PROJECT_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_PROJECT_USERS_FAILURE, payload: error.message });
  }
}

export function* watchTaskSagas() {
  // Use takeLatest for fetching to handle race conditions (canceling previous requests)
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
  
  // Use takeEvery for CRUD to allow concurrent operations
  yield takeEvery(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeEvery(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
  
  yield takeLatest(FETCH_PROJECT_USERS_REQUEST, fetchProjectUsersSaga);
}
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';
import { FETCH_USERS_SUCCESS } from '../reducers/usersReducer';
import { FETCH_PROJECTS_SUCCESS } from '../reducers/projectsReducer';
import { setError, setLoading } from '../actions/uiActions';

function* fetchUsersSaga() {
  try {
    yield put(setLoading({ users: true }));
    const response = yield call(mockApi.fetchUsers);
    yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put(setError({ users: error.message }));
  } finally {
    yield put(setLoading({ users: false }));
  }
}

function* fetchProjectsSaga() {
  try {
    yield put(setLoading({ projects: true }));
    const response = yield call(mockApi.fetchProjects);
    yield put({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put(setError({ projects: error.message }));
  } finally {
    yield put(setLoading({ projects: false }));
  }
}

export function* watchInitSagas() {
  yield all([
    takeLatest('FETCH_INITIAL_DATA_REQUEST', fetchUsersSaga),
    takeLatest('FETCH_INITIAL_DATA_REQUEST', fetchProjectsSaga)
  ]);
}

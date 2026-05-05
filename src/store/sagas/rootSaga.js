import { all, fork } from 'redux-saga/effects';
import { watchTaskSagas } from './taskSagas';
import { watchInitSagas } from './initSagas';

export default function* rootSaga() {
  yield all([
    fork(watchTaskSagas),
    fork(watchInitSagas)
  ]);
}

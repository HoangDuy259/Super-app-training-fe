import { all } from 'redux-saga/effects';
import accountSaga from './accountSaga';
import transferSaga from './transferSaga';

export function* bankSaga() {
  yield all([accountSaga(), transferSaga()]);
}

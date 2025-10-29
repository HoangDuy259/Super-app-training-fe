import { all } from 'redux-saga/effects';
import accountSaga from './accountSaga';
import transferSaga from './transferSaga';
import transactionSaga from './transactionSaga';

export function* bankSaga() {
  yield all([accountSaga(), transferSaga(), transactionSaga()]);
}

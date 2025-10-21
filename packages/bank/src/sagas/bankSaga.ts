import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../store/slices/bankSlice';
import type { SagaIterator } from 'redux-saga';

function* fetchBanksSaga(): SagaIterator {
  try {
    const banks = yield call(bankApi.getBanks);
    yield put(fetchSuccess(banks));
  } catch (error: any) {
    yield put(fetchFailure(error.message));
  }
}

function* fetchTransactionHistorySaga(): SagaIterator {
  try{
    
  }catch(error: any) {

  }
}

export function* banksSaga() {
  yield takeLatest(fetchRequest.type, fetchBanksSaga);
  yield takeLatest(fetchRequest.type, fetchBanksSaga);
  // Thêm watchers khác nếu cần (search, etc.)
}

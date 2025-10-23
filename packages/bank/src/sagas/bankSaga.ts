import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  getAccountSuccess,
  getAccountFailure,
  getTransactionSuccess,
  getTransactionFailure,
  getAccountRequest,
  getTransactionRequest,
} from '../store/slices/bankSlice';
import type { SagaIterator } from 'redux-saga';


function* fetchBankAccountsSaga(action: ReturnType<typeof getAccountRequest>): SagaIterator {
  console.log('[SAGA] handleGetAccount called with:', action.payload);
  try {
    console.log('[SAGA] Calling API...');
    const userId = action.payload;
    const accounts = yield call(bankApi.getBankAccountsByUserId, userId);
    console.log('[SAGA] API Response:', accounts);

    yield put(getAccountSuccess(accounts));
    console.log('[SAGA] Dispatched getAccountSuccess');
  } catch (error: any) {
    console.log('[SAGA] API Error:', error);
    yield put(getAccountFailure(error));
  }
}

function* fetchTransactionsSaga(action: ReturnType<typeof getTransactionRequest>): SagaIterator {
  try {
    const accountId = action.payload;
    const transactions = yield call(
      bankApi.getTransactionsByAccountId,
      accountId,
    );
    console.log(transactions);
    yield put(getTransactionSuccess(transactions));
  } catch (error: any) {
    yield put(getTransactionFailure(error));
  }
}

export function* bankSaga() {
  yield takeLatest(getAccountRequest.type, fetchBankAccountsSaga);
  yield takeLatest(getTransactionRequest.type, fetchTransactionsSaga);
  // Thêm watchers khác nếu cần (search, etc.)
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  getAccountSuccess,
  getAccountFailure,
  getAccountRequest,
} from '../store/slices/accountSlice';
import type { SagaIterator } from 'redux-saga';

function* fetchBankAccountsSaga(
  action: ReturnType<typeof getAccountRequest>,
): SagaIterator {
  // console.log('[SAGA] handleGetAccount called with:', action.payload);
  try {
    // console.log('[SAGA] Calling API...');
    const userId = action.payload;
    const accounts = yield call(bankApi.getBankAccountsByUserId, userId);
    // console.log('[SAGA] API Response:', accounts);

    yield put(getAccountSuccess(accounts));
    // console.log('[SAGA] Dispatched getAccountSuccess');
  } catch (error: any) {
    console.log('[SAGA] API Error:', error);
    yield put(getAccountFailure(error));
  }
}


export default function* accountSaga() {
  yield takeLatest(getAccountRequest.type, fetchBankAccountsSaga);
  // Thêm watchers khác nếu cần (search, etc.)
}
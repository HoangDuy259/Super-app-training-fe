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
  try {
    const userId = action.payload;
    const accounts = yield call(bankApi.getBankAccountsByUserId, userId);
    yield put(getAccountSuccess(accounts));
  } catch (error: any) {
    console.log('[SAGA] API Error:', error);
    yield put(getAccountFailure(error));
  }
}

// function* lockAccountSaga(
//   action: ReturnType<typeof lockAccountRequest>,
// ): SagaIterator {
//   try {
//     const accounts = yield call(bankApi.getBankAccountsByUserId, userId);
//     yield put(getAccountSuccess(accounts));
//   } catch (error: any) {
//     console.log(error);
//     yield put();
//   }
// }

export default function* accountSaga() {
  yield takeLatest(getAccountRequest.type, fetchBankAccountsSaga);
  // Thêm watchers khác nếu cần (search, etc.)
}

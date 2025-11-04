import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  getAccountSuccess,
  getAccountFailure,
  getAccountRequest,
  handleAccountStatusRequest,
  handleAccountStatusSuccess,
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

function* handleAccountStatusSaga(
  action: ReturnType<typeof handleAccountStatusRequest>,
): SagaIterator {
  try {
    const {account, status} = action.payload;
    let result;
    if(status === 'ACTIVE'){
      console.log('status active');
      
      result = yield call(() => bankApi.lockAccount(account?.id!));
    }else if(status === 'INACTIVE'){
      console.log('status inactive');
      result = yield call(() => bankApi.unlockAccount(account?.id!));
    }
    console.log('[saga] result: ', result);
    
    yield put(handleAccountStatusSuccess(result));
  } catch (error: any) {
    console.log(error);
    yield put(error);
  }
}

export default function* accountSaga() {
  yield takeLatest(getAccountRequest.type, fetchBankAccountsSaga);
  yield takeLatest(handleAccountStatusRequest.type, handleAccountStatusSaga);
  // Thêm watchers khác nếu cần (search, etc.)
}

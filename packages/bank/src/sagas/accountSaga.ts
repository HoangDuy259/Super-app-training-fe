import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  getAccountSuccess,
  getAccountFailure,
  getAccountRequest,
  handleAccountStatusRequest,
  handleAccountStatusSuccess,
  createFirstAccountRequest,
  createFirstAccountSuccess,
  createFirstAccountFailure,
  searchAccountSuccess,
  suggestAccountSuccess,
  searchAccountFailure,
  searchAccountRequest,
  suggestAccountRequest,
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

function* createFirstAccountSaga(action: ReturnType<typeof createFirstAccountRequest>): SagaIterator{
  try{
    const response = yield call(() => bankApi.createAccount(action.payload));
    yield put(createFirstAccountSuccess(response))
  }catch(error: any){
    console.log(error);
    yield put(createFirstAccountFailure(error))
    
  }
}

function* searchAccountSaga(action: ReturnType<typeof searchAccountRequest>): SagaIterator {
  try {
    const { q, type } = action.payload;

    let result: string[] = [];

    if (type === 'contains') {
      result = yield call(bankApi.searchSimilarAccountNumbers, q);
    } else {
      result = yield call(bankApi.suggestAccountNumbers, q, 10);
    }

    if (type === 'contains') {
      yield put(searchAccountSuccess(result));
    } else {
      yield put(suggestAccountSuccess(result));
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Lỗi tìm kiếm tài khoản';
    yield put(searchAccountFailure(msg));
  }
}

function* suggestAccountSaga(action: ReturnType<typeof suggestAccountRequest>): SagaIterator {
  try {
    const result: string[] = yield call(bankApi.suggestAccountNumbers, action.payload, 10);
    console.log('saga, res: ', result);
    
    yield put(suggestAccountSuccess(result));
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Lỗi gợi ý số tài khoản';
    yield put(searchAccountFailure(msg));
  }
}

export default function* accountSaga() {
  yield takeLatest(getAccountRequest.type, fetchBankAccountsSaga);
  yield takeLatest(handleAccountStatusRequest.type, handleAccountStatusSaga);
  yield takeLatest(createFirstAccountRequest.type, createFirstAccountSaga);
  yield takeLatest(searchAccountRequest.type, searchAccountSaga);
  yield takeLatest(suggestAccountRequest.type, suggestAccountSaga);
  // Thêm watchers khác nếu cần (search, etc.)
}

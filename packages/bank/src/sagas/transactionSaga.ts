import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  createTransactionRequest,
  createTransactionSuccess,
  createTransactionFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  verifyTransferRequest,
  verifyTransferSuccess,
  verifyTransferFailure,
  // authenticateTransferRequest,
} from '../store/slices/transactionSlice';
import type { SagaIterator } from 'redux-saga';

function* fetchTransactionsByAccountId(
  action: ReturnType<typeof fetchTransactionsRequest>,
): SagaIterator {
  try {
    const response = yield call(
      bankApi.getTransactionsByAccountId,
      action.payload,
    );
    yield put(fetchTransactionsSuccess(response));
  } catch (error: any) {
    console.log('saga error', error);
    yield put(createTransactionFailure(error));
  }
}

function* createTransaction(
  action: ReturnType<typeof createTransactionRequest>,
): SagaIterator {
  try {
    
    const result = yield call(bankApi.transfer, action.payload);
    yield put(createTransactionSuccess(result));
  } catch (error: any) {
    yield put(createTransactionFailure(error.message));
  }
}

function* verifyTransferSaga(action: ReturnType<typeof verifyTransferRequest>): SagaIterator {
  try {
    const result: boolean = yield call(bankApi.authenticateTransfer, action.payload);
    yield put(verifyTransferSuccess(result));
  } catch (error: any) {
    yield put(verifyTransferFailure(error.message || 'Xác thực thất bại'));
  }
}


export default function* transferSaga() {
  yield takeLatest(fetchTransactionsRequest.type, fetchTransactionsByAccountId);
  yield takeLatest(createTransactionRequest.type, createTransaction);
  yield takeLatest(verifyTransferRequest.type, verifyTransferSaga);
}

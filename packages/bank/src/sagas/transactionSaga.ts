import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  createTransactionRequest,
  createTransactionSuccess,
  createTransactionFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
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
    const { auth, transfer } = action.payload;

    const isVerified: boolean = yield call(bankApi.authenticateTransfer, auth);
    
    if (!isVerified) {
      console.log('[saga] xác thực thất bại');
      yield put(createTransactionFailure('Xác thực thất bại'));
      return;
    }
    
    const result = yield call(bankApi.transfer, transfer);
    yield put(createTransactionSuccess(result));
  } catch (error: any) {
    yield put(createTransactionFailure(error.message));
  }
}

export default function* transferSaga() {
  yield takeLatest(fetchTransactionsRequest.type, fetchTransactionsByAccountId);
  yield takeLatest(createTransactionRequest.type, createTransaction);
}

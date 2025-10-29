import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  createTransactionRequest,
  createTransactionSuccess,
  createTransactionFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} from '../store/slices/transactionSlice';
import type { SagaIterator } from 'redux-saga';

function* fetchTransactionsByAccountId(
  action: ReturnType<typeof fetchTransactionsRequest>,
): SagaIterator {
  try {
    const accNum = action.payload;
    const destinationAccount = yield call(
      bankApi.findDestinationAccount,
      accNum,
    );
    console.log('[saga] des acc: ', destinationAccount);
    yield put(fetchTransactionsSuccess(destinationAccount));
  } catch (error: any) {
    console.log('[saga] failed: ', error);
    yield put(fetchTransactionsFailure(error));
  }
}

function* createTransaction(
  action: ReturnType<typeof createTransactionRequest>,
): SagaIterator {
  try {
    const response = yield call(bankApi.transfer, action.payload);
    yield put(createTransactionSuccess(response));
  } catch (error: any) {
    console.log(error);
    yield put(createTransactionFailure(error));
  }
}

export default function* transferSaga() {
  yield takeLatest(fetchTransactionsRequest.type, fetchTransactionsByAccountId);
  yield takeLatest(createTransactionRequest.type, createTransaction);
}

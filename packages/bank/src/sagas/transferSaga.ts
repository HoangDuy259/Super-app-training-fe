import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  findDestinationAccountRequest,
  findDestinationAccountFailure,
  findDestinationAccountSuccess,
} from '../store/slices/transferSlice';
import type { SagaIterator } from 'redux-saga';

function* findDestinationAccountSaga(
  action: ReturnType<typeof findDestinationAccountRequest>,
): SagaIterator {
  try {
    const accNum = action.payload;
    const destinationAccount = yield call(
      bankApi.findDestinationAccount,
      accNum,
    );
    console.log('[saga] des acc: ', destinationAccount);
    yield put(findDestinationAccountSuccess(destinationAccount));
  } catch (error: any) {
    console.log('[saga] failed: ', error);
    yield put(findDestinationAccountFailure(error));
  }
}

export default function* transferSaga() {
  yield takeLatest(
    findDestinationAccountRequest.type,
    findDestinationAccountSaga,
  );
}

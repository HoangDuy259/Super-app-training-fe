import { call, put, takeLatest } from 'redux-saga/effects';
import { bankApi } from '../api/bankApi'; // Api của bank
import {
  changePasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
} from '../store/slices/userSlice';
import type { SagaIterator } from 'redux-saga';
import { Alert } from 'react-native';

function* changePasswordSaga(
  action: ReturnType<typeof changePasswordRequest>,
): SagaIterator {
  try {
    const { email, newPassword, password } = action.payload;
    const verifyData = {
      email: email,
      password: password,
    };

    const isValid = yield call(bankApi.vertifyUser, verifyData);

    if (isValid) {
      const changePasswordData = {
        email: email,
        password: newPassword,
      };
      const response = yield call(() =>
        bankApi.changePassword(changePasswordData),
      );
      yield put(changePasswordSuccess(response));
      Alert.alert('Thành công', 'Đổi mật khẩu thành công');
    } else {
      Alert.alert('Lỗi', 'Không đúng mật khẩu hiện tại');
    }
  } catch (error: any) {
    Alert.alert('Lỗi', 'Không đúng mật khẩu hiện tại');

    console.log('không đổi password', error);
    yield put(changePasswordFailure(error));
  }
}

export default function* userSaga() {
  yield takeLatest(changePasswordRequest.type, changePasswordSaga);
}

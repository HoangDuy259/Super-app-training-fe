// src/features/auth/authSaga.ts
import {
  delay,
  select,
  all,
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logoutRequest,
  sendOtpRequest,
  changePasswordRequest,
  logoutSuccess,
  logoutFailure,
} from './authSlice';
import {
  login,
  signup,
  getUserInfo,
  sendOtp,
  changePassword,
  logout,
  refreshAccessToken,
} from '../../api/auth';
import { RootState } from '../../store/store';
import { Alert } from 'react-native';
import type { SagaIterator } from 'redux-saga';
import { hostSession } from '../../utils/hostStorage';
import { eventBus } from '../../../../shared-types/utils/eventBus';

// Worker saga cho đăng nhập
function* handleLogin(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const response = yield call(login, action.payload);
    console.log('[saga] response from api: ', response);
    yield call(hostSession.setTokens, response);
    const tokens = yield call(hostSession.getTokens);
    console.log('[saga] token from storage: ', tokens);
    const user = yield call(getUserInfo, tokens.accessToken);
    console.log('[saga] user from api', user);
    yield call(hostSession.setUser, user);
    const userStorage = yield call(hostSession.getUser);
    console.log('[saga] user from storage: ', userStorage);
    yield put(loginSuccess());
  } catch (error: any) {
    console.log('Login failed:', error.message);
    Alert.alert('Error', error.message || 'An unexpected error occurred');
    yield put(loginFailure());
  }
}

// Worker saga cho đăng ký
function* handleSignup(action: ReturnType<typeof signupRequest>) {
  try {
    yield call(signup, action.payload);
    yield put(signupSuccess());
    Alert.alert('Đăng ký thành công');
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Có lỗi xảy ra';
    yield put(signupFailure(message));
    Alert.alert('Đăng ký thất bại', message);
  }
}

function* handleLogoutSaga(action: ReturnType<typeof logoutRequest>) {
  try {
    yield call(logout, action.payload);
    yield call(hostSession.clearUser);
    yield call(hostSession.clearTokens);
    yield put(logoutSuccess());
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Có lỗi xảy ra';
    yield put(logoutFailure(message));
    Alert.alert('Đăng xuất thất bại', message);
  }
}

function* sendOtpSaga(action: ReturnType<typeof sendOtpRequest>) {
  try {
    yield call(sendOtp, action.payload);
  } catch (error: any) {
    console.log('send otp failed:', error.message);
  }
}

function* changePasswordSaga(action: ReturnType<typeof changePasswordRequest>) {
  try {
    yield call(changePassword, action.payload);
  } catch (error: any) {
    console.log('change password failed:', error.message);
  }
}

function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(sendOtpRequest.type, sendOtpSaga);
  yield takeLatest(changePasswordRequest.type, changePasswordSaga);
  yield takeLatest(logoutRequest.type, handleLogoutSaga);
}

// Xử lý tự động log out khi access token đã hết hạn
function* watchAccessTokenExpiry(): SagaIterator {
  while (true) {
    const state: RootState = yield select();
    const { expiresIn, refreshToken } = state.auth;

    if (!expiresIn || !refreshToken) {
      yield delay(5000);
      continue;
    }

    const now = Date.now();
    const timeLeft = expiresIn - now;

    if (timeLeft <= 0) {
      try {
        console.log('[AuthSaga] Access token expired → refreshing...');
        const newTokens = yield call(refreshAccessToken, refreshToken);
        yield call(hostSession.setTokens, newTokens);

        yield put(loginSuccess());

        // Bắn event để các remote cập nhật token
        eventBus.emit('TOKEN_UPDATED', newTokens);

        console.log('[AuthSaga] Token refreshed successfully');
      } catch (err: any) {
        console.error('[AuthSaga] Refresh failed:', err.message);
        // refresh token hết hạn hoặc lỗi → logout
        yield call(hostSession.clearTokens);
        yield put(logoutRequest(refreshToken));
      }
    } else {
      // refresh 5s trước khi hết hạn
      yield delay(Math.max(timeLeft - 5000, 1000));
    }
  }
}

// Root saga của feature auth
export function* authSaga() {
  yield all([fork(watchAuth), fork(watchAccessTokenExpiry)]);
}

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
} from './authSlice';
import { login, signup, refreshAccessToken, getUserInfo } from '../../api/auth';
import { RootState } from '../../store/store';
import { Alert } from 'react-native';
import type { SagaIterator } from 'redux-saga';
import { hostSession } from '../../utils/hostStorage';
import { eventBus } from '../../../../shared-types/utils/eventBus';

// Worker saga cho đăng nhập
function* handleLogin(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const response = yield call(login, action.payload);
    yield call(hostSession.setTokens, response);
    const tokens = yield call(hostSession.getTokens);
    // console.log('saved token: ', tokens.accessToken );
    const user = yield call(getUserInfo, tokens.accessToken);
    // console.log('user in saga: ',user);
    yield call(hostSession.setUser, user);
    yield put(
      loginSuccess(),
    );
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

  } catch (error: any) {
    console.log('Sign up failed:', error.message);
    // showError(error.message);
    yield put(signupFailure());
  }
}

function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}

// Xử lý tự động log out khi access token đã hết hạn
function* watchAccessTokenExpiry(): SagaIterator {
  while (true) {
    const state: RootState = yield select();
    const { expiresIn, refreshTokenExpiresIn, refreshToken } = state.auth;

    if (!expiresIn || !refreshTokenExpiresIn) {
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

        yield put(
          loginSuccess()
        );

        // 🔹 Bắn event để các remote cập nhật token
        eventBus.emit('TOKEN_UPDATED', newTokens);

        console.log('[AuthSaga] Token refreshed successfully');
      } catch (err: any) {
        console.error('[AuthSaga] Refresh failed:', err.message);
        // refresh token hết hạn hoặc lỗi → logout
        yield call(hostSession.clearTokens);
        yield put(logoutRequest());
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

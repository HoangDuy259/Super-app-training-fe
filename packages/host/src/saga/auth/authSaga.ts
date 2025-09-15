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
  logout,
} from './authSlice';
import { login, signup } from '../../api/auth';
import { getRefreshToken, saveRefreshToken } from './storage';
import { RootState } from '../../store/store';
import { Alert } from 'react-native';

// Worker saga cho đăng nhập
function* handleLogin(action: ReturnType<typeof loginRequest>) {
  const { email, password } = action.payload;
  console.log('loginRequest action received:' + email + ' ' + password);

  try {
    const response = yield call(login, action.payload);
    // yield call(saveRefreshToken, response.refreshToken);
    console.log('Login successful, response:', response);
    console.log('Expire in:', Date.now() + response.expiresIn * 1000);
    console.log('now: ', Date.now());
    console.log(
      'expire after: ',
      Date.now() + response.expiresIn * 1000 - Date.now(),
    );
    yield put(
      loginSuccess({
        accessToken: response.accessToken,
        expiresIn: response.expiresIn,
      }),
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
    showError(error.message);
    yield put(signupFailure());
  }
}

//Worker saga cho xử lý token hết hạn

// Watcher auth

function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}

// Xử lý tự động log out khi access token đã hết hạn
function* watchAccessTokenExpiry() {
  while (true) {
    const state: RootState = yield select();
    const { expiresIn } = state.auth;
    if (!expiresIn) {
      yield delay(5000);
      continue;
    }

    const now = Date.now();
    const timeLeft = expiresIn - now;

    if (timeLeft <= 0) {
      console.log('Token expired, logging out');
      yield put(logout());
    } else {
      // chờ cho đến 5s trước khi hết hạn
      yield delay(Math.max(timeLeft - 5000, 1000));
    }
  }
}

// Root saga của feature auth
export function* authSaga() {
  yield all([fork(watchAuth), fork(watchAccessTokenExpiry)]);
}

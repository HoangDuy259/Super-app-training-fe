// src/features/auth/authSaga.ts
import { all, takeLatest, call, put } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure, signupRequest } from "./authSlice";
import { login, LoginResponse } from "../../api/auth";

// Worker saga cho login
function* handleLogin(action: ReturnType<typeof loginRequest>) {
  const { email, password } = action.payload;
  console.log("loginRequest action received:" + email + " " + password);
  // Sau này sẽ thêm call API login ở đây
  try {
    const response: LoginResponse = yield call(login, action.payload);
    yield put(loginSuccess(response?.token));
  } catch (error: any) {
    yield put(loginFailure(error.message || "Login failed"));
  }
}

// Worker saga cho signup
// function* handleSignup(action: ReturnType<typeof signupRequest>) {
//   console.log("signupRequest action received:", action.payload);
//   // Sau này sẽ thêm call API signup ở đây
// }

// Watcher saga
function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
}

// Root saga của feature auth
export function* authSaga() {
  yield all([watchAuth()]);
}

// src/features/auth/authSaga.ts
import { all, takeLatest, call, put } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure, signupRequest, signupSuccess, signupFailure } from "./authSlice";
import { login, LoginResponse, signup } from "../../api/auth";

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
function* handleSignup(action: ReturnType<typeof signupRequest>) {
  try{
    yield call(signup, action.payload);
    yield put(signupSuccess())
  }catch(error: any){
    yield put(signupFailure(error.message || "Register failed"));
  }
}

// Watcher saga
function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}

// Root saga của feature auth
export function* authSaga() {
  yield all([watchAuth()]);
}

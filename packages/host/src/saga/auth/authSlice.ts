// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AuthState,
  ForgotPassword,
  LoginPayload,
  SignupPayload,
} from '../../../../shared-types';

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // LOGIN
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: state => {
      state.loading = false;
    },

    // SIGNUP
    signupRequest: (state, action: PayloadAction<SignupPayload>) => {
      state.loading = true;
    },
    signupSuccess: state => {
      state.loading = false;
    },
    signupFailure: state => {
      state.loading = false;
    },

    // send otp
    sendOtpRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    // change password
    changePasswordRequest(state, action: PayloadAction<ForgotPassword>) {
      state.loading = true;
    },

    // LOGOUT
    logoutRequest: state => {
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logoutRequest,
  sendOtpRequest,
  changePasswordRequest
} = authSlice.actions;

export default authSlice.reducer;

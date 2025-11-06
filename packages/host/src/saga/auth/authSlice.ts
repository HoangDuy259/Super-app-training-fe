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
  error: null
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
    signupSuccess: (state) => {
      state.loading = false;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload
    },

    // send otp
    sendOtpRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    // change password
    changePasswordRequest(state, action: PayloadAction<ForgotPassword>) {
      state.loading = true;
    },

    clearState(state){
      state.error = null;
      state.loading = false;
    },

    // LOGOUT
    logoutRequest: (state, action: PayloadAction<string>) => {
      state.loading = true
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action: PayloadAction<string>){
      state.error = action.payload;
      state.loading = false;
    }
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
  changePasswordRequest,
  clearState,
  logoutSuccess,
  logoutFailure
} = authSlice.actions;

export default authSlice.reducer;

// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AuthReponse,
  AuthState,
  LoginPayload,
  SignupPayload,
} from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  expiresIn: 0,
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
    loginSuccess: (state, action: PayloadAction<AuthReponse>) => {
      const { accessToken, expiresIn } = action.payload;
      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.expiresIn = Date.now() + expiresIn * 1000; // Lưu thời gian token hết hạn
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

    // LOGOUT
    logout: state => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.expiresIn = null;
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
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AuthResponse,
  AuthState,
  LoginPayload,
  SignupPayload,
} from '../../../../shared-types';

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
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
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
    logoutRequest: state => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.expiresIn = 0;
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
} = authSlice.actions;

export default authSlice.reducer;

// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AuthState,
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
} = authSlice.actions;

export default authSlice.reducer;

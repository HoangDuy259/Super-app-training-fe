// src/features/auth/types.ts

// State của auth
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Payload cho login
export interface LoginPayload {
  email: string;
  password: string;
}

// Payload cho signup
export interface SignupPayload {
  email: string;
  password: string;
}

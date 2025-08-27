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
// export interface SignupPayload {
//   email: string;
//   password: string;
// }

// type cho register request
export interface SignupPayload {
  email: string,
  userName: string,
  password: string,
  confirmPassword: string,
  phoneNum: string
}

// type cho register response
export interface SignupResponse {
  message: string
}
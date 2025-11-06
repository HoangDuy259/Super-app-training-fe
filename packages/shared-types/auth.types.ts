export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface SignupPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface ForgotPassword{
  email: string;
  newPassword: string;
  otp: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
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
  confirmPassword: string;
}
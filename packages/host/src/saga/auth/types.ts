// State của auth
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  loading: boolean;
  expiresIn: number | 0;
}

export interface AuthReponse {
  accessToken: string;
  expiresIn: number;
}

// Payload cho login
export interface LoginPayload {
  email: string;
  password: string;
}

// Payload cho signup
export interface SignupPayload {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  phoneNum: string;
}

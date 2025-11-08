export interface UserInfo {
  id: string;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
}

export interface UserUI {
  loading: boolean;
  error: string | null;
  isVerified: boolean;
}

export interface VerifyUserRequest {
  password: string;
  email: string;
}

export interface ChangePasswordRequest {
  password: string;
  email: string;
  newPassword: string;
}

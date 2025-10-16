import axios from 'axios';
import { LoginPayload, SignupPayload } from '../saga/auth/types';

export const API_URL = 'http://10.0.2.2:8080/superApp';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  console.log(response?.data);
  const result = response.data.result;
  if (result.accessToken) {
    throw new Error(' Access Token is missing in login response');
  }
  return {
    accessToken: result.accessToken,
    expiresIn: Number(result.expires_in),
    refreshToken: result.refresh_token,
    refreshTokenExpiresIn: result.refresh_expires_in
  };
};

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${API_URL}/auth/users/register`, data);
  if (!response.data) {
    throw new Error('Sigup Failed');
  }
  return response.data;
};

import axios from 'axios';
import { LoginPayload, SignupPayload } from '../saga/auth/types';

export const API_URL = 'http://10.0.2.2:8080';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth/users/login`,
    data,
  );
  console.log(response?.data);
  if (!response.data.accessToken) {
    throw new Error(' Access Token is missing in login response');
  }
  return response.data;
};

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${API_URL}/auth/users/register`, data);
  if (!response.data) {
    throw new Error('Sigup Failed');
  }
  return response.data;
};

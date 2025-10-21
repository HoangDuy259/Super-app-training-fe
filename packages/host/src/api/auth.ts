import axios from 'axios';
import { LoginPayload, LoginResponse, SignupPayload, UserInfo } from '../../../shared-types';

export const API_URL = 'http://10.0.2.2:8080/superApp';

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  // console.log("Prev return: ", response?.data);
  const result = response.data.result;
  // console.log('Prev result: ',result);
  
  if (!result.access_token) {
    throw new Error(' Access Token is missing in login response');
  }
  return {
    accessToken: result.access_token,
    expiresIn: Number(result.expires_in),
    refreshToken: result.refresh_token,
    refreshTokenExpiresIn: Number(result.refresh_expires_in)
  };
};

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${API_URL}/auth/users/register`, data);
  if (!response.data) {
    throw new Error('Sigup Failed');
  }
  return response.data;
};

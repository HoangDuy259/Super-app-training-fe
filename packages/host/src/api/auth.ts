import axios from 'axios';
import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  UserInfo,
} from '../../../shared-types';

export const API_URL = 'http://10.0.2.2:8080/superApp';

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  const result = response.data.result;

  if (!result.access_token) {
    throw new Error(' Access Token is missing in login response');
  }
  return {
    accessToken: result.access_token,
    expiresIn: Number(result.expires_in),
    refreshToken: result.refresh_token,
    refreshTokenExpiresIn: Number(result.refresh_expires_in),
  };
};

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${API_URL}/auth/users/register`, data);
  if (!response.data) {
    throw new Error('Sigup Failed');
  }
  return response.data;
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<LoginResponse> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', 'superapp');
  params.append('refresh_token', refreshToken);

  const res = await axios.post(
    'https://idp.example.com/realms/SuperApp/protocol/openid-connect/token',
    params,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return {
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
    expiresIn: Date.now() + res.data.expires_in * 1000,
    refreshTokenExpiresIn: Date.now() + res.data.refresh_expires_in * 1000,
  };
};

export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
  const res = await axios.get(`${API_URL}/user/get-user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const rs = res.data.result;
  return {
    id: rs.id,
    firstName: rs.firstName,
    lastName: rs.lastName,
    email: rs.email,
    username: rs.username,
  };
};

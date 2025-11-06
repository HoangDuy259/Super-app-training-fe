import axios from 'axios';
import {
  ForgotPassword,
  LoginPayload,
  LoginResponse,
  SignupPayload,
  UserInfo,
} from '../../../shared-types';

export const API_URL = 'http://10.0.2.2:8080/superApp';

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  console.log('[api]', data);
  
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
  console.log('api, data: ', data);
  
  const response = await axios.post<{messsage: string, result: SignupPayload}>(`${API_URL}/auth/register`, data);
  if (!response.data.result) {
    console.log('api error', response.data.messsage);
    throw new Error(response.data.messsage);
  }
  return response.data.result;
};


export const logout = async (refreshToken: string) => {
  console.log('[api] recieved refresh token ', refreshToken);
  
  const response = await axios.post(`${API_URL}/auth/logout?refreshToken=${refreshToken}`);
  console.log(response.status);
  
  if (response.status !== 200) {
    throw new Error('Đăng xuất không được');
  }
  return response.status === 200;
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

// send otp
export const sendOtp = async (email: string): Promise<boolean> => {
  console.log('[api] called');

  const res = await axios.post(`${API_URL}/auth/request-otp?email=${email}`);
  console.log('[api] res: ', res);

  return res.status === 200;
};
// change password
export const changePassword = async (
  data: ForgotPassword,
): Promise<boolean> => {
  console.log('[api] called', data);
  const {email, otp, newPassword} = data
  const res = await axios.post(`${API_URL}/auth/reset`, data);
  console.log('[api] res: ', res);

  return res.status === 200;
};

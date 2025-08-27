import axios from "axios";
import { SignupPayload  } from "../features/auth/types";

export const API_URL = "http://10.0.2.2:8080";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/users/login`, data);
  console.log(response);
  console.log(response?.data?.token);
  if (!response.data.token) {
    throw new Error("Token is missing in login response");
  }
  return response.data;
};

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${API_URL}/auth/users/register`, data);
  if(response.data){
    throw new Error("Sigup Failed");
  }
  return response.data;
}

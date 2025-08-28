// AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { loginRequest, signupRequest } from "../../features/auth/authSlice"; // action từ slice
import { SignupPayload } from "./types";

interface AuthContextData {
  logIn: (email: string, password: string) => void;
  signUp: (payload: SignupPayload) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  const logIn = (email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  };
  //--------------Duong đã đến từ đây--------------//
  const signUp = (payload: SignupPayload) => {
    dispatch(signupRequest(payload))
  };
  //--------------Duong đã kết thúc ở đây--------------//

  return <AuthContext.Provider value={{ logIn, signUp }}>{children}</AuthContext.Provider>;
};

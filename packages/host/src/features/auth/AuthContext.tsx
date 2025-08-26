// AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../features/auth/authSlice"; // action từ slice

interface AuthContextData {
  logIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
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
  const signUp = () => {};

  return <AuthContext.Provider value={{ logIn, signUp }}>{children}</AuthContext.Provider>;
};

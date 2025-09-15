// AuthContext.tsx
import React, { createContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, signupRequest, logout } from './authSlice'; // action từ slice
import { LoginPayload, SignupPayload } from './types';
import { RootState } from '../../store/store';

interface AuthContextData {
  logIn: (payload: LoginPayload) => void;
  signUp: (payload: SignupPayload) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

// Provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const logout = () => {
    console.log('Logging out');
    dispatch(logout());
  };

  const logIn = (payload: LoginPayload) => {
    dispatch(loginRequest(payload));
  };
  //--------------Duong đã đến từ đây--------------//
  const signUp = (payload: SignupPayload) => {
    dispatch(signupRequest(payload));
  };
  //--------------Duong đã kết thúc ở đây--------------//

  return (
    <AuthContext.Provider
      value={{ logIn, signUp, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

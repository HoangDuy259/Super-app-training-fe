// AuthContext.tsx
import React, { createContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, signupRequest, logoutRequest } from './authSlice'; // action từ slice
import { LoginPayload, SignupPayload } from '../../../../shared-types';
import { RootState } from '../../store/store';

interface AuthContextData {
  logIn: (payload: LoginPayload) => void;
  signUp: (payload: SignupPayload) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
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
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  const logout = () => {
    console.log('Logging out');
    dispatch(logoutRequest());
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
      value={{ logIn, signUp, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

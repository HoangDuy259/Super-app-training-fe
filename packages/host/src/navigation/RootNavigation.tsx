import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import MainNavigation from './MainNavigation';
import { AuthContext } from '../saga/auth/AuthContext';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

export type RootStackParamsList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainNavigation} />
        )}
      </Stack.Navigator>
  );
};

export default RootNavigation;

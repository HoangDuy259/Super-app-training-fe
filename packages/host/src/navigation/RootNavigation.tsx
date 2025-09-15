import React, { useContext, useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import MainNavigation from './MainNavigation';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../saga/auth/AuthContext';

export type RootStackParamsList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();
type NavigationProps = StackNavigationProp<RootStackParamsList>;

const RootNavigation = () => {
  const navigation = useNavigation<NavigationProps>();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('User not authenticated, navigating to login screen');

      navigation.navigate('Login');
    }
  }, [isAuthenticated]);

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MainNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

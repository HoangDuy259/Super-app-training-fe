import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import MainNavigation from './MainNavigation';
import BankScreen from '../screens/bank/BankScreen';
import { useNavigation } from '@react-navigation/native';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import { AuthContext } from '../features/auth/AuthContext';

export type RootStackParamsList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();
type NavigationProps = StackNavigationProp<RootStackParamsList>;

const RootNavigation = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated, isLoading } = useContext(AuthContext);
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

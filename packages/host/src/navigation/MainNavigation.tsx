import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BankScreen from '../screens/bank/BankScreen';
import AccountScreen from '../screens/AccountScreen';
import StockScreen from '../screens/StockScreen';
import BankNavigation from './BankNavigation';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../saga/auth/AuthContext';
import { login } from '../api/auth';

export type MainTabParamsList = {
  Home: undefined;
  Stock: undefined;
  Porfolio: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();
type NavigationProps = TabNavigationProp<MainTabParamsList>;

const MainNavigation = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={BankNavigation}
        options={{
          tabBarLabel: 'Trang chủ',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Stock"
        component={BankScreen}
        options={{
          tabBarLabel: 'Chứng khoán',
        }}
      />
      <Tab.Screen
        name="Porfolio"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Danh mục',
        }}
      />
      <Tab.Screen
        name="Account"
        component={StockScreen}
        options={{
          tabBarLabel: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

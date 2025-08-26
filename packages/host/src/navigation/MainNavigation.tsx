import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BankScreen from '../screens/bank/BankScreen';
import AccountScreen from '../screens/AccountScreen';
import StockScreen from '../screens/StockScreen';
import BankNavigation from './BankNavigation';

const Tab = createBottomTabNavigator();

// const Basic = React.lazy(() => import('bank/Basic'));

const MainNavigation = () => {
  console.log('MainNavigation');
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

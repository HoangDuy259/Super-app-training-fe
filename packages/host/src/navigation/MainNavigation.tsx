import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BankScreen from '../screens/bank/BankScreen';
import AccountScreen from '../screens/AccountScreen';
import StockScreen from '../screens/StockScreen';
import BankNavigation from './BankNavigation';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../saga/auth/AuthContext';
import { login } from '../api/auth';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#9500ffff', // Màu khi tab được focus
        tabBarInactiveTintColor: '#666', // Màu khi tab không focus
      }}
    >
      <Tab.Screen
        name="Home"
        component={BankNavigation}
        options={{
          tabBarLabel: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="house"
              size={16}
              color={focused ? '#ff9900ff' : '#666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stock"
        component={BankScreen}
        options={{
          tabBarLabel: 'Chứng khoán',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="chart-line"
              size={16}
              color={focused ? '#ff9900ff' : '#666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Porfolio"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Danh mục',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bookmark"
              size={16}
              color={focused ? '#ff9900ff' : '#666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={StockScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              size={16}
              color={focused ? '#ff9900ff' : '#666'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

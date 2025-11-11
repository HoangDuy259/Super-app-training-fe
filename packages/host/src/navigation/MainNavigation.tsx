import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import BankNavigation from '../../../bank/src/navigation/BankNavigation';
import StockScreen from '../screens/StockScreen';
import BankScreen from '../screens/bank/BankScreen';
import AccountScreen from '../../../bank/src/screens/account/AccountScreen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export type MainTabParamsList = {
  Home: undefined;
  Stock: undefined;
  Portfolio: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamsList>();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9500ff',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Home"
        component={BankScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ focused }) => (
            <Icon name="house" size={16} color={focused ? '#ff9900' : '#666'} />
          ),
        }}
        // options={({ route }) => {
        //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';

        //   // Danh sách các màn trong TransferFlow cần ẨN TAB
        //   const hideTabRoutes = [
        //     'FindDestinationAccount',
        //     'ConfirmCode',
        //     'TransactionStatus',
        //   ];

        //   const shouldHideTab = hideTabRoutes.some(name =>
        //     routeName.startsWith(name)
        //   );

        //   return {
        //     tabBarLabel: 'Trang chủ',
        //     tabBarIcon: ({ focused }) => (
        //       <Icon name="house" size={16} color={focused ? '#ff9900' : '#666'} />
        //     ),
        //     // ẨN TAB KHI VÀO TRANSFER FLOW
        //     tabBarStyle: shouldHideTab ? { display: 'none' } : undefined,
        //   };
        // }}
      />
      <Tab.Screen
        name="Stock"
        component={StockScreen}
        options={{
          tabBarLabel: 'Chứng khoán',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="chart-line"
              size={16}
              color={focused ? '#ff9900' : '#666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={StockScreen}
        options={{
          tabBarLabel: 'Danh mục',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bookmark"
              size={16}
              color={focused ? '#ff9900' : '#666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              size={16}
              color={focused ? '#ff9900' : '#666'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BankScreen from '../screens/bank/BankScreen';
import HeaderTab from '../components/HeaderTab';
import AccountScreen from '../screens/bank/Account/AccountScreen';
import DetailAccountScreen from '../screens/bank/Account/DetailAccountScreen';
import TransferScreen from '../screens/bank/Transfer/TransferScreen';
import TransferNumberAccountScreen from '../screens/bank/Transfer/TransferNumberAccountScreen';

const Stack = createStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderTab
              handleLeftBtn={() => navigation.goBack()}
              leftBtnIcon="chevron-left"
            >
              Tài khoản
            </HeaderTab>
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="DetailAccount"
        component={DetailAccountScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderTab
              handleLeftBtn={() => navigation.goBack()}
              leftBtnIcon="chevron-left"
            >
              Chi tiết tài khoản
            </HeaderTab>
          ),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function TransferStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderTab
              handleLeftBtn={() => navigation.goBack()}
              leftBtnIcon="chevron-left"
            >
              Chuyển tiền
            </HeaderTab>
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TransferNumberAccount"
        component={TransferNumberAccountScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderTab
              handleLeftBtn={() => navigation.goBack()}
              leftBtnIcon="chevron-left"
            >
              Chuyển tiền đến số tài khoản
            </HeaderTab>
          ),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

const BankNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bank"
        component={BankScreen}
        options={{
        //   header: ({ navigation }) => (
        //     <HeaderTab handleRightBtn={() => {}} rightBtnIcon="bell">
        //       Trang chủ
        //     </HeaderTab>
        //   ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BankNavigation;

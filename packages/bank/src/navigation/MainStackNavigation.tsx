import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BankScreen from '../screens/BankScreen';
import AccountScreen from '../screens/account/AccountScreen';
import DetailAccountScreen from '../screens/account/DetailAccountScreen';
import TransferScreen from '../screens/transfer/TransferScreen';
import TransferNumberAccountScreen from '../screens/transfer/TransferNumberAccountScreen';

const Stack = createStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="DetailAccount"
        component={DetailAccountScreen}
        options={{
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
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TransferNumberAccount"
        component={TransferNumberAccountScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

const MainStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bank"
        component={BankScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransferStack"
        component={TransferStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;

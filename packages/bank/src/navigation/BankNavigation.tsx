import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BankScreen from '../screens/BankScreen';
import AccountScreen from '../screens/account/AccountScreen';
import TransferNavigator from './TransferNavigator';
import TransactionHistoryScreen from '../screens/transaction/TransactionHistoryScreen';
import AccountDetailScreen from '../screens/account/AccountDetailScreen';

const Stack = createStackNavigator();

const BankNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bank" component={BankScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen name="TransferFlow" component={TransferNavigator} />
    </Stack.Navigator>
  );
};

export default BankNavigation;

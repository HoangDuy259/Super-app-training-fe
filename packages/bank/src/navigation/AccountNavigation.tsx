import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/account/AccountScreen';
import LockedAccountsScreen from '../screens/account/LockedAccountsScreen';

const Stack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="LockedAccounts" component={LockedAccountsScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;

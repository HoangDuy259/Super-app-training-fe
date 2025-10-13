import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseBankScreen from '../screens/transfer/ChooseBankScreen';
import InputAmountScreen from '../screens/transfer/InputAmountScreen';
import ConfirmCodeScreen from '../screens/transfer/ConfirmCodeScreen';
import TransactionStatusScreen from '../screens/transfer/TransactionStatusScreen';
import { TransferStackParamsList } from './bank.types';

const Stack = createStackNavigator<TransferStackParamsList>();

export default function TransferNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseBank" component={ChooseBankScreen} />
      <Stack.Screen name="InputAmount" component={InputAmountScreen} />
      <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
      <Stack.Screen
        name="TransactionStatus"
        component={TransactionStatusScreen}
      />
    </Stack.Navigator>
  );
}

import { View, Text } from 'react-native';
import React from 'react';
import Placeholder from '../../components/Placeholder';
import ErrorBoundary from '../../components/ErrorBoundary';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getRefreshToken } from '../../saga/auth/storage';

const Bank = React.lazy(() => import('bank/screens/BankScreen'));

const BankScreen = ({ navigation }) => {
  console.log('BankScreen');
  getRefreshToken().then(token => {
    console.log('BankScreen retrieved token:', token);
  });
  return (
    <ErrorBoundary name="BankScreen">
      <React.Suspense fallback={<Placeholder label="Bank" icon="bank" />}>
        <Bank navigation={navigation} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default BankScreen;

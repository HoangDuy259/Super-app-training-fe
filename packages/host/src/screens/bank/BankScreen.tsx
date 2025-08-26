import { View, Text } from 'react-native';
import React from 'react';
import Placeholder from '../../Components/Placeholder';
import ErrorBoundary from '../../Components/ErrorBoundary';

const Bank = React.lazy(() => import('bank/screens/BankScreen'));

const BankScreen = ({ navigation }) => {
  console.log('BankScreen');
  return (
    <ErrorBoundary name="BankScreen">
      <React.Suspense fallback={<Placeholder label="Bank" icon="bank" />}>
        <Bank navigation={navigation} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default BankScreen;

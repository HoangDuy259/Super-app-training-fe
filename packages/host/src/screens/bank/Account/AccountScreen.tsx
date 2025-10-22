import { View, Text } from 'react-native';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

const Account = React.lazy(() => import('bank/screens/AccountScreen'));

const AccountScreen = ({ navigation }) => {
  return (
    <ErrorBoundary name="AccountScreen">
      <React.Suspense
        fallback={<Placeholder label="Account" icon="money-check" />}
      >
        <Account navigation={navigation} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AccountScreen;

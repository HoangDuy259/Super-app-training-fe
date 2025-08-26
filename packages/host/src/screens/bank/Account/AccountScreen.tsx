import { View, Text } from 'react-native';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';
import React from 'react';

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

import { View, Text } from 'react-native';
import React from 'react';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';

const Transfer = React.lazy(() => import('bank/screens/TransferScreen'));

const TransferScreen = ({ navigation }) => {
  return (
    <ErrorBoundary name="TransferScreen">
      <React.Suspense
        fallback={<Placeholder label="Transfer" icon="money-bill-transfer" />}
      >
        <Transfer navigation={navigation} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default TransferScreen;

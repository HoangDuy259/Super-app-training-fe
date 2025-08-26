import { View, Text } from 'react-native';
import React from 'react';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';

const TransferDetail = React.lazy(
  () => import('bank/screens/TransferNumberAccountScreen'),
);

const TransferNumberAccountScreen = () => {
  return (
    <ErrorBoundary name="TransferNumberAccountScreen">
      <React.Suspense
        fallback={<Placeholder label="Transfer" icon="money-bill-transfer" />}
      >
        <TransferDetail />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default TransferNumberAccountScreen;

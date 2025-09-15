import { View, Text } from 'react-native';
import React from 'react';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';

const DetailAccount = React.lazy(
  () => import('bank/screens/DetailAccountScreen'),
);

const DetailAccountScreen = () => {
  return (
    <ErrorBoundary name="DetailAccountScreen">
      <React.Suspense
        fallback={<Placeholder label="Detail Account" icon="money-check" />}
      >
        <DetailAccount />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default DetailAccountScreen;

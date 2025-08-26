import { View, Text } from 'react-native';
import React from 'react';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';

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

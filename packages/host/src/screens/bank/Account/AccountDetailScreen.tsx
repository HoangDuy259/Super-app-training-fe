import React from 'react';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';

const AccountDetail = React.lazy(
  () => import('bank/screens/AccountDetailScreen'),
);

const AccountDetailScreen = () => {
  return (
    <ErrorBoundary name="AccountDetailScreen">
      <React.Suspense
        fallback={<Placeholder label="Account Detail" icon="money-check" />}
      >
        <AccountDetail />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AccountDetailScreen;

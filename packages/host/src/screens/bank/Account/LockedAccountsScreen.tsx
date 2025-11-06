import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';
import React from 'react';

const LockedAccounts = React.lazy(() => import('bank/screens/LockedAccountsScreen'));

const LockedAccountsScreen = () => {
  return (
    <ErrorBoundary name="LockedAccountScreen">
      <React.Suspense
        fallback={<Placeholder label="LockedAccount" icon="money-check" />}
      >
        <LockedAccounts />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LockedAccountsScreen;

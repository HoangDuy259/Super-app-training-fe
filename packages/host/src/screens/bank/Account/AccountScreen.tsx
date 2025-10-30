import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';
import React from 'react';

const Account = React.lazy(() => import('bank/screens/AccountScreen'));

const AccountScreen = () => {
  return (
    <ErrorBoundary name="AccountScreen">
      <React.Suspense
        fallback={<Placeholder label="Account" icon="money-check" />}
      >
        <Account />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AccountScreen;

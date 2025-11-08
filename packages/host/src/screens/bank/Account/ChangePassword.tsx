import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';
import React from 'react';

const ChangePassword = React.lazy(() => import('bank/screens/ChangePasswordScreen'));

const ChangePasswordScreen = () => {
  return (
    <ErrorBoundary name="LockedAccountScreen">
      <React.Suspense
        fallback={<Placeholder label="LockedAccount" icon="money-check" />}
      >
        <ChangePassword />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ChangePasswordScreen;
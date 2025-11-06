import ErrorBoundary from '../../../components/ErrorBoundary';
import Placeholder from '../../../components/Placeholder';
import React, { useEffect, useState } from 'react';
import { injectReducer, runSaga } from '../../../store/store';

const Account = React.lazy(() => import('bank/screens/AccountScreen'));
// const RemoteAccountNavigation = React.lazy(
//   () => import('bank/navigation/AccountNavigation'),
// );

const AccountScreen = () => {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('[Host] Injecting Account module...');
        const { default: accountReducer } = await import('bank/store/accountSlice');
        injectReducer('accountUI', accountReducer);

        const { bankSaga } = await import('bank/sagas');
        runSaga(bankSaga);

        console.log('[Host] Account module injected!');
        setIsReady(true);
      } catch (err) {
        console.error('Failed to inject account module:', err);
      }
    };
    init();
  }, []);

  if (!isReady) {
    return <Placeholder label="Đang tải tài khoản..." icon="money-check" />;
  }

  const RemoteAccountNavigation = React.lazy(() => 
    import('bank/navigation/AccountNavigation')
  );

  return (
    <ErrorBoundary name="AccountScreen">
      <React.Suspense
        fallback={<Placeholder label="Account" icon="money-check" />}
      >
        <RemoteAccountNavigation />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AccountScreen;

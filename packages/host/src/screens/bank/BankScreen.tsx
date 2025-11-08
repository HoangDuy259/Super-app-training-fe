import React, { useEffect } from 'react';
import Placeholder from '../../components/Placeholder';
import ErrorBoundary from '../../components/ErrorBoundary';
import { injectReducer, runSaga } from '../../store/store';

const RemoteBankNavigation = React.lazy(
  () => import('bank/navigation/BankNavigation'),
);

const BankScreen = () => {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    async function initBankModule() {
      try {
        console.log('[Host] Loading Bank Redux Module...');
        const { default: accountReducer } = await import(
          'bank/store/accountSlice'
        );
        const { default: transferReducer } = await import(
          'bank/store/transferSlice'
        );
        const { default: transactionSlice } = await import(
          'bank/store/transactionSlice'
        );
        const { default: userSlice } = await import(
          'bank/store/userSlice'
        );
        const { bankSaga } = await import('bank/sagas');
        injectReducer('accountUI', accountReducer);
        injectReducer('transferUI', transferReducer);
        injectReducer('transactionUI', transactionSlice);
        injectReducer('userUI', userSlice);
        runSaga(bankSaga);
        console.log('[Host] Bank Redux injected SUCCESS!');
        setIsReady(true);
      } catch (error) {
        console.error('Failed to load bank module:', error);
      }
    }
    initBankModule();
  }, []);

  if (!isReady) return <Placeholder label="Loading Bank..." icon="bank" />;

  return (
    <ErrorBoundary name="BankScreen">
      <React.Suspense fallback={<Placeholder label="Bank" icon="bank" />}>
        <RemoteBankNavigation />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default BankScreen;

import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Placeholder from '../../components/Placeholder';
import ErrorBoundary from '../../components/ErrorBoundary';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../../../../bank/src/navigation/bank.types';
import { injectReducer, runSaga } from '../../store/store';
import { sessionStorage } from '../../utils/sessionStorage';

console.log('[Host] Importing Bank remote...');
const Bank = React.lazy(() => import('bank/screens/BankScreen'));

type BankScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'Bank'
>;

interface BankScreenProps {
  navigation: BankScreenNavigationProp;
}

const BankScreen = ({ navigation }: BankScreenProps) => {
  console.log('[BankScreen] Rendered');
  // useEffect(() => {
  //   async function initBankModule() {
  //     try {
  //       // load và inject banks slice/saga
  //       const { default: banksReducer } = await import('bank/bankSlice');
  //       const { banksSaga } = await import('bank/bankSaga');
  //       injectReducer('banks', banksReducer);
  //       runSaga(banksSaga);

  //       // tương tự cho accounts
  //       // const { default: accountsReducer } = await import('bank/accountsSlice');
  //       // const { accountsSaga } = await import('bank/accountsSaga');
  //       // injectReducer('accounts', accountsReducer);
  //       // runSaga(accountsSaga);

  //       // tương tự cho transaction
  //       // const { default: transactionReducer } = await import('bank/transactionSlice');
  //       // const { transactionSaga } = await import('bank/transactionSaga');
  //       // injectReducer('transaction', transactionReducer);
  //       // runSaga(transactionSaga);
  //     } catch (error) {
  //       console.error('Failed to load bank module:', error);
  //     }
  //   }
  // },[]);

  return (
    <ErrorBoundary name="BankScreen">
      <React.Suspense fallback={<Placeholder label="Bank" icon="bank" />}>
        <Bank navigation={navigation} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default BankScreen;

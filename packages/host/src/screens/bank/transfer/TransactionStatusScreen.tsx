import React from 'react';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TransferStackParamsList } from '../../../../../bank/src/navigation/bank.types';

const TransactionStatus = React.lazy(() => import('bank/screens/transfer/TransactionStatusScreen'));

type TransactionStatusNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'TransactionStatus'
>;

type TransactionStatusRouteProp = RouteProp<TransferStackParamsList, 'TransactionStatus'>;

interface TransactionStatusScreenProps {
  navigation: TransactionStatusNavigationProp;
  route: TransactionStatusRouteProp;
}

const TransactionStatusScreen = ({ navigation, route }: TransactionStatusScreenProps) => {
  return (
    <ErrorBoundary name="TransactionStatusScreen">
      <React.Suspense fallback={<Placeholder label="Transaction Status" icon="circle-check" />}>
        <TransactionStatus navigation={navigation} route={route} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default TransactionStatusScreen;

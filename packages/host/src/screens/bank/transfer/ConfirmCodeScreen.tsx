import React from 'react';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TransferStackParamsList } from '../../../../../bank/src/navigation/bank.types';

const ConfirmCode = React.lazy(() => import('bank/screens/transfer/ConfirmCodeScreen'));

type ConfirmCodeScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'ConfirmCode'
>;

type ConfirmCodeScreenRouteProp = RouteProp<TransferStackParamsList, 'ConfirmCode'>;

interface ConfirmCodeScreenProps {
  navigation: ConfirmCodeScreenNavigationProp;
  route: ConfirmCodeScreenRouteProp;
}

const ConfirmCodeScreen = ({ navigation, route }: ConfirmCodeScreenProps) => {
  return (
    <ErrorBoundary name="ConfirmCodeScreen">
      <React.Suspense fallback={<Placeholder label="Confirm Code" icon="key" />}>
        <ConfirmCode navigation={navigation} route={route} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ConfirmCodeScreen;

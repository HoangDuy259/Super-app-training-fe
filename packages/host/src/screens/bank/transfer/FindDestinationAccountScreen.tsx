import React from 'react';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TransferStackParamsList } from '../../../../../bank/src/navigation/bank.types';

const FindDestinationAccount = React.lazy(() => import('bank/screens/transfer/FindDestinationAccountScreen'));

type FindDestinationAccountScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'FindDestinationAccount'
>;

type FindDestinationAccountScreenRouteProp = RouteProp<TransferStackParamsList, 'FindDestinationAccount'>;

interface FindDestinationAccountScreenProps {
  navigation: FindDestinationAccountScreenNavigationProp;
  route: FindDestinationAccountScreenRouteProp;
}

const FindDestinationAccountScreen = ({ navigation, route }: FindDestinationAccountScreenProps) => {
  return (
    <ErrorBoundary name="FindDestinationAccountScreen">
      <React.Suspense fallback={<Placeholder label="Find Destination Account" icon="key" />}>
        <FindDestinationAccount navigation={navigation} route={route} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default FindDestinationAccountScreen;

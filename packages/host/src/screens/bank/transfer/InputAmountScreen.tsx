import React from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import Placeholder from '../../components/Placeholder';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TransferStackParamsList } from '../../navigation/TransferNavigator';

const InputAmount = React.lazy(() => import('bank/screens/transfer/InputAmountScreen'));

type InputAmountScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'InputAmount'
>;

type InputAmountScreenRouteProp = RouteProp<TransferStackParamsList, 'InputAmount'>;

interface InputAmountScreenProps {
  navigation: InputAmountScreenNavigationProp;
  route: InputAmountScreenRouteProp;
}

const InputAmountScreen = ({ navigation, route }: InputAmountScreenProps) => {
  return (
    <ErrorBoundary name="InputAmountScreen">
      <React.Suspense fallback={<Placeholder label="Input Amount" icon="money-bill" />}>
        <InputAmount navigation={navigation} route={route} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default InputAmountScreen;

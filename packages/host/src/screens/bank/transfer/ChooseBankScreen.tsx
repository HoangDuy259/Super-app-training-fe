import React from 'react';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Placeholder from '../../../Components/Placeholder';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamsList } from '../../../../../bank/src/navigation/bank.types';

const ChooseBank = React.lazy(() => import('bank/screens/transfer/ChooseBankScreen'));

type ChooseBankScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'ChooseBank'
>;

interface ChooseBankScreenProps {
  navigation: ChooseBankScreenNavigationProp;
}

const ChooseBankScreen = ({ navigation }: ChooseBankScreenProps) => {
  return (
    <ErrorBoundary name="ChooseBankScreen">
      <React.Suspense fallback={<Placeholder label="Choose Bank" icon="bank" />}>
        <ChooseBank navigation={navigation} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ChooseBankScreen;

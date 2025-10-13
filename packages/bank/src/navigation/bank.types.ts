import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type BankStackParamsList = {
  Bank: undefined;
  Account: { accountId: string };
  TransactionHistory: { accountId: string };
  TransferFlow: { fromAccountId: string };
};

export type TransferStackParamsList = {
  ChooseBank: { fromAccountId: string };
  InputAmount: { toAccountId: string };
  ConfirmCode: { amount: number; toAccountId: string };
  TransactionStatus: { success: boolean; transactionId: string };
};
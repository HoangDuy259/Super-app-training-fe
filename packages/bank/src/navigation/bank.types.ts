export type BankStackParamsList = {
  Bank: undefined;
  Account: { accountId: string };
  TransactionHistory: { accountId: string };
  TransferFlow: undefined;
};

export type TransferStackParamsList = {
  ChooseBank: { fromAccountId: string };
  FindDestinationAccount: { toBankId: string }
  InputAmount: { toAccountId: string };
  ConfirmCode: undefined;
  TransactionStatus: undefined;
}
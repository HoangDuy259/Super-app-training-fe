export type BankStackParamsList = {
  Bank: undefined;
  AccountDetail: undefined;
  Account: { accountId: string };
  TransactionHistory: undefined;
  TransferFlow: undefined;
};

export type TransferStackParamsList = {
  ChooseBank: { fromAccountId: string };
  FindDestinationAccount: { toBankId: string }
  ConfirmCode: undefined;
  TransactionStatus: undefined;
}
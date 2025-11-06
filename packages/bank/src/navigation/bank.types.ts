export type BankStackParamsList = {
  Bank: undefined;
  AccountDetail: undefined;
  // Account: undefined;
  TransactionHistory: undefined;
  TransferFlow: undefined;
  // LockedAccounts: undefined;
};

export type AccountStackParamsList = {
  Account: undefined;
  LockedAccounts: undefined;
}

export type TransferStackParamsList = {
  ChooseBank: { fromAccountId: string };
  FindDestinationAccount: { toBankId: string }
  ConfirmCode: undefined;
  TransactionStatus: undefined;
}
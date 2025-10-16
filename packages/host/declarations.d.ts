// khai báo cho TypeScript biết các module remote, tránh lỗi cant found module

// bank/transfer
declare module 'bank/screens/BankScreen';
declare module 'bank/screens/transfer/TransactionStatusScreen';
declare module 'bank/screens/transfer/FindDestinationAccountScreen'
declare module 'bank/screens/transfer/ChooseBankScreen';
declare module 'bank/screens/transfer/InputAmountScreen';
declare module 'bank/screens/transfer/ConfirmCodeScreen';
// bank/account
declare module 'bank/screens/account/AccountScreen';

// thêm các module khác ở đây

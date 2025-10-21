// khai báo cho TypeScript biết các module remote, tránh lỗi cant found module

// screen/bank/transfer
declare module 'bank/screens/BankScreen';
declare module 'bank/screens/transfer/TransactionStatusScreen';
declare module 'bank/screens/transfer/FindDestinationAccountScreen'
declare module 'bank/screens/transfer/ChooseBankScreen';
declare module 'bank/screens/transfer/InputAmountScreen';
declare module 'bank/screens/transfer/ConfirmCodeScreen';
// screen/bank/account
declare module 'bank/screens/account/AccountScreen';
// slices:
declare module 'bank/bankSlice'
// sagas:
declare module 'bank/bankSaga'
// thêm các module khác ở đây

// khai báo cho TypeScript biết các module remote, tránh lỗi cant found module

// bank module navigation
declare module 'bank/navigation/BankNavigation'
declare module 'bank/navigation/AccountNavigation'
// screen/bank/transfer
declare module 'bank/screens/BankScreen';
declare module 'bank/screens/transfer/TransactionStatusScreen';
declare module 'bank/screens/transfer/FindDestinationAccountScreen'
declare module 'bank/screens/transfer/ChooseBankScreen';
declare module 'bank/screens/transfer/ConfirmCodeScreen';
// screen/bank/account
declare module 'bank/screens/account/AccountScreen';
declare module 'bank/screens/LockedAccountsScreen';
declare module 'bank/screens/ChangePasswordScreen';

// slices:
declare module 'bank/store/transferSlice'
declare module 'bank/store/accountSlice'
declare module 'bank/store/transactionSlice'
declare module 'bank/store/userSlice'
// sagas:
declare module 'bank/sagas'
// thêm các module khác ở đây

// screen account:
declare module 'bank/screens/AccountScreen'
declare module 'bank/screens/AccountDetailScreen'
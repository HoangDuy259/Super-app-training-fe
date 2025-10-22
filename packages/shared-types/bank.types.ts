// BanksState
export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface BanksState {
  list: Bank[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
  bankAccount: BankAccount[];
}

// AccountsState
export interface BankAccount {
  id: string;
  accountNumber: string;
  balance: number;
  status: string;
}

// export interface AccountsState {
//   userAccounts: Account[];
//   destinationAccounts: Account[];
//   selectedSource: string | null;
//   selectedDestination: string | null;
//   loading: boolean;
//   error: string | null;
// }

// TransactionState
// export interface TransactionDraft {
//   amount: number;
//   content: string;
//   bankId: string;
//   sourceAccountId: string;
//   destinationAccount: Account;
// }

// export interface TransactionState {
//   draft: TransactionDraft | null;
//   backendResponse: any | null;
//   loading: boolean;
//   error: string | null;
// }
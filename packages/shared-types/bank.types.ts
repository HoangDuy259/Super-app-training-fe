import { AccountStatus } from "./enums/AccountStatus.enum";
import { TransactionType } from "./enums/TransactionType.enum";
import { TransactionStatus } from "./enums/TransactionStatus.enum";

// BanksState
export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface BankState {
  accounts: BankAccount[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

// AccountsState
export interface BankAccount {
  id: string;
  accountNumber: string;
  balance: number;
  status: AccountStatus;
}

export interface Transaction {
  amount: number;
  sourceAccountId: string;
  destinationAccountId: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  description: string;
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

// export interface TransactionState {
//   draft: TransactionDraft | null;
//   backendResponse: any | null;
//   loading: boolean;
//   error: string | null;
// }

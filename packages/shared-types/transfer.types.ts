import { TransactionType } from "./enums/TransactionType.enum";
import { TransactionStatus } from "./enums/TransactionStatus.enum";
import { BankAccount } from "./account.types";

export interface Transaction {
  amount: number;
  sourceAccountId: string;
  destinationAccountId: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  description: string;
}

export interface TransferState {
  selectedAccount: BankAccount | null;
  destinationAccount: BankAccount | null;
  loading: boolean;
  error: string | null;
}
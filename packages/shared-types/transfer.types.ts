import { TransactionType } from "./enums/TransactionType.enum";
import { TransactionStatus } from "./enums/TransactionStatus.enum";
import { BankAccount } from "./account.types";

export interface Transaction {
  amount: number;
  sourceAccountNumber: string;
  destinationAccountNumber: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  description: string;
  createdDate: string;
}

export interface TransactionState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  loading: boolean,
  error: string | null;
}

export interface TransferState {
  // selectedAccount: BankAccount | null;
  destinationAccount: BankAccount | null;
  amount: number;
  note: string;
  loading: boolean;
  error: string | null;
}

export interface TransferRequest {
  fromAccountId: string | null;
  toAccountId: string | null;
  amount: number;
  description: string;
}

export interface AuthenticateRequest {
  email: string | null;
  password: string | null;
}

export interface CreateTransactionPayload {
  auth: AuthenticateRequest;
  transfer: TransferRequest;
}
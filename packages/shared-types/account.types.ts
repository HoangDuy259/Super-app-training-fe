import { AccountStatus } from "./enums/AccountStatus.enum";
import { UserInfo } from "./user.types";

export interface BankAccount {
  id: string;
  accountNumber: string;
  balance: number;
  status: AccountStatus;
  createdDate: string;
  user: UserInfo;
}

export interface AccountUIState {
  accounts: BankAccount[];
  loading: boolean;
  error: string | null;
}
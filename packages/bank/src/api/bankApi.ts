import { BankAccount, Transaction, TransferRequest } from '../../../shared-types';
import apiClient from './apiClient';

export const bankApi = {
  // get bank account by user id
  async getBankAccountsByUserId(userId: string): Promise<BankAccount[]> {
    const response = await apiClient.get<{
      message: string;
      result: BankAccount[];
    }>(`bank-accounts/user/${userId}`);

    return response.data.result || [];
  },

  // get transaction by account id
  async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const response = await apiClient.get<{
      message: string;
      result: Transaction[];
    }>(`/bank-transaction/${accountId}`);

    return response.data.result || [];
  },

  // find beneficiary account
  async findDestinationAccount(accNum: string): Promise<BankAccount> {
    const response = await apiClient.get<{
      message: string;
      result: BankAccount;
    }>(`bank-accounts/find?accNum=${accNum}`);
    return response.data.result || {};
  },

  // transfer 
  async transfer(data: TransferRequest): Promise<Transaction> {
    const response = await apiClient.post<{
      message: string;
      result: Transaction;
    }>(`bank-transaction/transfer`, data);
    return response.data.result;
  }
};

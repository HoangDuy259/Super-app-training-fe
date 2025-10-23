import { BankAccount, Transaction } from '../../../shared-types';
import apiClient from './apiClient';


export const bankApi = {

  async getBankAccountsByUserId(userId: string): Promise<BankAccount[]> {
    const response = await apiClient.get<{
      message: string;
      result: BankAccount[];
    }>(`bank-accounts/user/${userId}`);
    
    return response.data.result || [];
  },

  async getTransactionsByAccountId(accountId: string): Promise<Transaction[]>{
    const response = await apiClient.get<{
      message: string;
      result: Transaction[]
    }>(`/bank-transaction/${accountId}`)

    return response.data.result || [];
  }
};

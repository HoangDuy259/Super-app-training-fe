import {
  AuthenticateRequest,
  BankAccount,
  Transaction,
  TransferRequest,
} from '../../../shared-types';
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
    console.log('[api] data: ', data);
    
    const response = await apiClient.post<{
      message: string;
      result: Transaction;
    }>(`bank-transaction/transfer`, data);
    return response.data.result;
  },

  // lock account
  async lockAccount(accountId: string): Promise<BankAccount> {
    const response = await apiClient.patch<{
      message: string;
      result: BankAccount;
    }>(`bank-accounts/${accountId}/lock`);
    return response.data.result;
  },

  // unlock account
  async unlockAccount(accountId: string): Promise<BankAccount> {
    const response = await apiClient.patch<{
      message: string;
      result: BankAccount;
    }>(`bank-accounts/${accountId}/unlock`);
    return response.data.result;
  },

  // authenticate account
  async authenticateTransfer(data: AuthenticateRequest): Promise<boolean> {
    const response = await apiClient.post(`auth/login`, data);
    console.log('[api] res: ', response);
    
    return response.status === 200;
  }
};

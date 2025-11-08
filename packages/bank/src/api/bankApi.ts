import {
  BankAccount,
  ChangePasswordRequest,
  Transaction,
  TransferRequest,
  VerifyUserRequest,
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
  async vertifyUser(data: VerifyUserRequest): Promise<boolean> {
    const response = await apiClient.post(`auth/verify`, data);
    console.log('api response ', response);

    return response.status === 200;
  },

  // changpassword
  async changePassword(data: VerifyUserRequest): Promise<boolean> {
    const response = await apiClient.post(`user/change-password`, data);
    return response.status === 200;
  },

  // create bank account
  async createAccount(accessToken: string): Promise<BankAccount> {
    const response = await apiClient.post<{
      message: string;
      result: BankAccount;
    }>(
      'bank-accounts',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.result;
  },

  // GỢI Ý SỐ Đay
  async suggestAccountNumbers(prefix: string, count: number = 10): Promise<string[]> {
    const response = await apiClient.get(`bank-accounts/suggest`, {
      params: { prefix, count },
    });
    
    return response.data || [];
  },

  // TÌM SỐ GẦN GIỐNG
  async searchSimilarAccountNumbers(q: string): Promise<string[]> {
    const response = await apiClient.get(`bank-accounts/search`, {
      params: { q },
    });
    return response.data || [];
  },
};

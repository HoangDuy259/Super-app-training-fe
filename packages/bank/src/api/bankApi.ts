import axios from 'axios';
import { BankAccount } from '../../../shared-types';
// Kiểu dữ liệu mô tả 1 bank
export interface Bank {
  id: string;
  name: string;
  code: string;
  logo?: string;
}

// Tạo instance axios chung (nếu bạn chưa có file apiClient.ts)
const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8080/superApp',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm gọi API lấy danh sách bank
export const bankApi = {
  async getBanks(): Promise<Bank[]> {
    const response = await apiClient.get<Bank[]>('/banks');
    return response.data;
  },

  async getBankAccountsByUserId(userId: string): Promise<BankAccount[]> {
    const response = await apiClient.get<{
      message: string;
      result: BankAccount[];
    }>(`bank-accounts/user/${userId}`);
    
    return response.data.result || [];
  }
};

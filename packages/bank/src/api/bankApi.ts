import axios from 'axios';

// Kiểu dữ liệu mô tả 1 bank
export interface Bank {
  id: string;
  name: string;
  code: string;
  logo?: string;
}

// Tạo instance axios chung (nếu bạn chưa có file apiClient.ts)
const apiClient = axios.create({
  baseURL: 'localhost:8080',
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
};

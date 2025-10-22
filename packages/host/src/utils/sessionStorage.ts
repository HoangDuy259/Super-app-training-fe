import EncryptedStorage from 'react-native-encrypted-storage';
import { LoginResponse, UserInfo } from '../../../shared-types';

export const sessionStorage = {
  async setTokens(tokens: LoginResponse) {
    await EncryptedStorage.setItem('auth_tokens', JSON.stringify(tokens));
  },

  async getTokens() {
    console.log('[sessionStorage] getTokens called');
    const raw = await EncryptedStorage.getItem('auth_tokens');
    console.log('[sessionStorage] raw:', raw);
    return raw ? JSON.parse(raw) : null;
  },

  async clearTokens() {
    await EncryptedStorage.removeItem('auth_tokens');
  },

  async setUser(user: UserInfo) {
    await EncryptedStorage.setItem('user_info', JSON.stringify(user));
  },

  async getUser() {
    const raw = await EncryptedStorage.getItem('user_info');
    return raw ? JSON.parse(raw) : null;
  },

  async clearUser() {
    await EncryptedStorage.removeItem('user_info');
  },

  async clearAll() {
    await EncryptedStorage.clear();
  },
};

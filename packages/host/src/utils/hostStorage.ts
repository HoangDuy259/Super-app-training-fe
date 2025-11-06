import EncryptedStorage from 'react-native-encrypted-storage';
import { LoginResponse, UserInfo } from '../../../shared-types';
import { eventBus } from '../../../shared-types/utils/eventBus';

export const hostSession = {
  async setTokens(tokens: LoginResponse) {
    await EncryptedStorage.setItem('auth_tokens', JSON.stringify(tokens));
    eventBus.emit('TOKEN_UPDATED', tokens);
  },

  async getTokens() {
    const raw = await EncryptedStorage.getItem('auth_tokens');
    return raw ? JSON.parse(raw) : null;
  },

  async clearTokens() {
    try {
      console.log('[hostSession] START clearTokens');
      await EncryptedStorage.removeItem('auth_tokens');
      console.log('[hostSession] SUCCESS clearTokens');
      eventBus.emit('TOKEN_CLEARED');
    } catch (error) {
      console.error('[hostSession] ERROR clearTokens:', error);
    }
  },

  async setUser(user: UserInfo) {
    await EncryptedStorage.setItem('user_info', JSON.stringify(user));
    eventBus.emit('USER_UPDATED', user);
  },
  async getUser() {
    const raw = await EncryptedStorage.getItem('user_info');
    return raw ? JSON.parse(raw) : null;
  },

  async clearUser() {
    try {
      console.log('[hostSession] START clearUser');
      await EncryptedStorage.removeItem('user_info');
      console.log('[hostSession] SUCCESS clearUser');
      eventBus.emit('USER_CLEARED');
    } catch (error) {
      console.error('[hostSession] ERROR clearUser:', error);
    }
  },
};

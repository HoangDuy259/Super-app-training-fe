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
    await EncryptedStorage.removeItem('auth_tokens');
    eventBus.emit('TOKEN_CLEARED');
  },

  async setUser(user: UserInfo) {
    await EncryptedStorage.setItem('user_info', JSON.stringify(user));
    eventBus.emit('USER_UPDATED', user);
  },

  async clearUser() {
    await EncryptedStorage.removeItem('user_info');
    eventBus.emit('USER_CLEARED');
  },
};

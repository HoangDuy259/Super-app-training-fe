import EncryptedStorage from 'react-native-encrypted-storage';
import { eventBus } from '../../../../shared-types/utils/eventBus';
import { LoginResponse, UserInfo } from '../../../../shared-types';

let currentToken: LoginResponse | null = null;
let currentUser: UserInfo | null = null;

eventBus.on('TOKEN_UPDATED', (tokens: LoginResponse) => {
  currentToken = tokens;
  console.log('[remoteSession] Token updated via eventBus');
});

eventBus.on('TOKEN_CLEARED', () => {
  currentToken = null;
  console.log('[remoteSession] Token cleared via eventBus');
});

export const remoteStorage = {
  async getTokens(): Promise<LoginResponse | null> {
    if (!currentToken) {
      const raw = await EncryptedStorage.getItem('auth_tokens');
      currentToken = raw ? JSON.parse(raw) : null;
    }
    return currentToken;
  },

  async getUser(): Promise<UserInfo | null> {
    if (!currentUser) {
      const raw = await EncryptedStorage.getItem('user_info');
      currentUser = raw ? JSON.parse(raw) : null;
    }
    return currentUser;
  },

  async fetchWithAuth(url: string, options?: RequestInit): Promise<Response> {
    const tokens = await this.getTokens();
    const accessToken = tokens?.accessToken;
    const headers = {
      ...(options?.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    let res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      console.log('[remoteSession] 401 detected, waiting for refresh...');
      await new Promise((r) => setTimeout(r, 500));
      const newTokens = await this.getTokens();
      const newAccessToken = newTokens?.accessToken;
      if (newAccessToken && newAccessToken !== accessToken) {
        res = await fetch(url, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${newAccessToken}` },
        });
      }
    }
    return res;
  },
};

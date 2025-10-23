import axios from 'axios';
import { remoteStorage } from '../store/storage/remoteStorage';

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8080/superApp',
  headers: { 'Content-Type': 'application/json' },
});

// ✅ MAGIC: AUTO ADD TOKEN
apiClient.interceptors.request.use(async (config) => {
  const tokens = await remoteStorage.getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

export default apiClient;
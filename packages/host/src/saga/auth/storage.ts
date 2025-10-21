import EncryptedStorage from 'react-native-encrypted-storage';
import { UserInfo } from '../../../../shared-types';

// /**
//  * Lưu refresh token vào EncryptedStorage
//  * @param {string} token - refresh token nhận từ server
//  */
// export async function saveRefreshToken(token: string) {
//   try {
//     await EncryptedStorage.setItem(
//       'refresh_token', // key
//       token, // value
//     );
//     console.log('Refresh token saved securely!');
//   } catch (error) {
//     console.error('Save failed:', error);
//   }
// }

// /**
//  * Lấy refresh token từ EncryptedStorage
//  * @returns {string|null} refresh token hoặc null nếu chưa có
//  */
// export async function getRefreshToken() {
//   try {
//     const token = await EncryptedStorage.getItem('refresh_token');
//     if (token !== null) {
//       console.log('Got refresh token:', token);
//       return token;
//     }
//     console.log('Can not get token from host');
//     return null;
//   } catch (error) {
//     console.error('Read failed:', error);
//     return null;
//   }
// }

// /**
//  * Xóa refresh token khi logout
//  */
// export async function clearRefreshToken() {
//   try {
//     await EncryptedStorage.removeItem('refresh_token');
//     console.log('Refresh token cleared!');
//   } catch (error) {
//     console.error('Clear failed:', error);
//   }
// }

export const sessionStorage = {
  async saveUser(user: UserInfo) {
    await EncryptedStorage.setItem('user_info', JSON.stringify(user));
  }, 
  async getUser(): Promise<UserInfo | null> {
    const json = await EncryptedStorage.getItem('user_info');
    return json ? JSON.parse(json) : null;
  },
  async clearUser() {
    await EncryptedStorage.removeItem('user_info');
  },
};

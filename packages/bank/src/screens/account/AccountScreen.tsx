import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AccountStackParamsList,
  BankStackParamsList,
} from '../../navigation/bank.types';
import { remoteStorage } from '../../store/storage/remoteStorage';
import { LoginResponse, UserInfo } from '../../../../shared-types';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../../../host/src/saga/auth/authSlice';
import { hostSession } from '../../../../host/src/utils/hostStorage';

type AccountScreenNavigationProp = StackNavigationProp<
  AccountStackParamsList,
  'Account'
>;

interface AccountScreenProps {
  navigation: AccountScreenNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    paddingVertical: 12,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Color.boldLine,
  },
  headerTitle: {
    color: Color.primaryText,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 20,
  },
  btnClose: {
    position: 'absolute',
    right: 12,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.primaryText,
  },

  // Info Section
  infoSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: Color.lightLine,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: Color.subText,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.primaryText,
    textAlign: 'right',
    flex: 1,
  },

  // Action Section
  actionSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.lightLine,
  },
  logoutButton: {
    borderColor: Color.danger + '40',
    backgroundColor: Color.danger + '08',
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: Color.primary,
  },
});

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [tokens, setTokens] = useState<LoginResponse | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await remoteStorage.getUser();
      const authInfo = await remoteStorage.getTokens();
      setUser(userInfo);
      setTokens(authInfo);
    };
    fetchUserInfo();
  }, []);

  // handlers
  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            dispatch(logoutRequest(tokens?.refreshToken!));
            hostSession.clearUser();
            hostSession.clearTokens();
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THÔNG TIN CÁ NHÂN</Text>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={28} color={Color.primaryText} />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* Avatar + Tên */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Icon name="user" size={40} color={Color.whiteText} />
          </View>
          <Text style={styles.username}>{user?.username}</Text>
        </View>

        {/* Thông tin */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="user-circle" size={18} color={Color.subText} />
            <Text style={styles.infoLabel}>Họ và tên</Text>
            <Text style={styles.infoValue}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="envelope" size={18} color={Color.subText} />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Icon name="key" size={18} color={Color.primary} />
            <Text style={styles.actionText}>Đổi mật khẩu</Text>
            <Icon name="chevron-right" size={16} color={Color.subText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('LockedAccounts')}
          >
            <Icon name="lock" size={18} color={Color.primary} />
            <Text style={styles.actionText}>Tài khoản đã khóa</Text>
            <Icon name="chevron-right" size={16} color={Color.subText} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NewAccount')}
          >
            <Icon name="plus" size={18} color={Color.primary} />
            <Text style={styles.actionText}>Tạo tài khoản</Text>
            <Icon name="chevron-right" size={16} color={Color.subText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Icon
              name="arrow-right-from-bracket"
              size={18}
              color={Color.danger}
            />
            <Text style={[styles.actionText, { color: Color.danger }]}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

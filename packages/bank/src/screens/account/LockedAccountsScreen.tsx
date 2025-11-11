import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Color from '../../themes/Color';
import {
  AccountStackParamsList,
  BankStackParamsList,
} from '../../navigation/bank.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { handleAccountStatusRequest } from '../../store/slices/accountSlice';
import { BankAccount } from '../../../../shared-types';

type LockedAccountScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'LockedAccounts'
>;

interface LockedAccountScreenProps {
  navigation: LockedAccountScreenNavigationProp;
}

const LockedAccountsScreen = ({ navigation }: LockedAccountScreenProps) => {
  // Dữ liệu mẫu – bạn sẽ thay bằng props hoặc state thật
  // const { accounts } = useSelector((state: RootState) => state.accountUI);
  const dispatch = useDispatch();

  const lockedAccounts = useSelector(
    (state: RootState) =>
      state.accountUI.accounts.filter(acc => acc.status === 'INACTIVE'),
    shallowEqual,
  );

  const handleUnlock = (acc: BankAccount) => {
    if (!acc) return;

    const req = {
      account: acc,
      status: acc.status,
    };

    // Nếu tài khoản còn tiền và đang hoạt động
    // if (acc.balance > 0 && acc.status === 'ACTIVE') {
    //   Alert.alert(
    //     'Cảnh báo',
    //     'Số dư trong tài khoản vẫn còn, bạn có chắc muốn khóa thẻ?',
    //     [
    //       { text: 'Hủy', style: 'cancel' },
    //       {
    //         text: 'Xác nhận',
    //         style: 'destructive',
    //         onPress: () => {
    //           dispatch(handleAccountStatusRequest(req));
    //         },
    //       },
    //     ],
    //     { cancelable: true },
    //   );
    // }
    // else {
    dispatch(handleAccountStatusRequest(req));
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header cố định */}
      <View style={styles.header}>
        <Text
          style={{
            color: Color.primaryText,
            fontWeight: '700',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 20,
          }}
        >
          TÀI KHOẢN BỊ KHÓA
        </Text>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={28} color={Color.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Danh sách cuộn */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {lockedAccounts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có tài khoản bị khóa</Text>
          </View>
        ) : (
          lockedAccounts.map(acc => (
            <View key={acc.id} style={styles.accountItem}>
              <View style={styles.accountInfo}>
                <Text style={styles.label}>Số tài khoản</Text>
                <Text style={styles.accountNumber}>{acc.accountNumber}</Text>
                <Text style={styles.label}>Số dư</Text>
                <Text style={styles.accountBalance}>{acc.balance} VND</Text>
              </View>

              <TouchableOpacity
                style={styles.unlockButton}
                onPress={() => handleUnlock(acc)}
              >
                <Text style={styles.unlockButtonText}>Mở khóa</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Color.whiteText,
  },

  // === HEADER ===
  header: {
    position: 'relative',
    paddingVertical: 12,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Color.boldLine,
  },

  btnClose: {
    position: 'absolute',
    right: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.whiteText,
  },

  // === CONTENT ===
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  accountItem: {
    backgroundColor: Color.whiteText,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.lightLine,
  },

  accountInfo: {
    flex: 1,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.primaryText,
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: Color.subText,
    marginBottom: 4,
  },
  accountBalance: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.primaryText,
  },

  unlockButton: {
    backgroundColor: Color.success,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  unlockButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // === EMPTY STATE ===
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Color.subText,
    fontStyle: 'italic',
  },
});

export default LockedAccountsScreen;

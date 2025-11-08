import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { formatCurrency, formatDate } from '../../utils/formatter';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../../navigation/bank.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import { handleAccountStatusRequest } from '../../store/slices/accountSlice';

type AccountDetailScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'AccountDetail'
>;

interface AccountDetailScreenProps {
  navigation: AccountDetailScreenNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'relative',
    paddingVertical: 12,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Color.boldLine,
    backgroundColor: '#fff',
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

  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cardList: {
    gap: 16,
  },

  // CARD
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Color.lightLine,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.primaryText,
    letterSpacing: 1.2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: Color.subText,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.primary,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: Color.subText,
  },
  infoValue: {
    fontSize: 14,
    color: Color.primaryText,
    fontWeight: '500',
  },

  // Action Button
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Color.subText,
  },
});

const AccountDetail = ({ navigation }: AccountDetailScreenProps) => {
  const { currentAccount } = useSelector(
    (state: RootState) => state.accountUI || {},
  );
  const isActive = currentAccount?.status === 'ACTIVE';
  const statusColor = isActive ? Color.success : Color.danger;
  const statusText = isActive ? 'Hoạt động' : 'Bị khóa';
  const buttonText = isActive ? 'Khóa tài khoản' : 'Mở khóa';
  const buttonColor = isActive ? Color.danger : Color.success;

  const dispatch = useDispatch();

  const handleAccountStatus = () => {
    if (!currentAccount) return;

    const req = {
      account: currentAccount,
      status: currentAccount.status,
    };

    // Nếu tài khoản còn tiền và đang hoạt động
    if (currentAccount.balance > 0 && currentAccount.status === 'ACTIVE') {
      Alert.alert(
        'Cảnh báo',
        'Số dư trong tài khoản vẫn còn, bạn có chắc muốn khóa thẻ?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Xác nhận',
            style: 'destructive',
            onPress: () => {
              dispatch(handleAccountStatusRequest(req));
              navigation.replace('Bank');
            },
          },
        ],
        { cancelable: true },
      );
    } else {
      dispatch(handleAccountStatusRequest(req));
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QUẢN LÝ TÀI KHOẢN</Text>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={28} color={Color.primaryText} />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.scrollContent}>
        <View style={styles.cardList}>
          <View style={styles.card}>
            {/* Header card: Số tài khoản */}
            <View style={styles.cardHeader}>
              <Text style={styles.accountNumber}>
                {currentAccount?.accountNumber}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColor + '20' },
                ]}
              >
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {statusText}
                </Text>
              </View>
            </View>

            {/* Số dư */}
            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>Số dư</Text>
              <Text style={styles.balanceAmount}>
                {formatCurrency(currentAccount?.balance!)}
              </Text>
            </View>

            {/* Thông tin phụ */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày tạo</Text>
              <Text style={styles.infoValue}>
                {formatDate(currentAccount?.createdDate!)}
              </Text>
            </View>

            {/* Nút hành động */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: buttonColor + '15',
                  borderColor: buttonColor,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => {
                handleAccountStatus();
              }}
            >
              <Icon
                name={isActive ? 'lock' : 'lock-open'}
                size={18}
                color={buttonColor}
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonText, { color: buttonColor }]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountDetail;

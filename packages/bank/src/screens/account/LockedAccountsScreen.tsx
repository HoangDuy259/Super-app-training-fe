import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Color from '../../themes/Color';
import { AccountStackParamsList, BankStackParamsList } from '../../navigation/bank.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import Icon from 'react-native-vector-icons/FontAwesome6';


type LockedAccountScreenNavigationProp = StackNavigationProp<
  AccountStackParamsList,
  'LockedAccounts'
>;

interface LockedAccountScreenProps {
  navigation: LockedAccountScreenNavigationProp;
}

const LockedAccountsScreen = ({navigation}: LockedAccountScreenProps) => {
  // Dữ liệu mẫu – bạn sẽ thay bằng props hoặc state thật
  const { accounts } = useSelector((state: RootState) => state.accountUI);

  const lockedAccounts = useCallback(() => {
    return accounts.filter(acc => acc.status === 'INACTIVE');
  }, [accounts]);

  const handleUnlock = (id: string) => {
    
    console.log('Mở khóa tài khoản:', id);
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
        {lockedAccounts().length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có tài khoản bị khóa</Text>
          </View>
        ) : (
          lockedAccounts().map(acc => (
            <View key={acc.id} style={styles.accountItem}>
              <View style={styles.accountInfo}>
                <Text style={styles.accountNumber}>{acc.accountNumber}</Text>
                <Text style={styles.accountBalance}>{acc.balance} VND</Text>
              </View>

              <TouchableOpacity
                style={styles.unlockButton}
                onPress={() => handleUnlock(acc.id)}
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
    backgroundColor: Color.lightBg,
  },

  // === HEADER ===
  header: {
    height: 70,
    backgroundColor: Color.boldBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.boldLine,
    paddingTop: 10,
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
    backgroundColor: Color.opacityBg,
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
    color: Color.whiteText,
    marginBottom: 4,
  },
  accountBalance: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.whiteText,
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

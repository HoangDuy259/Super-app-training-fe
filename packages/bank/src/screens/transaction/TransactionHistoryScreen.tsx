import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../../navigation/bank.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import { formatDate, formatTime } from '../../utils/formatter';
import { fetchTransactionsRequest } from '../../store/slices/transactionSlice';

type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'TransactionHistory'
>;

interface TransactionHistoryScreenProps {
  navigation: TransactionHistoryScreenNavigationProp;
}

const TransactionItem = ({ item, currentAccountNumber }: { item: any; currentAccountNumber: string | undefined }) => {
  const isIn = item.destinationAccountNumber === currentAccountNumber;
  const amountText = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.amount);
  const title = item.description || (isIn ? 'Nhận tiền chuyển khoản' : 'Chuyển tiền');

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: isIn
                ? Color.success + '20'
                : Color.danger + '20',
            },
          ]}
        >
          <Icon
            name={isIn ? 'arrow-down' : 'arrow-up'}
            size={16}
            color={isIn ? Color.success : Color.danger}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.transactionTime}>
            {formatTime(item.createdDate)}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: isIn ? Color.success : Color.danger },
          ]}
        >
          {isIn ? '+' : '-'} {amountText}
        </Text>
        {item.status === 'SUCCESS' && (
          <Icon
            name="check-circle"
            size={14}
            color={Color.success}
            style={styles.statusIcon}
          />
        )}
      </View>
    </View>
  );
};

const TransactionHistoryScreen = ({
  navigation,
}: TransactionHistoryScreenProps) => {
  const { transactions, loading } = useSelector(
    (state: RootState) => state.transactionUI || {},
  );
  const {selectedAccount} = useSelector((state: RootState) => state.transferUI || {})
  const dispatch = useDispatch();

  console.log('[history]: selected acc: ', selectedAccount);
  console.log('[history]: transaction: ', transactions);

  useEffect(() => {
    
    dispatch(fetchTransactionsRequest(selectedAccount?.id!))
  }, [selectedAccount])
  

  const grouped = groupTransactions(transactions);
  if (loading) return <Text>Đang loading ...</Text>;
  return (
    <View style={styles.container}>
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
          LỊCH SỬ GIAO DỊCH
        </Text>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={28} color={Color.primaryText} />
        </TouchableOpacity>
      </View>

      {/* CONTENT - ScrollView */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {grouped.map((group, idx) => (
          <View key={idx} style={styles.dateGroup}>
            <Text style={styles.dateLabel}>{group.date}</Text>
            {group.items.map((item: any) => (
              <TransactionItem key={item.id} item={item} currentAccountNumber={selectedAccount?.accountNumber} />
            ))}
          </View>
        ))}

        {/* Empty state (nếu không có giao dịch) */}
        {transactions.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="history" size={48} color={Color.subText} />
            <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const groupTransactions = (list: any[]) => {
  const map: any = {};
  list.forEach(t => {
    const d = formatDate(t.createdDate);
    if (!map[d]) map[d] = [];
    map[d].push(t);
  });
  return Object.keys(map)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map(d => ({ date: d, items: map[d] }));
};

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
  btnClose: {
    position: 'absolute',
    right: 12,
  },

  // Scroll Content
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Date Group
  dateGroup: {
    marginTop: 20,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.subText,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 4,
  },

  // Transaction Item
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderColor: Color.lightLine,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.primaryText,
    lineHeight: 20,
  },
  transactionTime: {
    fontSize: 13,
    color: Color.subText,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusIcon: {
    marginTop: 4,
  },

  // Empty State
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

export default TransactionHistoryScreen;

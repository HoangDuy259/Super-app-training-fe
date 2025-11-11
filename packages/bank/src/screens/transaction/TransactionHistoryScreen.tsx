import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import { format } from 'date-fns';
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

// === COMPONENT: Transaction Item (giữ nguyên) ===
const TransactionItem = ({
  item,
  currentAccountNumber,
}: {
  item: any;
  currentAccountNumber: string | undefined;
}) => {
  const isIn = item.destinationAccountNumber === currentAccountNumber;
  const amountText = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(item.amount);
  const title =
    item.description || (isIn ? 'Nhận tiền chuyển khoản' : 'Chuyển tiền');

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
        {item.status === 'FAILED' && (
          <Icon
            name="xmark-circle"
            size={14}
            color={Color.danger}
            style={styles.statusIcon}
          />
        )}
        {item.status === 'PENDING' && (
          <Icon
            name="clock"
            size={14}
            color={Color.warning}
            style={styles.statusIcon}
          />
        )}
      </View>
    </View>
  );
};

// === MAIN SCREEN ===
const TransactionHistoryScreen = ({
  navigation,
}: TransactionHistoryScreenProps) => {
  const { transactions, loading } = useSelector(
    (state: RootState) => state.transactionUI || {},
  );
  const { currentAccount } = useSelector((state: RootState) => state.accountUI);
  const dispatch = useDispatch();

  // === FILTER STATES ===
  const [filterVisible, setFilterVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [selectingFor, setSelectingFor] = useState<'from' | 'to' | null>(null);

  useEffect(() => {
    dispatch(fetchTransactionsRequest(currentAccount?.id!));
  }, [currentAccount]);

  // === FILTER LOGIC (bạn sẽ dùng để filter transactions) ===
  const filteredTransactions = transactions.filter((t: any) => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (fromDate && new Date(t.createdDate) < fromDate) return false;
    if (toDate && new Date(t.createdDate) > toDate) return false;
    return true;
  });

  // chọn ngày
  const openDatePicker = (type: 'from' | 'to') => {
    setSelectingFor(type);
    setTempDate(type === 'from' ? fromDate : toDate);
    setShowDateModal(true);
  };

  const applyDate = () => {
    if (tempDate && selectingFor) {
      if (selectingFor === 'from') setFromDate(tempDate);
      else setToDate(tempDate);
    }
    setShowDateModal(false);
    setSelectingFor(null);
    setTempDate(null);
  };

  const grouped = groupTransactions(filteredTransactions);

  if (loading) return <Text style={styles.loading}>Đang tải...</Text>;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LỊCH SỬ GIAO DỊCH</Text>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={28} color={Color.primaryText} />
        </TouchableOpacity>

        {/* Nút Lọc */}
        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => setFilterVisible(true)}
        >
          <Icon name="sliders" size={22} color={Color.primary} />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {grouped.map((group, idx) => (
          <View key={idx} style={styles.dateGroup}>
            <Text style={styles.dateLabel}>{group.date}</Text>
            {group.items.map((item: any) => (
              <TransactionItem
                key={item.id}
                item={item}
                currentAccountNumber={currentAccount?.accountNumber}
              />
            ))}
          </View>
        ))}

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="history" size={48} color={Color.subText} />
            <Text style={styles.emptyText}>Không có giao dịch phù hợp</Text>
          </View>
        )}
      </ScrollView>

      {/* === MODAL LỌC === */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFilterVisible(false)}
        />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Lọc giao dịch</Text>
            <TouchableOpacity onPress={() => setFilterVisible(false)}>
              <Icon name="xmark" size={24} color={Color.primaryText} />
            </TouchableOpacity>
          </View>

          {/* Trạng thái */}
          <Text style={styles.filterLabel}>Trạng thái</Text>
          <View style={styles.statusRow}>
            {['ALL', 'SUCCESS', 'FAILED', 'PENDING'].map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusChip,
                  statusFilter === status && styles.statusChipActive,
                ]}
                onPress={() => setStatusFilter(status)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    statusFilter === status && styles.statusChipTextActive,
                  ]}
                >
                  {status === 'ALL'
                    ? 'Tất cả'
                    : status === 'SUCCESS'
                    ? 'Thành công'
                    : status === 'FAILED'
                    ? 'Thất bại'
                    : 'Đang xử lý'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Từ ngày */}
<Text style={styles.filterLabel}>Từ ngày</Text>
<TouchableOpacity
  style={styles.dateButton}
  onPress={() => openDatePicker('from')}
>
  <Text style={styles.dateText}>
    {fromDate ? formatDate(fromDate.toISOString()) : 'Chọn ngày'}
  </Text>
  <Icon name="calendar" size={18} color={Color.subText} />
</TouchableOpacity>

{/* Đến ngày */}
<Text style={styles.filterLabel}>Đến ngày</Text>
<TouchableOpacity
  style={styles.dateButton}
  onPress={() => openDatePicker('to')}
>
  <Text style={styles.dateText}>
    {toDate ? formatDate(toDate.toISOString()) : 'Chọn ngày'}
  </Text>
  <Icon name="calendar" size={18} color={Color.subText} />
</TouchableOpacity>

          {/* Nút áp dụng */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.btnReset}
              onPress={() => {
                setStatusFilter('ALL');
                setFromDate(null);
                setToDate(null);
              }}
            >
              <Text style={styles.btnResetText}>Xóa bộ lọc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnApply}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.btnApplyText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal chọn ngày thủ công */}
<Modal visible={showDateModal} transparent animationType="slide">
  <Pressable
    style={styles.modalOverlay}
    onPress={() => setShowDateModal(false)}
  />
  <View style={styles.dateModalContent}>
    <View style={styles.dateModalHeader}>
      <Text style={styles.dateModalTitle}>Chọn ngày</Text>
      <TouchableOpacity onPress={() => setShowDateModal(false)}>
        <Icon name="xmark" size={24} color={Color.primaryText} />
      </TouchableOpacity>
    </View>

    <View style={styles.pickerContainer}>
      {/* Năm */}
      <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 10 }, (_, i) => {
          const year = new Date().getFullYear() - i;
          return (
            <TouchableOpacity
              key={year}
              style={[
                styles.pickerItem,
                tempDate?.getFullYear() === year && styles.pickerItemActive,
              ]}
              onPress={() => {
                const newDate = tempDate || new Date();
                newDate.setFullYear(year);
                setTempDate(new Date(newDate));
              }}
            >
              <Text
                style={[
                  styles.pickerText,
                  tempDate?.getFullYear() === year && styles.pickerTextActive,
                ]}
              >
                {year}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tháng */}
      <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 12 }, (_, i) => {
          const month = i + 1;
          return (
            <TouchableOpacity
              key={month}
              style={[
                styles.pickerItem,
                tempDate?.getMonth()! + 1 === month && styles.pickerItemActive,
              ]}
              onPress={() => {
                const newDate = tempDate || new Date();
                newDate.setMonth(i);
                setTempDate(new Date(newDate));
              }}
            >
              <Text
                style={[
                  styles.pickerText,
                  tempDate?.getMonth()! + 1 === month && styles.pickerTextActive,
                ]}
              >
                Tháng {month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Ngày */}
      <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.pickerItem,
                tempDate?.getDate() === day && styles.pickerItemActive,
              ]}
              onPress={() => {
                const newDate = tempDate || new Date();
                newDate.setDate(day);
                setTempDate(new Date(newDate));
              }}
            >
              <Text
                style={[
                  styles.pickerText,
                  tempDate?.getDate() === day && styles.pickerTextActive,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>

    <View style={styles.dateModalActions}>
      <TouchableOpacity
        style={styles.btnCancel}
        onPress={() => setShowDateModal(false)}
      >
        <Text style={styles.btnCancelText}>Hủy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnConfirm} onPress={applyDate}>
        <Text style={styles.btnConfirmText}>Chọn</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

// === GROUP FUNCTION (giữ nguyên) ===
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

// === STYLES ===
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  loading: { textAlign: 'center', marginTop: 50, color: Color.subText },

  // Header
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
  btnClose: { position: 'absolute', right: 12, top: 10 },
  btnFilter: { position: 'absolute', left: 16, top: 12 },

  // Scroll
  scrollContent: { flex: 1, paddingHorizontal: 16 },

  // Date Group
  dateGroup: { marginTop: 20 },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.subText,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 4,
  },

  // Transaction Item (giữ nguyên)
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderColor: Color.lightLine,
  },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: { flex: 1 },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.primaryText,
    lineHeight: 20,
  },
  transactionTime: { fontSize: 13, color: Color.subText, marginTop: 2 },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 15, fontWeight: '600' },
  statusIcon: { marginTop: 4 },

  // Empty
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 16, fontSize: 16, color: Color.subText },

  // === MODAL FILTER ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primaryText,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.primaryText,
    marginTop: 16,
    marginBottom: 8,
  },

  // Status Chips
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Color.btnBg,
    borderWidth: 1,
    borderColor: Color.lightLine,
  },
  statusChipActive: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  statusChipText: {
    fontSize: 14,
    color: Color.primaryText,
  },
  statusChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // Date Button
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: Color.lightLine,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 15,
    color: Color.primaryText,
  },

  // Actions
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  btnReset: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Color.btnBg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.lightLine,
  },
  btnResetText: {
    color: Color.primaryText,
    fontWeight: '600',
  },
  btnApply: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Color.primary,
    alignItems: 'center',
  },
  btnApplyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Thêm vào styles
dateModalContent: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  maxHeight: '80%',
},
dateModalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},
dateModalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: Color.primaryText,
},
pickerContainer: {
  flexDirection: 'row',
  height: 200,
  borderWidth: 1,
  borderColor: Color.lightLine,
  borderRadius: 12,
  overflow: 'hidden',
},
pickerColumn: {
  flex: 1,
  backgroundColor: '#f9f9f9',
},
pickerItem: {
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 0.5,
  borderColor: Color.lightLine,
},
pickerItemActive: {
  backgroundColor: Color.primary + '20',
},
pickerText: {
  fontSize: 16,
  color: Color.primaryText,
},
pickerTextActive: {
  color: Color.primary,
  fontWeight: 'bold',
},
dateModalActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  gap: 12,
},
btnCancel: {
  flex: 1,
  padding: 14,
  borderRadius: 12,
  backgroundColor: Color.btnBg,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: Color.lightLine,
},
btnCancelText: {
  color: Color.primaryText,
  fontWeight: '600',
},
btnConfirm: {
  flex: 1,
  padding: 14,
  borderRadius: 12,
  backgroundColor: Color.primary,
  alignItems: 'center',
},
btnConfirmText: {
  color: '#fff',
  fontWeight: 'bold',
},
});

export default TransactionHistoryScreen;

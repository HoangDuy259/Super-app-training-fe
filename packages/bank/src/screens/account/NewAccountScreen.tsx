import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountStackParamsList, BankStackParamsList } from '../../navigation/bank.types';
import { BankAccount } from '../../../../shared-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import { searchAccountRequest, suggestAccountRequest } from '../../store/slices/accountSlice';

const API_BASE = 'http://localhost:8080/api/bank-accounts';

type FilterType = 'startsWith' | 'contains';

type AccountScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'NewAccount'
>;

interface AccountScreenProps {
  navigation: AccountScreenNavigationProp;
}

export default function FindDestinationAccountScreen({
  navigation,
}: AccountScreenProps) {
  //   const { setDestinationAccount } = useTransferStore();
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('contains');
  const [selected, setSelected] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search) return;

      if (filter === 'contains' && search.length >= 3) {
        dispatch(searchAccountRequest({ q: search, type: 'contains' }));
      } else if (filter === 'startsWith' && search.length >= 2) {
        dispatch(suggestAccountRequest(search));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, filter, dispatch]);

  const { suggestions, similar, loading } = useSelector(
    (state: RootState) => state.accountUI,
  );


  const data = filter === 'startsWith' ? suggestions : similar;

  const handleSelect = (accountNumber: string) => {
    // Alert.alert('Xác nhận', `Chọn số tài khoản: ${accountNumber}`, [
    //   { text: 'Hủy' },
    //   {
    //     text: 'Chọn',
    //     onPress: () => {
    //       const mockAccount: BankAccount = {
    //         id: '',
    //         accountNumber,
    //         balance: 0,
    //         status: 'ACTIVE',
    //         user: {
    //           id: '',
    //           username: '',
    //           firstName: '',
    //           lastName: '',
    //           email: '',
    //         },
    //       };
    //       dispatch(selectDestinationAccount(mockAccount));
    //       navigation.goBack();
    //     },
    //   },
    // ]);
  };
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TẠO TÀI KHOẢN MỚI</Text>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={28} color={Color.primaryText} />
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Icon
          name="magnifying-glass"
          size={20}
          color={Color.subText}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập số tài khoản..."
          value={search}
          onChangeText={setSearch}
          keyboardType="numeric"
          maxLength={11}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name="xmark-circle" size={20} color={Color.subText} />
          </TouchableOpacity>
        )}
      </View>

      {/* FILTER TABS */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.tab, filter === 'contains' && styles.tabActive]}
          onPress={() => setFilter('contains')}
        >
          <Text
            style={[
              styles.tabText,
              filter === 'contains' && styles.tabTextActive,
            ]}
          >
            Chứa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filter === 'startsWith' && styles.tabActive]}
          onPress={() => setFilter('startsWith')}
        >
          <Text
            style={[
              styles.tabText,
              filter === 'startsWith' && styles.tabTextActive,
            ]}
          >
            Bắt đầu
          </Text>
        </TouchableOpacity>
      </View>

      {/* RESULTS */}
      <FlatList
        data={data}
        keyExtractor={item => item}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            {loading ? (
              <ActivityIndicator color={Color.primary} />
            ) : (
              <Text style={styles.emptyText}>
                {search ? 'Không tìm thấy' : 'Nhập số để tìm kiếm'}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.accountNumber}>
              {formatAccountNumber(item)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Helper
const formatAccountNumber = (num: string) =>
  num.replace(/(\d{4})(?=\d)/g, '$1 ');

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Color.lightLine,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16 },
  filterTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Color.lightLine,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: { borderBottomWidth: 2, borderColor: Color.primary },
  tabText: { color: Color.subText, fontWeight: '500' },
  tabTextActive: { color: Color.primary, fontWeight: '700' },
  list: { paddingHorizontal: 16 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginVertical: 4,
  },
  itemSelected: { backgroundColor: Color.opacityBg },
  accountNumber: { fontSize: 16, fontWeight: '600', color: Color.primaryText },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { color: Color.subText, textAlign: 'center' },
});

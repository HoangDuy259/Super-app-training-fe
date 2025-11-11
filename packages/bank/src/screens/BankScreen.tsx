import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../navigation/bank.types';
import { moreServiceTab, staticTab } from '../constant/bankScreen';
import { remoteStorage } from '../store/storage/remoteStorage';
import { LoginResponse, UserInfo } from '../../../shared-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../host/src/store/store';
import {
  createFirstAccountRequest,
  getAccountRequest,
} from '../store/slices/accountSlice';
import { selectAccount } from '../store/slices/accountSlice';
import { clearDestinationAccount } from '../store/slices/transferSlice';
import { eventBus } from '../../../shared-types/utils/eventBus';
import { resetState } from '../store/slices/transactionSlice';

type BankScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'Bank'
>;

interface BankScreenProps {
  navigation: BankScreenNavigationProp;
}

const BankScreen = ({ navigation }: BankScreenProps) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 70) / 4;
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<LoginResponse | null>(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.accountUI || {});
  const { currentAccount } = useSelector((state: RootState) => state.accountUI);
  const { currentTransaction } = useSelector(
    (state: RootState) => state.transactionUI,
  );

  const activeAccounts = useSelector(
    (state: RootState) =>
      state.accountUI.accounts.filter(acc => acc.status === 'ACTIVE'),
    shallowEqual,
  );

  console.log('[REMOTE] BankScreen RENDERED!');

  useEffect(() => {
    const initBankData = async () => {
      try {
        const tokens = await remoteStorage.getTokens();
        console.log('[remote] tokens from storage: ', tokens);

        const userInfo = await remoteStorage.getUser();
        console.log('[remote] user from storage: ', userInfo);
        setUser(userInfo);

        if (!tokens?.accessToken || !userInfo?.id) {
          console.log('[REMOTE] Missing token or user!');
          return;
        }

        dispatch(getAccountRequest(userInfo.id));
      } catch (error) {
        console.error('[REMOTE] Init error:', error);
      }
    };

    initBankData();
  }, [dispatch]);

  const { accounts } = useSelector((state: RootState) => state.accountUI);
  const hasCreated = useRef(false);

useEffect(() => {
  if (
    !hasCreated.current &&
    accounts.length < 1 &&
    !loading &&
    token?.accessToken
  ) {
    dispatch(createFirstAccountRequest(token.accessToken));
    hasCreated.current = true;
  }
}, [accounts, loading, token]);


  useEffect(() => {
    dispatch(clearDestinationAccount());
    dispatch(resetState())
  }, []);

  useEffect(() => {
    if (activeAccounts && activeAccounts.length > 0) {
      dispatch(selectAccount(activeAccounts[0]));
    }
  }, [activeAccounts]);

  // handle expiration of access token
  useEffect(() => {
    const unsubscribe = eventBus.on(
      'TOKEN_UPDATED',
      (newToken: LoginResponse) => {
        console.log('[TokenTestScreen] Token updated:', newToken);
        setToken(newToken);
      },
    );

    return () => unsubscribe?.();
  }, [setToken]);

  // handle scroll end action
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);

    dispatch(selectAccount(activeAccounts[index]));
  };

  useEffect(() => {
    console.log('[remote] selected acc: ', currentAccount);
    console.log('[remote] current transaction: ', currentTransaction);
  }, [currentAccount]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.whiteText,
      paddingTop: 30
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.whiteText,
    },
    loadingText: {
      fontSize: 16,
      color: Color.subText,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: Color.lightBg,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Color.whiteText,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    greeting: {
      fontSize: 15,
      color: Color.whiteText,
      fontWeight: '500',
    },
    userName: {
      fontSize: 18,
      color: Color.whiteText,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    notification: {
      padding: 8,
    },
    accountSection: {
      backgroundColor: Color.lightBg,
      paddingBottom: 32,
    },
    accountScroll: {
      marginTop: 16,
    },
    accountCard: {
      paddingHorizontal: 24,
      justifyContent: 'center',
    },
    activeAccountCard: {
      borderRadius: 16,
      marginHorizontal: 8,
    },
    accountNumber: {
      fontSize: 16,
      color: Color.whiteText,
      fontWeight: '600',
      marginBottom: 8,
    },
    accountBalance: {
      fontSize: 32,
      color: Color.whiteText,
      fontWeight: '800',
    },
    currency: {
      fontSize: 24,
      fontWeight: '600',
      color: Color.whiteText,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 24,
      paddingHorizontal: 16,
    },
    actionButton: {
      alignItems: 'center',
      flex: 1,
    },
    actionIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    actionLabel: {
      fontSize: 13,
      color: Color.whiteText,
      fontWeight: '600',
    },
    servicesSection: {
      padding: 16,
    },
    staticTabsCard: {
      backgroundColor: Color.whiteText,
      borderRadius: 20,
      paddingVertical: 16,
      marginTop: -30,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: { elevation: 4 },
      }),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingHorizontal: 8,
    },
    gridItem: {
      width: itemWidth,
      alignItems: 'center',
      paddingVertical: 12,
    },
    gridLabel: {
      fontSize: 12,
      color: Color.primaryText,
      marginTop: 8,
      textAlign: 'center',
    },
    expandIcon: {
      alignSelf: 'center',
      marginTop: 8,
    },
    bannerContainer: {
      marginVertical: 20,
      borderRadius: 20,
      overflow: 'hidden',
    },
    banner: {
      width: '100%',
      height: 150,
    },
    moreServicesCard: {
      backgroundColor: Color.opacityBg,
      borderRadius: 16,
      overflow: 'hidden',
      marginTop: 8,
    },
    moreServicesHeader: {
      backgroundColor: Color.lightBg,
      paddingVertical: 12,
    },
    moreServicesTitle: {
      textAlign: 'center',
      color: Color.whiteText,
      fontSize: 16,
      fontWeight: '600',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 32,
    },
    footerText: {
      fontSize: 13,
      color: Color.subText,
      textAlign: 'center',
      marginRight: 8,
    },
    heartIcon: {
      marginTop: 2,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải tài khoản...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.userInfo}
            onPress={() => navigation.navigate('Account')}
          >
            <View style={styles.avatar}>
              <Icon name="user" size={24} color={Color.boldBg} />
            </View>
            <View>
              <Text style={styles.greeting}>Xin chào,</Text>
              <Text style={styles.userName}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notification}>
            <Icon name="bell" size={24} color={Color.whiteText} />
          </TouchableOpacity>
        </View>

        {/* Account Cards */}
        <View style={styles.accountSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            style={styles.accountScroll}
          >
            {activeAccounts.map((acc, index) => (
              <View
                key={acc.id}
                style={[
                  styles.accountCard,
                  { width },
                  currentAccount?.id === acc.id && styles.activeAccountCard,
                ]}
              >
                <Text style={styles.accountNumber}>{acc.accountNumber}</Text>
                <Text style={styles.accountBalance}>
                  {acc.balance.toLocaleString('vi-VN')}{' '}
                  <Text style={styles.currency}>đ</Text>
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {[
              {
                icon: 'right-left',
                label: 'Chuyển tiền',
                screen: 'TransferFlow',
              },
              {
                icon: 'clock-rotate-left',
                label: 'Lịch sử',
                screen: 'TransactionHistory',
              },
              { icon: 'qrcode', label: 'QR của tôi', action: () => {} },
              { icon: 'info', label: 'Thông tin', screen: 'AccountDetail' },
            ].map((btn, i) => (
              <TouchableOpacity
                key={i}
                style={styles.actionButton}
                onPress={() =>
                  btn.screen
                    ? navigation.navigate(btn.screen as any)
                    : btn.action?.()
                }
              >
                <View style={styles.actionIcon}>
                  <Icon name={btn.icon} size={28} color={Color.whiteText} />
                </View>
                <Text style={styles.actionLabel}>{btn.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          {/* Static Tabs */}
          <View style={styles.staticTabsCard}>
            <View style={styles.grid}>
              {staticTab.map(tab => (
                <TouchableOpacity key={tab.id} style={styles.gridItem}>
                  <Icon name={tab.iconName} size={24} color={tab.color} />
                  <Text style={styles.gridLabel}>{tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Icon
              name="angle-down"
              size={20}
              color={Color.secondBg}
              style={styles.expandIcon}
            />
          </View>

          {/* Banner */}
          <View style={styles.bannerContainer}>
            <Image
              source={require('../assets/image/banner/Banner.webp')}
              style={styles.banner}
              resizeMode="cover"
            />
          </View>

          {/* More Services */}
          <View style={styles.moreServicesCard}>
            <View style={styles.moreServicesHeader}>
              <Text style={styles.moreServicesTitle}>Chợ tiện ích</Text>
            </View>
            <View style={styles.grid}>
              {moreServiceTab.map(tab => (
                <TouchableOpacity key={tab.id} style={styles.gridItem}>
                  <Icon name={tab.iconName} size={24} color={tab.color} />
                  <Text style={styles.gridLabel}>{tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Chúc Bạn một ngày đầy hứng khởi!
            </Text>
            <Icon
              name="heart"
              size={16}
              color={Color.danger}
              style={styles.heartIcon}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankScreen;

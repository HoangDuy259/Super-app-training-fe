import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../navigation/bank.types';
import { moreServiceTab, staticTab } from '../constant/bankScreen';
import { remoteStorage } from '../store/storage/remoteStorage';
import { UserInfo } from '../../../shared-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../host/src/store/store';
import { getAccountRequest } from '../store/slices/bankSlice';

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
  const [token, setToken] = useState<any>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  const dispatch = useDispatch();
  const { accounts, loading } = useSelector(
    (state: RootState) => state.bank || {},
  );

  console.log('[REMOTE] BankScreen RENDERED!');

  useEffect(() => {
    const initBankData = async () => {
      try {
        const tokens = await remoteStorage.getTokens();
        const userInfo = await remoteStorage.getUser();

        console.log('🔑 TOKEN:', tokens?.accessToken);
        console.log('👤 USER ID:', userInfo?.id);

        if (!tokens?.accessToken || !userInfo?.id) {
          console.log('[REMOTE] ❌ Missing token or user!');
          return;
        }

        dispatch(getAccountRequest(userInfo.id));
      } catch (error) {
        console.error('[REMOTE] Init error:', error);
      }
    };

    initBankData();
  }, [dispatch]);

  // useEffect(() => {

  //   let unsubscribe: (() => void) | undefined;
  //   if ((global as any).eventBus?.on) {
  //     unsubscribe = (global as any).eventBus.on(
  //       'TOKEN_UPDATED',
  //       (newToken: any) => {
  //         console.log('[TokenTestScreen] Token updated event:', newToken);
  //         setToken(newToken);
  //       },
  //     );
  //   }
  // Thử listen event realtime (nếu bạn đang dùng eventBus)
  // const unsubscribe = (global as any).eventBus?.on?.('TOKEN_UPDATED', (newToken: any) => {
  //   console.log('[TokenTestScreen] Token updated event:', newToken);
  //   setToken(newToken);
  // });

  //   return () => {
  //     unsubscribe?.();
  //   };
  // }, []);

  if (loading) {
    console.log('account in screen: ', accounts);

    return <Text>LOADING ACCOUNTS....</Text>;
  }
  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      flexDirection: 'column',
    },

    container: {
      flex: 1,
      paddingTop: 30,
    },

    // header css
    headerInfoWrapper: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Color.boldBg,
      flexDirection: 'row',
      padding: 8,
    },

    headerInfoUser: {
      flexDirection: 'row',
      alignContent: 'center',
      flex: 1,
    },

    headerInfoNoti: {},

    // content css
    contentContainer: {
      flexDirection: 'column',
      flex: 1,
      height: '100%',
    },

    bankAccountListWrapper: {
      padding: 8,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: Color.lightBg,
    },

    bankAccountList: {
      paddingVertical: 12,
    },

    bankAccountItem: {
      paddingLeft: 8,
    },

    bankAccountItemController: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 20,
      paddingBottom: 35,
    },

    buttonController: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    buttonControllerIcon: {
      backgroundColor: Color.btnBg,
      borderRadius: 100,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },

    textController: {
      color: Color.whiteText,
      fontSize: 12,
    },

    serviceContainer: {
      padding: 8,
      flexDirection: 'column',
      backgroundColor: Color.btnBg,
    },
    staticTabContainer: {
      backgroundColor: Color.whiteText,
      borderRadius: 20,
      flexDirection: 'column',
      alignItems: 'center',
      paddingVertical: 4,
      marginTop: -30,
    },
    tabList: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignContent: 'center',
      width: width,
      padding: 12,
    },
    tabItem: {
      alignItems: 'center',
      width: itemWidth,
      height: itemWidth,
      justifyContent: 'space-around',
    },
    serviceSlider: {
      width: width,
      height: 150,
      borderRadius: 20,
      marginVertical: 20,
    },
    moreServiceContainer: {
      backgroundColor: Color.opacityBg,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    headerMoreService: {
      backgroundColor: Color.lightBg,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingVertical: 10,
    },
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* wrapper */}
      <ScrollView style={styles.container}>
        {/* header */}
        <View style={styles.headerInfoWrapper}>
          <View style={styles.headerInfoUser}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 25,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Icon name="user" size={24} color={Color.lightBg} />
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={{ marginRight: 12, color: Color.whiteText }}>
                Xin chào {user?.firstName}
              </Text>
              <Text
                style={{
                  color: Color.whiteText,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  flex: 1,
                }}
              >
                {user?.lastName}
              </Text>
            </View>
          </View>
          <View style={styles.headerInfoNoti}>
            <Icon name="bell" size={24} color="#fff" />
          </View>
        </View>

        {/* content  */}
        <View style={styles.contentContainer}>
          {/* Section controller */}
          <View style={styles.bankAccountListWrapper}>
            <ScrollView
              style={styles.bankAccountList}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {accounts.map(acc => (
                <View key={acc.id} style={[styles.bankAccountItem, { width }]}>
                  <Text style={{ color: Color.whiteText, fontWeight: 700 }}>
                    {acc.accountNumber}
                  </Text>
                  <Text style={{ color: Color.whiteText, fontSize: 20 }}>
                    {acc.balance} VND
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.bankAccountItemController}>
              <TouchableOpacity
                style={styles.buttonController}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('TransferFlow', { fromAccountId: `AAA` })
                }
              >
                <View style={styles.buttonControllerIcon}>
                  <Icon name="right-left" size={32} color={Color.whiteText} />
                </View>
                <Text style={styles.textController}>Chuyển tiền</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonController}
                activeOpacity={0.7}
                onPress={() => console.log('TouchableOpacity pressed')}
              >
                <View style={styles.buttonControllerIcon}>
                  <Icon
                    name="clock-rotate-left"
                    size={32}
                    color={Color.whiteText}
                  />
                </View>
                <Text style={styles.textController}>Lịch sử</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonController}
                activeOpacity={0.7}
                onPress={() => console.log('TouchableOpacity pressed')}
              >
                <View style={styles.buttonControllerIcon}>
                  <Icon name="qrcode" size={32} color={Color.whiteText} />
                </View>
                <Text style={styles.textController}>QR của tôi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonController}
                activeOpacity={0.7}
                onPress={() => console.log('TouchableOpacity pressed')}
              >
                <View style={styles.buttonControllerIcon}>
                  <Icon name="info" size={32} color={Color.whiteText} />
                </View>
                <Text style={styles.textController}>Thông tin</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Section static layout */}
          <View style={styles.serviceContainer}>
            {/* static tab */}
            <View style={styles.staticTabContainer}>
              <View style={styles.tabList}>
                {staticTab.map(tab => (
                  <View style={styles.tabItem} key={tab.id}>
                    <Icon name={tab.iconName} size={18} color={tab.color} />
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>
                      {tab.label}
                    </Text>
                  </View>
                ))}
              </View>
              <Icon name="angle-down" size={18} color={Color.secondBg} />
            </View>
            {/* slider */}
            <View
              style={{
                backgroundColor: Color.opacityBg,
                borderRadius: 20,
                marginVertical: 20,
              }}
            >
              <Image
                source={require('../assets/image/banner/Banner.webp')}
                style={styles.serviceSlider}
              />
            </View>

            {/* more service */}
            <View style={styles.moreServiceContainer}>
              <View style={styles.headerMoreService}>
                <Text style={{ textAlign: 'center', color: Color.whiteText }}>
                  Chợ tiện ích
                </Text>
              </View>
              <View style={styles.tabList}>
                {moreServiceTab.map(tab => (
                  <View style={styles.tabItem} key={tab.id}>
                    <Icon name={tab.iconName} size={18} color={tab.color} />
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>
                      {tab.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{ marginBottom: 40, marginTop: 20, flexDirection: 'row' }}
            >
              <Text style={{ fontSize: 12, textAlign: 'center', flex: 1 }}>
                Chúc Bạn một ngày đầy hứng khởi!
              </Text>
              <Icon name="heart" size={14} color={Color.boldBg} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankScreen;

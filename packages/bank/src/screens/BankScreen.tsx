import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../navigation/bank.types';
import { moreServiceTab, staticTab } from '../constant/bankScreen';

type BankScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'Bank'
>;

interface BankScreenProps {
  navigation: BankScreenNavigationProp;
}

const BankScreen = ({ navigation }: BankScreenProps) => {
  // const { width } = Dimensions.get('window');
  const { width } = useWindowDimensions();
  const itemWidth = (width - 70) / 4;

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
                Xin chào
              </Text>
              <Text
                style={{
                  color: Color.whiteText,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  flex: 1,
                }}
              >
                Tên người dùng
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
              <View style={[styles.bankAccountItem, { width }]}>
                <Text style={{ color: Color.whiteText, fontWeight: 700 }}>
                  200339798386
                </Text>
                <Text style={{ color: Color.whiteText, fontSize: 20 }}>
                  200,000,000 VND
                </Text>
              </View>
              <View style={[styles.bankAccountItem, { width }]}>
                <Text style={{ color: Color.whiteText }}>19038668686</Text>
                <Text style={{ color: Color.whiteText, fontSize: 24 }}>
                  7,000,0000,000 VND
                </Text>
              </View>
            </ScrollView>
            <View style={styles.bankAccountItemController}>
              <TouchableOpacity
                style={styles.buttonController}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('TransferFlow', { fromAccountId: 'ABC' })
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
            <View style={{backgroundColor: Color.opacityBg, borderRadius: 20, marginVertical: 20}}>
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

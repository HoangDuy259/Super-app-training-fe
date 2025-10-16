import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { BankStackParamsList } from '../navigation/bank.types';

type BankScreenNavigationProp = StackNavigationProp<
  BankStackParamsList,
  'Bank'
>;

interface BankScreenProps {
  navigation: BankScreenNavigationProp;
}

const BankScreen = ({ navigation }: BankScreenProps) => {
  const { width } = Dimensions.get('window');

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
                onPress={() => navigation.navigate('TransferFlow', {fromAccountId: 'ABC'})}
              >
                <View style={styles.buttonControllerIcon} >
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
            <View style={{ height: 100 }}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    backgroundColor: Color.danger,
  },
});

export default BankScreen;

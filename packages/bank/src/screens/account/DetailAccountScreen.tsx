import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Colors from '../../themes/Color';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
const DetailAccountScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.srollContainer}>
        <View style={styles.topContainer}>
          <View style={styles.accountContainer}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={styles.accountName}>NGUYEN VAN A</Text>
                <Text style={styles.accountNumber}>0939910646</Text>
              </View>
              <Pressable
                onPress={() => Alert('Copy to clipboard')}
                style={styles.accountNumber}
              >
                <Icon style={styles.copyIcon} name="copy" size={25} />
              </Pressable>
            </View>
          </View>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceLabel}>Số dư tài khoản</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}
              >
                <Text style={styles.balanceValue}>50,540</Text>
                <Text style={styles.balanceCurrency}>VND</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.qrcodeBox}>
              <Icon style={styles.qrCodeIcon} name="qrcode" size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
              <Icon style={styles.btnIcon} name="money-bill" size={25} />
              <Text style={styles.btnText}>Chuyển tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Icon style={styles.btnIcon} name="wallet" size={25} />
              <Text style={styles.btnText}>Biến động số dư</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Icon style={styles.btnIcon} name="x" size={25} />
              <Text style={styles.btnText}>Đóng tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <View style={styles.searchContainer}>
            <Text style={styles.queryText}>Lịch sử giao dịch </Text>
            <Pressable>
              <Icon
                style={{ color: Colors.gray }}
                name="magnifying-glass"
                size={25}
              />
            </Pressable>
          </View>
          <View style={styles.separator} />
          {/* Flatlist Transactions */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  srollContainer: {
    flexGrow: 1,
  },
  topContainer: {
    paddingBottom: 15,
    backgroundColor: Colors.primaryLight,
  },
  accountContainer: {
    marginTop: 30,
    height: 70,
    margin: 10,
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountName: {
    fontSize: 20,
    color: Colors.primary,
  },
  accountNumber: {
    fontSize: 16,
    color: Colors.black,
    marginTop: 5,
  },
  copyIcon: {
    marginTop: 5,
    color: Colors.primary,
    resizeMode: 'contain',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: Colors.black,
  },
  balanceValue: {
    fontSize: 32,
    color: Colors.black,
  },
  balanceCurrency: {
    fontSize: 18,
    color: Colors.black,
    paddingLeft: 5,
    marginTop: 10,
  },
  qrcodeBox: {
    marginTop: 10,
    width: 60,
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeIcon: {
    color: Colors.white,
    resizeMode: 'contain',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },

  btn: {
    width: 110,
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // cho Android},
  },

  btnText: {
    fontSize: 18,
    color: Colors.black,
    marginTop: 5,
  },

  btnIcon: {
    paddingTop: 5,
    color: Colors.primary,
    resizeMode: 'contain',
  },

  transactionContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  queryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default DetailAccountScreen;

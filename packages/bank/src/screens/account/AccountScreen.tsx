import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../themes/Color';

const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeContainer}>
      <ScrollView style={styles.balanceContainer}>
        <View>
          <Text style={styles.balanceLabel}>Tổng số dư VND</Text>
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
          <TouchableOpacity
            style={[
              styles.btnAdd,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            <Icon style={{ color: Colors.white }} name="plus" size={18} />
            <Text style={styles.btnAddText}>Thêm tài khoản mới</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.accountContainer}
          onPress={() => navigation.navigate('DetailAccount')}
        >
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.accountLabel}>Tài khoản thanh toán</Text>
              <Text style={styles.accountId}>0939910646</Text>
            </View>
            <TouchableOpacity style={styles.accountIcon}>
              <Icon style={{ color: Colors.black }} name="qrcode" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.accountBalanceText}>50,540 VND</Text>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => navigation.navigate('DetailAccount')}
            >
              <Text style={styles.btnViewText}>Xem</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    padding: 30,
  },
  balanceLabel: {
    fontSize: 18,
    color: Colors.primary,
  },
  balanceValue: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
  },
  balanceCurrency: {
    fontSize: 18,
    color: '#000',
    paddingTop: 10,
    paddingLeft: 5,
  },
  btnAdd: {
    backgroundColor: Colors.primary,
    width: 200,
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
  },
  btnAddText: {
    color: '#fff',
    left: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  accountContainer: {
    top: 40,
    padding: 20,
    width: '100%',
    height: 160,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  accountLabel: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },
  accountId: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 5,
  },
  accountIcon: {
    marginLeft: 'auto',
    marginRight: 10,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
    width: '100%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  accountBalanceText: {
    fontSize: 16,
    color: Colors.black,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 'auto',
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderBlockColor: Colors.primary,
    borderWidth: 1,
  },
  btnViewText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;

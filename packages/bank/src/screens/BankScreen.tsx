import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Colors from '../themes/Color';
import store from 'host/store';
import { useSelector } from 'react-redux';

const BankScreen = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  console.log('Get auth state from host: ', auth);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.balanceBox}
          onPress={() => navigation.navigate('Account')}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.balanceLabel}>Tổng số dư VND</Text>
            <Icon style={styles.balanceIcon} name="chevron-right" size={20} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.balanceValue}>50,540</Text>
            <Text style={styles.balanceCurrency}>Vnd</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => navigation.navigate('Transfer')}
          >
            <Icon style={styles.transferIcon} name="money-bill" size={25} />
            <Text style={styles.actionText}>Chuyển tiền</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBox}>
            <Icon style={styles.withdrawIcon} name="credit-card" size={25} />
            <Text style={styles.actionText}>Rút tiền</Text>
          </TouchableOpacity>
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
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },

  balanceBox: {
    backgroundColor: '#0047FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },

  balanceLabel: {
    color: '#fff',
    fontSize: 16,
  },

  balanceValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 5,
  },

  balanceCurrency: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    marginLeft: 5,
  },

  balanceIcon: {
    width: 24,
    height: 24,
    color: Colors.white,
    resizeMode: 'contain',
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#0047FF',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // cho Android
  },

  actionText: {
    color: '#0047FF',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 10,
  },

  transferIcon: {
    left: 15,
    color: '#0047FF',
    marginRight: 20,
    resizeMode: 'contain',
  },

  withdrawIcon: {
    left: 15,
    color: '#0047FF',
    marginRight: 35,
    resizeMode: 'contain',
  },
});

export default BankScreen;

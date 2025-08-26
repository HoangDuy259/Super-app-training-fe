import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../themes/Color';
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

const TransferNumberAccountScreen = () => {
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState('NGUYEN VAN A Chuyen tien');
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Nguồn chuyển tiền</Text>
        <View style={[styles.accountContainer, { flexDirection: 'row' }]}>
          <View>
            <Text style={styles.accountContainerText}>
              TÀI KHOẢN THANH TOÁN - 0939910646
            </Text>
            <Text style={styles.accountBalance}>50,540 VND</Text>
          </View>
          <Icon
            style={{
              color: Colors.primary,
              marginLeft: 'auto',
              top: 15,
              right: 10,
            }}
            name="angle-down"
            size={24}
          />
          {/* Modal danh sách tài khoản */}
        </View>
        <Text style={styles.headerText}>Chuyển đến</Text>
        <View style={styles.accountContainer}>
          <Pressable style={styles.bankContainer}>
            <Icon
              style={{ color: Colors.primary }}
              name="building-columns"
              size={24}
            />
            <Text style={styles.bankText}>Ngân hàng</Text>
            <Icon
              style={{
                color: Colors.primary,
                marginLeft: 'auto',
              }}
              name="angle-down"
              size={24}
            />
            {/* Modal danh sách ngân hàng */}
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.valueInput}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={value => setValue(value)}
          value={value}
          placeholder="0 VND"
        />
        <View style={styles.messageContainer}>
          <Text style={{ color: Colors.primary, fontSize: 16 }}>
            Nội dung chuyển tiền
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={text => setMessage(text)}
            value={message}
            style={styles.messgaeInput}
            placeholder="Nguyen Van A chuyen tien"
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnGoback}>
          <Text style={[styles.btnText, { color: Colors.primary }]}>
            Quay lại
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContinue}>
          <Text style={[styles.btnText, { color: Colors.white }]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountContainer: {
    marginTop: 20,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountContainerText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  accountBalance: {
    fontSize: 20,
    marginTop: 10,
  },
  bankContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  bankText: {
    marginLeft: 20,
    fontSize: 18,
    color: Colors.gray,
  },
  bottomContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  valueInput: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
  },
  messageContainer: {
    margin: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
  },
  messgaeInput: {
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnContinue: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  btnGoback: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransferNumberAccountScreen;

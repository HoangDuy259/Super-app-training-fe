import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../themes/Color';
import Icon from 'react-native-vector-icons/FontAwesome6';

const TransferScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headerText}>Chuyển tiền</Text>
            <TouchableOpacity style={styles.headerIcon}>
              <Icon style={styles.headerIcon} name="qrcode" size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('TransferNumberAccount')}
            >
              <Icon
                style={styles.btnIcon}
                name="money-check-dollar"
                size={25}
              />
              <Text style={styles.btnText}>Số tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Icon style={styles.btnIcon} name="phone" size={25} />
              <Text style={styles.btnText}>Số điện thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Icon style={styles.btnIcon} name="credit-card" size={25} />
              <Text style={styles.btnText}>Số thẻ</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomHeaderText}>Danh sách người thụ hưởng</Text>
          <View style={styles.searchContainer}>
            <Icon
              style={{ color: Colors.gray, marginTop: 20 }}
              name="magnifying-glass"
              size={24}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholder="Tìm kiếm theo tên, số tài khoản"
            />
            {/* Flatlist Người thụ hưởng đã lưu, gần đây */}
          </View>
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
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.primaryLight,
  },
  headerText: {
    fontSize: 30,
  },
  headerIcon: {
    color: Colors.primary,
    marginLeft: 'auto',
    marginRight: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  btn: {
    width: 110,
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // cho Android},
  },
  btnText: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 18,
    paddingHorizontal: 5,
  },
  btnIcon: {
    marginLeft: 5,
    color: Colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  bottomHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
    marginLeft: 15,
    width: 320,
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
});

export default TransferScreen;

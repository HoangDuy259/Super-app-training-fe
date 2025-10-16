import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Color from '../../themes/Color';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface ChooseAccountModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChooseAccountModal: React.FC<ChooseAccountModalProps> = ({
  visible,
  setVisible,
}) => {
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(178, 178, 178, 0.3))',
    },
    bottomSheet: {
      height: '50%', // 👈 nửa màn hình
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
    },
    title: { fontSize: 18, fontWeight: '600' },
    close: { color: 'blue', textAlign: 'center', marginTop: 12 },
    accountItem: { paddingVertical: 10 },
    modal: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
  },
  });
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Chọn tài khoản nguồn</Text>

          <TouchableOpacity
            style={styles.accountItem}
            onPress={() => {
              console.log('Chọn tài khoản 191289341');
              setVisible(false);
            }}
          >
            <Text>191289341 - Tài khoản thanh toán</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.close}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const FindDestinationAccountScreen = () => {
  const [searchBank, setSearchBank] = useState<string>('');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [note, setNote] = useState<string>('Username chuyen tien');
  const { height } = useWindowDimensions();
  const heightInfoAccountList = height * 0.15;
  const [focused, setFocused] = useState<boolean>(false);
  const [foundAccount, setFoundAccount] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 30,
    },

    header: {
      position: 'relative',
      paddingVertical: 12,
      justifyContent: 'center',
      borderBottomWidth: 0.5,
      borderColor: Color.btnBg,
    },

    btnClose: {
      position: 'absolute',
      right: 12,
    },

    contentContainer: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 8,
    },

    infoAccountList: {
      padding: 12,
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: heightInfoAccountList,
      backgroundColor: Color.btnBg,
      marginBottom: 12,
      borderRadius: 4,
    },

    infoAccountItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    infoDetail: {
      marginLeft: 12,
    },

    searchContainer: {
      backgroundColor: Color.btnBg,
      borderRadius: 12,
      flexDirection: 'column',
      padding: 4,
      flex: 1,
    },

    input: {
      color: Color.primaryText,
      padding: 8,
    },

    focusedInput: {
      backgroundColor: Color.opacityBg,
      borderColor: Color.boldBg,
      borderWidth: 0.5,
      borderRadius: 12,
      padding: 4,
      flexDirection: 'column',
      flex: 1,
    },

    btnSearch: {
      marginLeft: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: Color.secondBg,
    },

    inputContainer: {
      flexDirection: 'column',
    },

    note: {},

    btnNext: {
      marginLeft: 8,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: Color.secondBg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text
          style={{
            color: Color.primaryText,
            fontWeight: 700,
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 20,
          }}
        >
          tìm tài khoản đích
        </Text>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.7}
          onPress={() => console.log('TouchableOpacity pressed')}
        >
          <Icon name="xmark" size={28} />
        </TouchableOpacity>
      </View>
      {/* content */}
      <View style={styles.contentContainer}>
        {/* source and destination account */}
        <View style={styles.infoAccountList}>
          <TouchableOpacity
            style={styles.infoAccountItem}
            onPress={() => setShowModal(true)}
          >
            <Icon name="building-columns" size={32} />
            <View style={styles.infoDetail}>
              <Text>Nguồn tiền: 191289341</Text>
              <Text>Số dư: 700.000.000</Text>
            </View>
            <Icon name="angle-right" size={24} />
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5 }}></View>
          <TouchableOpacity style={styles.infoAccountItem}>
            <Icon name="building-columns" size={32} />
            {!foundAccount && (
              <View style={styles.infoDetail}>
                <Text>Tên ngân hàng nhận</Text>
              </View>
            )}
            <Icon name="angle-right" size={24} />
            {/* {foundAccount && (
              <View style={styles.infoDetail}>
                <Text>Tài khoản nhận: 1209381298</Text>
                <Text>Tên ngân hàng nhận</Text>
                <Text>Tên người nhận</Text>
              </View>
            )} */}
          </TouchableOpacity>
        </View>
        {/* search box */}
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View style={focused ? styles.focusedInput : styles.searchContainer}>
            <Text
              style={{ color: Color.subText, marginBottom: 2, paddingLeft: 8 }}
            >
              Số tài khoản
            </Text>
            <TextInput
              placeholder="Tìm kiếm số tài khoản"
              keyboardType="default"
              autoCapitalize="none"
              style={styles.input}
              value={searchBank}
              onChangeText={setSearchBank}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </View>
          <TouchableOpacity>
            <Icon
              name="magnifying-glass"
              size={28}
              color={Color.whiteText}
              style={styles.btnSearch}
            />
          </TouchableOpacity>
        </View>
        {/* input amount */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="0 VND"
            value={inputAmount}
            onChangeText={setInputAmount}
            keyboardType="numeric"
            autoFocus
            style={{
              color: Color.primaryText,
              fontSize: 24,
              textAlign: 'center',
              // flex: 1,
            }}
          />
          <View style={styles.note}>
            <TextInput
              placeholder={note}
              value={note}
              onChangeText={setNote}
              keyboardType="default"
            />
          </View>
        </View>
        {/* next step */}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
            flexDirection: 'row',
          }}
        >
          {/* hint amount */}
          <View
            style={{
              flex: 1,
              backgroundColor: Color.btnBg,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
              100,000
            </Text>
            <Text style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
              200,000
            </Text>
            <Text style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
              500,000
            </Text>
            <Text style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
              1,000,000
            </Text>
          </View>
          {/* button next */}
          <TouchableOpacity>
            <Icon
              name="caret-right"
              size={28}
              color={Color.whiteText}
              style={styles.btnNext}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ChooseAccountModal visible={showModal} setVisible={setShowModal} />
    </SafeAreaView>
  );
};

export default FindDestinationAccountScreen;

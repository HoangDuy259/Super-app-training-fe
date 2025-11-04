import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamsList } from '../../navigation/bank.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import { TransferRequest } from '../../../../shared-types';
import {
  // authenticateTransferRequest,
  createTransactionRequest,
  resetState,
  verifyTransferRequest,
} from '../../store/slices/transactionSlice';
import {
  formatNumberWithCommas,
  parseNumberFromFormatted,
} from '../../utils/formatter';
import { TextInput } from 'react-native-gesture-handler';
import { remoteStorage } from '../../store/storage/remoteStorage';

type ConfirmCodeScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'ConfirmCode'
>;

interface ConfirmCodeScreenProps {
  navigation: ConfirmCodeScreenNavigationProp;
}

const ConfirmCodeScreen = ({ navigation }: ConfirmCodeScreenProps) => {
  // local state
  const [email, setEmail] = useState('');
  // redux state
  const { loading, destinationAccount, amount, note } = useSelector(
    (state: RootState) => state.transferUI || {},
  );
  const { isVerified, error } = useSelector(
    (state: RootState) => state.transactionUI,
  );

  const { currentAccount } = useSelector((state: RootState) => state.accountUI);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await remoteStorage.getUser();
      setEmail(response?.email!);
    };
    fetchUser();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  // handle confirm
  const handleAccept = () => {
    if (currentAccount?.balance! < amount) {
      Alert.alert(
        'Lỗi chuyển khoản',
        'Số dư tài khoản không đủ để thực hiện giao dịch này.',
        [{ text: 'OK' }],
      );
      return;
    }

    setPassword('');
    setModalVisible(true);
  };

  useEffect(() => {
    if (isVerified) {
      const transfer = {
        fromAccountId: currentAccount?.id || null,
        toAccountId: destinationAccount?.id || null,
        amount,
        description: note,
      };
      dispatch(createTransactionRequest(transfer));
      setModalVisible(false);
      dispatch(resetState())
      navigation.navigate('TransactionStatus');
    }
  }, [isVerified]);

  useEffect(() => {
    if (error) {
      Alert.alert('Xác thực thất bại', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const confirmTransfer = () => {
    if (!password || password.length < 4) {
      return;
    }

    dispatch(verifyTransferRequest({ email, password }));
  };

  const closeModal = () => {
    setModalVisible(false);
    setPassword('');
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 30,
    },
    header: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 0.5,
      borderColor: Color.boldLine,
    },
    title: { fontSize: 18, fontWeight: '600', textAlign: 'center', flex: 1 },
    btnClose: {
      position: 'absolute',
      right: 12,
    },
    content: {
      position: 'relative',
      padding: 8,
      height: '90%',
    },
    destinationAccountInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Color.opacityBg,
      padding: 10,
    },
    btnControllerContainer: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      left: 0,
      right: 0,
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    btnAccept: {
      backgroundColor: Color.boldBg,
      borderRadius: 30,
      flex: 0.7,
      paddingVertical: 10,
    },
    btnCancel: {
      backgroundColor: Color.subText,
      borderRadius: 30,
      flex: 0.3,
      paddingVertical: 10,
      marginRight: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '85%',
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 16,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    modalSubtitle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 20,
    },
    passwordBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 12,
      backgroundColor: '#f9f9f9',
      paddingHorizontal: 12,
    },
    passwordInput: {
      flex: 1,
      fontSize: 18,
      paddingVertical: 14,
      color: '#000',
    },
    eyeBtn: { padding: 8 },
    errorText: {
      color: 'red',
      fontSize: 13,
      marginTop: 8,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalBtnCancel: {
      flex: 1,
      padding: 14,
      backgroundColor: '#eee',
      borderRadius: 12,
      marginRight: 8,
    },
    modalBtnConfirm: {
      flex: 1,
      padding: 14,
      backgroundColor: Color.primary,
      borderRadius: 12,
      marginLeft: 8,
    },
    modalBtnTextCancel: {
      color: '#666',
      textAlign: 'center',
      fontWeight: '600',
    },
    modalBtnTextConfirm: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  if (loading) return <Text>Đang loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>Xác nhận chuyển tiền</Text>
        <Icon name="xmark" size={28} style={styles.btnClose} />
      </View>
      {/* content */}
      <View style={styles.content}>
        {/* destination account info */}
        <View>
          <Text style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}>
            Chuyển tới:
          </Text>
          <View style={styles.destinationAccountInfo}>
            <Icon name="building-columns" size={42} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ marginBottom: 8, fontSize: 18 }}>Bank name</Text>
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                {destinationAccount?.accountNumber}
              </Text>
              <Text style={{ textTransform: 'uppercase', fontSize: 18 }}>
                {destinationAccount?.user.firstName}{' '}
                {destinationAccount?.user.lastName}
              </Text>
            </View>
          </View>
        </View>
        {/* amount and note */}
        <View style={{ marginTop: 20 }}>
          <View>
            <Text
              style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}
            >
              Số tiền:
            </Text>
            <Text style={{ fontSize: 42, textAlign: 'center' }}>
              {formatNumberWithCommas(amount)}
            </Text>
          </View>
          <View>
            <Text
              style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}
            >
              Nội dung:
            </Text>
            <Text style={{ fontSize: 24 }}>{note}</Text>
          </View>
        </View>

        {/* button controller */}
        <View style={styles.btnControllerContainer}>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: Color.whiteText,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              Hủy bỏ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnAccept}
            onPress={() => {
              handleAccept();
            }}
          >
            <Text
              style={{
                color: Color.whiteText,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Xác thực giao dịch</Text>
                <Text style={styles.modalSubtitle}>
                  Nhập mật khẩu để tiếp tục
                </Text>

                <View style={styles.passwordBox}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={confirmTransfer}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                  >
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                {error ? <Text style={styles.errorText}>Sai mật khẩu vui lòng nhập lại</Text> : null}

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalBtnCancel}
                    onPress={closeModal}
                  >
                    <Text style={styles.modalBtnTextCancel}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalBtnConfirm}
                    onPress={confirmTransfer}
                  >
                    <Text style={styles.modalBtnTextConfirm}>Xác nhận</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default ConfirmCodeScreen;

import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
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
import { ScrollView, TextInput } from 'react-native-gesture-handler';
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

  const hasProcessed = useRef(false);

  useEffect(() => {
    if (isVerified && !hasProcessed.current) {
      hasProcessed.current = true;
      const transfer = {
        fromAccountId: currentAccount?.id || null,
        toAccountId: destinationAccount?.id || null,
        amount,
        description: note,
      };
      dispatch(resetState());
      dispatch(createTransactionRequest(transfer));
      setModalVisible(false);
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
      backgroundColor: Color.whiteText,
      paddingTop: 30,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: Color.lightLine,
      position: 'relative',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: Color.primaryText,
      textTransform: 'uppercase',
    },
    closeButton: {
      position: 'absolute',
      right: 16,
      padding: 4,
    },
    recipientCard: {
      backgroundColor: Color.whiteText,
      borderRadius: 16,
      padding: 16,
      marginTop: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: { elevation: 4 },
      }),
    },
    sectionLabel: {
      fontSize: 14,
      color: Color.subText,
      fontWeight: '500',
      marginBottom: 8,
    },
    recipientInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bankIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Color.btnBg,
      justifyContent: 'center',
      alignItems: 'center',

      borderColor: Color.secondBg,
      borderWidth: 1,
    },
    recipientDetails: {
      flex: 1,
      marginLeft: 16,
    },
    bankName: {
      fontSize: 15,
      color: Color.subText,
      marginBottom: 2,
    },
    accountNumber: {
      fontSize: 17,
      fontWeight: '600',
      color: Color.primaryText,
      marginBottom: 2,
    },
    recipientName: {
      fontSize: 16,
      color: Color.primaryText,
      fontWeight: '500',
      textTransform: 'uppercase',
    },
    amountSection: {
      marginTop: 24,
      alignItems: 'center',
    },
    amountText: {
      fontSize: 36,
      fontWeight: '700',
      color: Color.primaryText,
      textAlign: 'center',
    },
    currency: {
      fontSize: 24,
      fontWeight: '600',
      color: Color.subText,
    },
    noteSection: {
      marginTop: 24,
      paddingBottom: 100,
    },
    noteText: {
      fontSize: 18,
      color: Color.primaryText,
      lineHeight: 26,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      padding: 16,
      backgroundColor: Color.whiteText,
      borderTopWidth: 1,
      borderColor: Color.lightLine,
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: Color.btnBg,
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: 'center',
    },
    cancelButtonText: {
      color: Color.primaryText,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    confirmButton: {
      flex: 1.8,
      backgroundColor: Color.lightBg,
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: 'center',
    },
    confirmButtonText: {
      color: Color.whiteText,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },

    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '88%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: { elevation: 12 },
      }),
    },
    modalIcon: {
      marginBottom: 12,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: Color.primaryText,
      marginBottom: 8,
    },
    modalSubtitle: {
      fontSize: 15,
      color: Color.subText,
      textAlign: 'center',
      marginBottom: 20,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: Color.boldLine,
      borderRadius: 14,
      backgroundColor: '#fafafa',
      paddingHorizontal: 16,
      width: '100%',
    },
    passwordInput: {
      flex: 1,
      fontSize: 18,
      paddingVertical: 16,
      color: Color.primaryText,
    },
    eyeButton: {
      padding: 8,
    },
    errorText: {
      color: Color.danger,
      fontSize: 14,
      marginTop: 12,
      textAlign: 'center',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 24,
      width: '100%',
    },
    modalCancelBtn: {
      flex: 1,
      backgroundColor: '#eee',
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: 'center',
    },
    modalCancelText: {
      color: '#666',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    modalConfirmBtn: {
      flex: 1,
      backgroundColor: Color.lightBg,
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: 'center',
    },
    disabledBtn: {
      backgroundColor: Color.subText,
      opacity: 0.6,
    },
    modalConfirmText: {
      color: Color.whiteText,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.whiteText,
    },
    loadingText: {
      fontSize: 16,
      color: Color.subText,
    },
  });

  if (loading) return <Text>Đang loading...</Text>;

  // return (
  //   <SafeAreaView style={styles.container}>
  //     {/* header */}
  //     <View style={styles.header}>
  //       <Text style={styles.title}>Xác nhận chuyển tiền</Text>
  //       <Icon name="xmark" size={28} style={styles.btnClose} />
  //     </View>
  //     {/* content */}
  //     <View style={styles.content}>
  //       {/* destination account info */}
  //       <View>
  //         <Text style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}>
  //           Chuyển tới:
  //         </Text>
  //         <View style={styles.destinationAccountInfo}>
  //           <Icon name="building-columns" size={42} />
  //           <View style={{ marginLeft: 12 }}>
  //             <Text style={{ marginBottom: 8, fontSize: 18 }}>Bank name</Text>
  //             <Text style={{ marginBottom: 8, fontSize: 18 }}>
  //               {destinationAccount?.accountNumber}
  //             </Text>
  //             <Text style={{ textTransform: 'uppercase', fontSize: 18 }}>
  //               {destinationAccount?.user.firstName}{' '}
  //               {destinationAccount?.user.lastName}
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //       {/* amount and note */}
  //       <View style={{ marginTop: 20 }}>
  //         <View>
  //           <Text
  //             style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}
  //           >
  //             Số tiền:
  //           </Text>
  //           <Text style={{ fontSize: 42, textAlign: 'center' }}>
  //             {formatNumberWithCommas(amount)}
  //           </Text>
  //         </View>
  //         <View>
  //           <Text
  //             style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}
  //           >
  //             Nội dung:
  //           </Text>
  //           <Text style={{ fontSize: 24 }}>{note}</Text>
  //         </View>
  //       </View>

  //       {/* button controller */}
  //       <View style={styles.btnControllerContainer}>
  //         <TouchableOpacity
  //           style={styles.btnCancel}
  //           onPress={() => {
  //             navigation.goBack();
  //           }}
  //         >
  //           <Text
  //             style={{
  //               color: Color.whiteText,
  //               fontSize: 16,
  //               textAlign: 'center',
  //             }}
  //           >
  //             Hủy bỏ
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.btnAccept}
  //           onPress={() => {
  //             handleAccept();
  //           }}
  //         >
  //           <Text
  //             style={{
  //               color: Color.whiteText,
  //               fontSize: 16,
  //               textAlign: 'center',
  //             }}
  //           >
  //             Xác nhận
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     <Modal
  //       visible={modalVisible}
  //       transparent={true}
  //       animationType="fade"
  //       onRequestClose={closeModal}
  //     >
  //       <TouchableWithoutFeedback onPress={closeModal}>
  //         <View style={styles.modalOverlay}>
  //           <TouchableWithoutFeedback>
  //             <View style={styles.modalContent}>
  //               <Text style={styles.modalTitle}>Xác thực giao dịch</Text>
  //               <Text style={styles.modalSubtitle}>
  //                 Nhập mật khẩu để tiếp tục
  //               </Text>

  //               <View style={styles.passwordBox}>
  //                 <TextInput
  //                   style={styles.passwordInput}
  //                   placeholder="Mật khẩu"
  //                   placeholderTextColor="#aaa"
  //                   secureTextEntry={!showPassword}
  //                   value={password}
  //                   onChangeText={setPassword}
  //                   autoFocus
  //                   returnKeyType="done"
  //                   onSubmitEditing={confirmTransfer}
  //                 />
  //                 <TouchableOpacity
  //                   onPress={() => setShowPassword(!showPassword)}
  //                   style={styles.eyeBtn}
  //                 >
  //                   <Icon
  //                     name={showPassword ? 'eye-slash' : 'eye'}
  //                     size={20}
  //                     color="#666"
  //                   />
  //                 </TouchableOpacity>
  //               </View>

  //               {error ? <Text style={styles.errorText}>Sai mật khẩu vui lòng nhập lại</Text> : null}

  //               <View style={styles.modalButtons}>
  //                 <TouchableOpacity
  //                   style={styles.modalBtnCancel}
  //                   onPress={closeModal}
  //                 >
  //                   <Text style={styles.modalBtnTextCancel}>Hủy</Text>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity
  //                   style={styles.modalBtnConfirm}
  //                   onPress={confirmTransfer}
  //                 >
  //                   <Text style={styles.modalBtnTextConfirm}>Xác nhận</Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //           </TouchableWithoutFeedback>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </Modal>
  //   </SafeAreaView>
  // );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Xác nhận chuyển tiền</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="xmark" size={26} color={Color.primaryText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Recipient Card */}
        <View style={styles.recipientCard}>
          <Text style={styles.sectionLabel}>Chuyển tới</Text>
          <View style={styles.recipientInfo}>
            <View style={styles.bankIcon}>
              <Icon name="building-columns" size={28} color={Color.secondBg} />
            </View>
            <View style={styles.recipientDetails}>
              <Text style={styles.bankName}>Ngân hàng nội bộ</Text>
              <Text style={styles.accountNumber}>
                {destinationAccount?.accountNumber}
              </Text>
              <Text style={styles.recipientName}>
                {destinationAccount?.user.firstName}{' '}
                {destinationAccount?.user.lastName}
              </Text>
            </View>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.amountSection}>
          <Text style={styles.sectionLabel}>Số tiền chuyển</Text>
          <Text style={styles.amountText}>
            {formatNumberWithCommas(amount)}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
        </View>

        {/* Note */}
        <View style={styles.noteSection}>
          <Text style={styles.sectionLabel}>Nội dung chuyển khoản</Text>
          <Text style={styles.noteText}>{note}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleAccept}>
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>

      {/* Password Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Icon
                  name="lock"
                  size={32}
                  color={Color.secondBg}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalTitle}>Xác thực giao dịch</Text>
                <Text style={styles.modalSubtitle}>
                  Nhập mật khẩu để tiếp tục
                </Text>

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Nhập mật khẩu"
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
                    style={styles.eyeButton}
                  >
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                {error && (
                  <Text style={styles.errorText}>
                    Sai mật khẩu, vui lòng thử lại
                  </Text>
                )}

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={closeModal}
                  >
                    <Text style={styles.modalCancelText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalConfirmBtn,
                      (!password || password.length < 4) && styles.disabledBtn,
                    ]}
                    onPress={confirmTransfer}
                    disabled={!password || password.length < 4}
                  >
                    <Text style={styles.modalConfirmText}>Xác nhận</Text>
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

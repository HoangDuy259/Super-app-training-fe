import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
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
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamsList } from '../../navigation/bank.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import {
  changeAmount,
  changeNote,
  findDestinationAccountRequest,
} from '../../store/slices/transferSlice';
import { remoteStorage } from '../../store/storage/remoteStorage';
import {
  formatNumberWithCommas,
  parseNumberFromFormatted,
} from '../../utils/formatter';
import { BankAccount } from '../../../../shared-types';
import { selectAccount } from '../../store/slices/accountSlice';

// MODAL OF CHOOSING ACCOUNT
interface ChooseAccountModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (account: BankAccount) => void;
}
const ChooseAccountModal: React.FC<ChooseAccountModalProps> = ({
  visible,
  setVisible,
  onSelect,
}) => {
  const { accounts, currentAccount } = useSelector(
    (state: RootState) => state.accountUI || {},
  );

  const activeAccounts = useMemo(() => {
  return accounts.filter((acc) => acc.status === 'ACTIVE');
}, [accounts]);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(34, 34, 34, 0.8))',
    },
    title: { fontSize: 18, fontWeight: '600', textAlign: 'center', flex: 1 },
    close: { color: 'blue', textAlign: 'center', marginTop: 12 },
    accountItem: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: Color.lightLine,
    },
    modal: {
      backgroundColor: Color.whiteText,
      borderRadius: 12,
    },
    header: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 0.5,
      borderColor: Color.boldLine,
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
          <View style={styles.header}>
            <Text style={styles.title}>Chọn tài khoản nguồn</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name="xmark" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20 }}>
            {activeAccounts.map(acc => (
              <TouchableOpacity
                key={acc.id}
                style={styles.accountItem}
                onPress={() => {
                  onSelect(acc);
                  setVisible(false);
                }}
              >
                <View>
                  <Text style={{ fontSize: 14, marginBottom: 4 }}>
                    {acc.accountNumber}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    {acc.balance}
                  </Text>
                </View>
                {currentAccount?.id === acc.id && (
                  <Icon name="check" color={Color.secondBg} size={16} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// MAIN COMPONENT
type FindDestinationAccountScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'FindDestinationAccount'
>;

interface FindDestinationAccountScreenProps {
  navigation: FindDestinationAccountScreenNavigationProp;
}

const FindDestinationAccountScreen = ({
  navigation,
}: FindDestinationAccountScreenProps) => {
  // local state
  const [searchAccount, setSearchAccount] = useState<string>('');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const { height } = useWindowDimensions();
  const heightInfoAccountList = height * 0.15;
  const [focused, setFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  // redux state
  const { destinationAccount, loading } = useSelector(
    (state: RootState) => state.transferUI || {},
  );
  const { currentAccount } = useSelector((state: RootState) => state.accountUI);

  // hooks
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('[remote] des acc: ', destinationAccount);
  }, [destinationAccount]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await remoteStorage.getUser();
      setNote(`${userInfo?.firstName} ${userInfo?.lastName} chuyen tien`);
    };
    fetchUserInfo();
  }, []);

  // handle find destination account
  const handleFindDestinationAccount = (accNum: string) => {
    dispatch(findDestinationAccountRequest(accNum));
  };

  // chọn tài khoản
  const handleSelectAccount = (account: BankAccount) => {
    dispatch(selectAccount(account)); // Dispatch action từ slice
  };

  // handle next step (confirm transfer information)
  const handleConfirmTransferInfo = (note: string) => {
    const amount = parseNumberFromFormatted(inputAmount);
    if (!amount || amount < 1000) {
      Alert.alert(
        'Thiếu thông tin',
        'Vui lòng nhập số tiền, tối thiểu 1000 vnđ',
        [{ text: 'OK' }],
      );
      return;
    }
    if (!destinationAccount) {
      Alert.alert('Thiếu thông tin', 'Vui lòng chọn tài khoản thụ hưởng', [
        { text: 'OK' },
      ]);
      return;
    }
    dispatch(changeNote(note));
    dispatch(changeAmount(amount));
    navigation.navigate('ConfirmCode');
  };

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
      borderColor: Color.boldLine,
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
      marginLeft: 20,
      flex: 1,
      alignItems: 'flex-start',
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

    inputInfo: {
      color: Color.primaryText,
      fontSize: 24,
      textAlign: 'center',
      borderColor: Color.boldLine,
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 12,
      paddingHorizontal: 12,
    },

    btnNext: {
      marginLeft: 8,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: Color.secondBg,
    },
  });

  if (loading) return <Text>Loading...</Text>;

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
          tìm tài thụ hưởng
        </Text>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
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
              <Text>Nguồn tiền: {currentAccount?.accountNumber}</Text>
              <Text>
                Số dư: {formatNumberWithCommas(currentAccount?.balance)}
              </Text>
            </View>
            <Icon name="angle-right" size={24} />
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5 }}></View>
          <TouchableOpacity style={styles.infoAccountItem}>
            <Icon name="building-columns" size={32} />
            {!destinationAccount && (
              <View style={styles.infoDetail}>
                <Text>Chưa có tài khoản thụ hưởng</Text>
              </View>
            )}
            {destinationAccount && destinationAccount?.status === 'ACTIVE' && (
              <View style={styles.infoDetail}>
                <Text>Tài khoản nhận: {destinationAccount?.accountNumber}</Text>
                {/* <Text>Tên ngân hàng nhận</Text> */}
                <Text>
                  {destinationAccount?.user.firstName}{' '}
                  {destinationAccount?.user.lastName}
                </Text>
              </View>
            )}
            {destinationAccount && destinationAccount?.status !== 'ACTIVE' && (
              <View style={styles.infoDetail}>
                <Text>Tài khoản nhận: {destinationAccount?.accountNumber}</Text>
                <Text style={{ color: Color.danger }}>
                  Tài khoản đang bị khóa
                </Text>
              </View>
            )}
            <Icon name="angle-right" size={24} />
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
              value={searchAccount}
              onChangeText={setSearchAccount}
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
              onPress={() => handleFindDestinationAccount(searchAccount)}
            />
          </TouchableOpacity>
        </View>
        {/* input amount */}
        <View style={styles.inputContainer}>
          <Text style={{ color: Color.subText, marginTop: 20 }}>Số tiền: </Text>

          <TextInput
            placeholder="0 VND"
            value={inputAmount}
            onChangeText={(text: string) =>
              setInputAmount(formatNumberWithCommas(text))
            }
            keyboardType="numeric"
            autoFocus
            style={styles.inputInfo}
          />
          <Text style={{ color: Color.subText }}>Nội dung: </Text>
          <View style={styles.inputInfo}>
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
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={destinationAccount?.status === 'INACTIVE'}
            onPress={() => {
              handleConfirmTransferInfo(note);
            }}
          >
            <Icon
              name="caret-right"
              size={28}
              color={Color.whiteText}
              style={styles.btnNext}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ChooseAccountModal
        visible={showModal}
        setVisible={setShowModal}
        onSelect={handleSelectAccount}
      />
    </SafeAreaView>
  );
};

export default FindDestinationAccountScreen;

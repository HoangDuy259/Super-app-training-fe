import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamsList } from '../../navigation/bank.types';


type ConfirmCodeScreenNavigationProp = StackNavigationProp<TransferStackParamsList, 'ConfirmCode'>

interface ConfirmCodeScreenProps {
  navigation: ConfirmCodeScreenNavigationProp
}

const ConfirmCodeScreen = ({ navigation }: ConfirmCodeScreenProps) => {
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
      paddingHorizontal: 8
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
  });
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
              <Text style={{ marginBottom: 8, fontSize: 18 }}>10001728322</Text>
              <Text style={{ textTransform: 'uppercase', fontSize: 18 }}>
                nguyen van a
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
            <Text style={{ fontSize: 42, textAlign: 'center' }}>100,000</Text>
          </View>
          <View>
            <Text
              style={{ marginBottom: 4, fontSize: 16, color: Color.subText }}
            >
              Nội dung:
            </Text>
            <Text style={{ fontSize: 24 }}>Duong tien sinh chuyen tien</Text>
          </View>
        </View>

        {/* button controller */}
        <View style={styles.btnControllerContainer}>
          <TouchableOpacity style={styles.btnCancel} onPress={() => {navigation.goBack()}}>
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
          <TouchableOpacity style={styles.btnAccept} onPress={() => {navigation.navigate('TransactionStatus', {success: true, transactionId: 'abc'})}}>
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
    </SafeAreaView>
  );
};

export default ConfirmCodeScreen;

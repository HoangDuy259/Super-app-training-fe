import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  TransferStackParamsList,
  BankStackParamsList,
} from '../../navigation/bank.types';
import { CompositeNavigationProp } from '@react-navigation/native';

type TransactionStatusScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransferStackParamsList, 'TransactionStatus'>,
  StackNavigationProp<BankStackParamsList>
>;

interface TransactionStatusScreenProps {
  navigation: TransactionStatusScreenNavigationProp;
}

const TransactionStatusScreen = ({
  navigation,
}: TransactionStatusScreenProps) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
    },
    content: {
      paddingHorizontal: 8,
      paddingVertical: 20,
      position: 'relative',
      height: '95%'
    },
    transactionStatusContent: {
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center'
    },
    btnStatus: {
      backgroundColor: 'rgba(20, 202, 63, 0.1)',
      alignSelf: 'center',
      padding: 8,
      borderRadius: 100,
      marginBottom: 8
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
    btnConfirm: {
      backgroundColor: Color.boldBg,
      borderRadius: 30,
      flex: 0.7,
      paddingVertical: 10,
    },
    btnHistory: {
      backgroundColor: Color.opacityBg,
      borderRadius: 30,
      flex: 0.3,
      paddingVertical: 10,
      marginRight: 4,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* info transaction */}
        <View style={styles.transactionStatusContent}>
          <View style={styles.btnStatus}>
            <Icon name="circle-check" color={Color.success} size={54} />
          </View>

          <Text
            style={{
              color: Color.success,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 900,
              marginBottom: 8
            }}
          >
            Chuyển thành công
          </Text>
          <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 8}}>700,000 VND</Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              textTransform: 'uppercase',
              color: Color.boldBg,
              marginBottom: 8
            }}
          >
            nguoi nhan tien
          </Text>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ color: Color.subText }}>Nội dung:</Text>
            <Text>NGUYEN VAN A chuyen tien</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Text style={{ color: Color.subText }}>Thời gian:</Text>
            <Text>14:20, 13/2/2025</Text>
          </View>
        </View>
        {/* button controller */}
        <View style={styles.btnControllerContainer}>
          <TouchableOpacity
            style={styles.btnHistory}
            onPress={() => {
              navigation.navigate('TransactionHistory', { accountId: '' });
            }}
          >
            <Text
              style={{
                color: Color.boldBg,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              Lịch sử
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={() => {
              navigation.navigate('Bank');
            }}
          >
            <Text
              style={{
                color: Color.whiteText,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              Hoàn thành
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionStatusScreen;

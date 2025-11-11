import React, { useEffect } from 'react';
import {
  Platform,
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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../host/src/store/store';
import { TransactionStatus } from '../../../../shared-types/enums/TransactionStatus.enum';
import { formatDateTime, formatNumberWithCommas } from '../../utils/formatter';
import { ScrollView } from 'react-native-gesture-handler';

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
  // redux state
  const { loading, currentTransaction } = useSelector(
    (state: RootState) => state.transactionUI || {},
  );
  const { destinationAccount } = useSelector(
    (state: RootState) => state.transferUI || {},
  );

  const isSuccess = currentTransaction?.status === TransactionStatus.Success;
  const statusColor = isSuccess ? Color.success : Color.danger;
  const statusText = isSuccess ? 'Chuyển thành công' : 'Chuyển thất bại';
  // hooks
  useEffect(() => {
    console.log('[remote] current transaction: ', currentTransaction);
  }, []);
  // const styles = StyleSheet.create({
  //   container: {
  //     marginTop: 30,
  //   },
  //   content: {
  //     paddingHorizontal: 8,
  //     paddingVertical: 20,
  //     position: 'relative',
  //     height: '95%',
  //   },
  //   transactionStatusContent: {
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     alignContent: 'center',
  //   },
  //   btnStatus: {
  //     backgroundColor: 'rgba(20, 202, 63, 0.1)',
  //     alignSelf: 'center',
  //     padding: 8,
  //     borderRadius: 100,
  //     marginBottom: 8,
  //   },
  //   btnControllerContainer: {
  //     position: 'absolute',
  //     bottom: 0,
  //     flexDirection: 'row',
  //     left: 0,
  //     right: 0,
  //     justifyContent: 'space-between',
  //     paddingHorizontal: 8,
  //   },
  //   btnConfirm: {
  //     backgroundColor: Color.boldBg,
  //     borderRadius: 30,
  //     flex: 0.7,
  //     paddingVertical: 10,
  //   },
  //   btnHistory: {
  //     backgroundColor: Color.opacityBg,
  //     borderRadius: 30,
  //     flex: 0.3,
  //     paddingVertical: 10,
  //     marginRight: 4,
  //   },
  // });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.whiteText,
      paddingTop: 30
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    statusHeader: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 24,
    },
    statusIconWrapper: {
      width: 88,
      height: 88,
      borderRadius: 44,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    statusTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 12,
    },
    amountText: {
      fontSize: 36,
      fontWeight: '800',
      color: Color.primaryText,
      marginBottom: 8,
    },
    currency: {
      fontSize: 24,
      fontWeight: '600',
      color: Color.subText,
    },
    recipientName: {
      fontSize: 18,
      fontWeight: '600',
      color: Color.primaryText,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    detailsCard: {
      backgroundColor: Color.whiteText,
      borderRadius: 16,
      padding: 20,
      marginTop: 8,
      marginBottom: 100,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: Color.lightLine,
    },
    detailLabel: {
      fontSize: 15,
      color: Color.subText,
      fontWeight: '500',
    },
    detailValue: {
      fontSize: 15,
      color: Color.boldBg,
      fontWeight: '600',
      flex: 1,
      textAlign: 'right',
      marginLeft: 16,
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
    historyButton: {
      flex: 1,
      backgroundColor: Color.btnBg,
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: 'center',
    },
    historyButtonText: {
      color: Color.primaryText,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    completeButton: {
      flex: 1.8,
      backgroundColor: Color.lightBg,
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: 'center',
    },
    completeButtonText: {
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
  //     <View style={styles.content}>
  //       {/* info transaction */}
  //       <View style={styles.transactionStatusContent}>
  //         <View style={styles.btnStatus}>
  //           <Icon name="circle-check" color={Color.success} size={54} />
  //         </View>

  //         <Text
  //           style={{
  //             color: `${
  //               currentTransaction?.status === TransactionStatus.Success
  //             } ? ${Color.success} : ${Color.danger}`,
  //             textAlign: 'center',
  //             fontSize: 18,
  //             fontWeight: 900,
  //             marginBottom: 8,
  //           }}
  //         >
  //           {currentTransaction?.status === TransactionStatus.Success
  //             ? 'Chuyển thành công'
  //             : 'Chuyển thất bại'}
  //         </Text>
  //         <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>
  //           {formatNumberWithCommas(currentTransaction?.amount)}
  //         </Text>
  //         <Text
  //           style={{
  //             fontSize: 18,
  //             textAlign: 'center',
  //             textTransform: 'uppercase',
  //             color: Color.boldBg,
  //             marginBottom: 8,
  //           }}
  //         >
  //           {destinationAccount?.user.firstName}{' '}
  //           {destinationAccount?.user.lastName}
  //         </Text>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             width: '100%',
  //             justifyContent: 'space-between',
  //             marginBottom: 8,
  //           }}
  //         >
  //           <Text style={{ color: Color.subText }}>Nội dung:</Text>
  //           <Text>{currentTransaction?.description}</Text>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             width: '100%',
  //             justifyContent: 'space-between',
  //           }}
  //         >
  //           <Text style={{ color: Color.subText }}>Thời gian:</Text>
  //           <Text>{formatDateTime(currentTransaction?.createdDate)}</Text>
  //         </View>
  //       </View>
  //       {/* button controller */}
  //       <View style={styles.btnControllerContainer}>
  //         <TouchableOpacity
  //           style={styles.btnHistory}
  //           onPress={() => {
  //             navigation.navigate('TransactionHistory');
  //           }}
  //         >
  //           <Text
  //             style={{
  //               color: Color.boldBg,
  //               fontSize: 16,
  //               textAlign: 'center',
  //             }}
  //           >
  //             Lịch sử
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.btnConfirm}
  //           onPress={() => {
  //             navigation.navigate('Bank');
  //           }}
  //         >
  //           <Text
  //             style={{
  //               color: Color.whiteText,
  //               fontSize: 16,
  //               textAlign: 'center',
  //             }}
  //           >
  //             Hoàn thành
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Status Header */}
        <View style={styles.statusHeader}>
          <View style={[styles.statusIconWrapper, { backgroundColor: `${statusColor}15` }]}>
            <Icon
              name={isSuccess ? 'circle-check' : 'circle-xmark'}
              size={56}
              color={statusColor}
            />
          </View>
          <Text style={[styles.statusTitle, { color: statusColor }]}>{statusText}</Text>
          <Text style={styles.amountText}>
            {formatNumberWithCommas(currentTransaction?.amount)} <Text style={styles.currency}>đ</Text>
          </Text>
          <Text style={styles.recipientName}>
            {destinationAccount?.user.firstName} {destinationAccount?.user.lastName}
          </Text>
        </View>

        {/* Transaction Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nội dung chuyển khoản</Text>
            <Text style={styles.detailValue}>{currentTransaction?.description}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Thời gian giao dịch</Text>
            <Text style={styles.detailValue}>
              {formatDateTime(currentTransaction?.createdDate)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mã giao dịch</Text>
            <Text style={styles.detailValue}>{currentTransaction?.id}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('TransactionHistory')}
        >
          <Text style={styles.historyButtonText}>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => navigation.navigate('Bank')}
        >
          <Text style={styles.completeButtonText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TransactionStatusScreen;

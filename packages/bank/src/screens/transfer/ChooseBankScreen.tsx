import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamsList } from '../../navigation/bank.types';

type ChooseBankScreenNavigationProp = StackNavigationProp<
  TransferStackParamsList,
  'ChooseBank'
>;

interface ChooseBankScreenProps {
  navigation: ChooseBankScreenNavigationProp;
}

const ChooseBankScreen = ({ navigation }: ChooseBankScreenProps) => {
  const [searchBank, setSearchBank] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  const itemWidth = (width - 30) / 4;

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
      borderColor: Color.boldLine
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

    searchContainer: {
      backgroundColor: Color.btnBg,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      padding: 4
    },

    input: {
      flex: 1,
      color: Color.primaryText,
      justifyContent: 'center',
      padding: 8
    },

    focusedInput: {
      backgroundColor: Color.opacityBg,
      borderColor: Color.boldBg,
      borderWidth: 0.5,
      borderRadius: 12,
      alignItems: 'center',
      padding: 4,
      flexDirection: 'row'
    },

    listContainer: {
      position: 'relative',
    },

    hintList: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: width,
      paddingVertical: 8,
    },

    hintItem: {
      flexDirection: 'column',
      alignItems: 'center',
      width: itemWidth,
      height: itemWidth,
      justifyContent: 'space-around'
    },

    heading: {
      textTransform: 'uppercase',
      color: Color.subText,
      fontSize: 14,
      fontWeight: 800,
      paddingTop: 12,
    },

    bankList: {},

    bankItem: {
      paddingHorizontal: 4,
      paddingVertical: 8,
      borderBottomColor: Color.btnBg,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
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
            textAlign: 'center',
            fontSize: 20
          }}
        >
          Chọn ngân hàng
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
        {/* search box */}
        <View style={focused ? styles.focusedInput : styles.searchContainer}>
          <Icon name="magnifying-glass" size={18} />
          <TextInput
            placeholder="Tìm kiếm ngân hàng"
            keyboardType="default"
            autoCapitalize="none"
            style={styles.input}
            value={searchBank}
            onChangeText={setSearchBank}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        {/* bank thường dùng */}
        <View style={styles.listContainer}>
          <Text style={styles.heading}>gợi ý</Text>
          <View style={styles.hintList}>
            {Array.from({ length: 8 }).map((_, i) => (
              <TouchableOpacity key={i} style={styles.hintItem} onPress={() => {navigation.navigate('FindDestinationAccount', {toBankId: 'ABC'})}}>
                <Icon name="building-columns" size={32} />
                <Text>Bank name</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* tất cả bank */}
        <View style={styles.listContainer}>
          <Text style={styles.heading}>tất cả bank</Text>
          <ScrollView
            style={styles.bankList}
            showsVerticalScrollIndicator={false}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <View key={i} style={styles.bankItem}>
                <Icon name="building-columns" size={32} />
                <Text style={{ marginLeft: 12 }}>Bank name</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseBankScreen;

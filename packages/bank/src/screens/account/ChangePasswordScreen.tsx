import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../themes/Color';
import { remoteStorage } from '../../store/storage/remoteStorage';
import { ChangePasswordRequest, UserInfo } from '../../../../shared-types';
import { useDispatch } from 'react-redux';
import { changePasswordRequest } from '../../store/slices/userSlice';
import { AccountStackParamsList, BankStackParamsList } from '../../navigation/bank.types';
import { StackNavigationProp } from '@react-navigation/stack';

type ChangePasswordScreenNavigationProp = StackNavigationProp<
  AccountStackParamsList,
  'ChangePassword'
>;

interface ChangePasswordScreenProps {
  navigation: ChangePasswordScreenNavigationProp;
}

const ChangePasswordScreen = ({ navigation }: ChangePasswordScreenProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await remoteStorage.getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    const request: ChangePasswordRequest = {
      password: oldPassword,
      email: user?.email!,
      newPassword: newPassword,
    };
    dispatch(changePasswordRequest(request));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.inner}>
          {/* Header */}
          <View style={styles.header}>
            <Text
              style={{
                color: Color.primaryText,
                fontWeight: '700',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontSize: 20,
              }}
            >
              TÀI KHOẢN BỊ KHÓA
            </Text>
            <TouchableOpacity
              style={styles.btnClose}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Icon name="xmark" size={28} color={Color.primaryText} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Mật khẩu cũ */}
            <Text style={styles.label}>Mật khẩu cũ</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu cũ"
                placeholderTextColor={Color.subText}
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={!showOld}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowOld(!showOld)}
              >
                <Icon
                  name={showOld ? 'eye' : 'eye-slash'}
                  size={20}
                  color={Color.subText}
                />
              </TouchableOpacity>
            </View>

            {/* Mật khẩu mới */}
            <Text style={styles.label}>Mật khẩu mới</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ít nhất 6 ký tự"
                placeholderTextColor={Color.subText}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNew(!showNew)}
              >
                <Icon
                  name={showNew ? 'eye' : 'eye-slash'}
                  size={20}
                  color={Color.subText}
                />
              </TouchableOpacity>
            </View>

            {/* Xác nhận mật khẩu */}
            <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor={Color.subText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Icon
                  name={showConfirm ? 'eye' : 'eye-slash'}
                  size={20}
                  color={Color.subText}
                />
              </TouchableOpacity>
            </View>

            {/* Nút đổi */}
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.changeButtonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    padding: 24,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.primaryText,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.primaryText,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.lightLine,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Color.primaryText,
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  changeButton: {
    backgroundColor: Color.primary,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;

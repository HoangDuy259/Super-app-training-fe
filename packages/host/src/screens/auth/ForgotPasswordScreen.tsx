import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/RootNavigation';
import { useDispatch } from 'react-redux';
import { changePasswordRequest, sendOtpRequest } from '../../saga/auth/authSlice';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'ForgotPassword'
>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP + mật khẩu mới
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleSendOTP = () => {
    if (!email.includes('@')) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ');
      return;
    }
    dispatch(sendOtpRequest(email));
    setStep(2);
  };

  const handleChangePassword = () => {
    if (otp.length !== 6) {
      Alert.alert('Lỗi', 'Mã OTP phải có 6 chữ số');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu mới phải ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    const data = {
      email: email,
      newPassword: newPassword,
      otp: otp
    }
    // Gọi API đổi mật khẩu ở đây
    dispatch(changePasswordRequest(data))
    Alert.alert('', '');
    Alert.alert(
        'Thành công',
        'Đổi mật khẩu thành công!',
        [
          {
            text: 'Xác nhận',
            style: 'destructive',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]
      );
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>
            {step === 1 ? 'Quên Mật Khẩu' : 'Xác Thực & Đổi Mật Khẩu'}
          </Text>

          {step === 1 ? (
            // Bước 1: Nhập email
            <>
              <Text style={styles.label}>Email của bạn</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập email..."
                placeholderTextColor={Color.subText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSendOTP}
              >
                <Text style={styles.primaryButtonText}>Gửi mã xác thực</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Bước 2: Nhập OTP + Mật khẩu mới
            <>
              <Text style={styles.label}>Mã OTP (6 số)</Text>
              <TextInput
                style={styles.input}
                placeholder="000000"
                placeholderTextColor={Color.subText}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />

              <Text style={styles.label}>Mật khẩu mới</Text>
              <TextInput
                style={styles.input}
                placeholder="Ít nhất 6 ký tự"
                placeholderTextColor={Color.subText}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />

              <Text style={styles.label}>Nhập lại mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor={Color.subText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleBack}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleChangePassword}
                >
                  <Text style={styles.primaryButtonText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 1 && (
            <TouchableOpacity
              style={styles.backLink}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>← Quay lại đăng nhập</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.modalBg,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.primaryText,
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    color: Color.primaryText,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Color.lightLine,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    color: Color.primaryText,
  },
  primaryButton: {
    backgroundColor: Color.boldBg,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
    alignItems: 'center'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Color.btnBg,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.lightLine,
  },
  cancelButtonText: {
    color: Color.primaryText,
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    marginTop: 24,
    alignSelf: 'center',
  },
  backText: {
    color: Color.highlightText,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ForgotPasswordScreen;

import React, { useRef, useState } from 'react';
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
  ImageBackground,
} from 'react-native';
import Color from '../../themes/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordRequest, sendOtpRequest } from '../../saga/auth/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { RootState } from '../../store/store';


type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'ForgotPassword'
>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const otpInputs = useRef<(TextInput | null)[]>([]);

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
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
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

    const data = { email, newPassword, otp: otpCode };
    dispatch(changePasswordRequest(data));
    
    Alert.alert(
      'Thành công',
      'Đổi mật khẩu thành công!',
      [{ text: 'Đăng nhập ngay', onPress: () => navigation.navigate('Login') }]
    );
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setOtp(['', '', '', '', '', '']);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <ImageBackground source={require('../../assets/image/background/login-bg.jpg')} style={styles.background} blurRadius={3}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Icon name="shield-halved" size={44} color={Color.secondBg} />
            </View>
            <Text style={styles.appName}>TP BANK</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressStep, step >= 1 && styles.progressActive]} />
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, step >= 2 && styles.progressActive]} />
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.title}>
              {step === 1 ? 'Quên Mật Khẩu' : 'Xác Thực OTP'}
            </Text>

            {step === 1 ? (
              <>
                <Text style={styles.label}>Email của bạn</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="envelope" size={20} color={Color.subText} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="nhap@email.com"
                    placeholderTextColor={Color.subText}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleSendOTP}>
                  <Text style={styles.primaryButtonText}>
                    Gửi mã OTP
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <Text style={styles.label}>Nhập mã OTP (6 số)</Text>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => (otpInputs.current[index] = ref as any)}
                      style={styles.otpBox}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(value, index)}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                    />
                  ))}
                </View>

                {/* New Password */}
                <Text style={styles.label}>Mật khẩu mới</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="lock" size={20} color={Color.subText} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ít nhất 6 ký tự"
                    placeholderTextColor={Color.subText}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                  />
                </View>

                {/* Confirm Password */}
                <Text style={styles.label}>Xác nhận mật khẩu</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="lock" size={20} color={Color.subText} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor={Color.subText}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryButton} onPress={handleChangePassword}>
                    <Text style={styles.primaryButtonText}>
                      Đổi mật khẩu
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.backLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Icon name="arrow-left" size={16} color={Color.whiteText} />
              <Text style={styles.backText}> Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12 },
      android: { elevation: 8 },
    }),
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    color: Color.whiteText,
    letterSpacing: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progressStep: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressActive: {
    backgroundColor: Color.secondBg,
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
  formCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Color.whiteText,
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    color: Color.whiteText,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Color.lightLine,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: Color.primaryText,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: Color.lightLine,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: '#fff',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Color.lightBg,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryButtonText: {
    color: Color.whiteText,
    fontSize: 16,
    fontWeight: '700'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Color.btnBg,
    paddingVertical: 16,
    borderRadius: 14,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  backText: {
    color: Color.whiteText,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default ForgotPasswordScreen;

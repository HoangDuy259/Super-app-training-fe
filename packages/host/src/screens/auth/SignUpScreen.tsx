import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { RootStackParamsList } from '../../navigation/RootNavigation';
import { AuthContext } from '../../saga/auth/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthState, SignupPayload } from '../../../../shared-types/auth.types';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../../themes/Color';
import { clearState, signupRequest } from '../../saga/auth/authSlice';
import { RootState } from '../../store/store';
import Icon from 'react-native-vector-icons/FontAwesome6';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'SignUp'
>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading } = useSelector(
    (state: RootState) => state.auth || {},
  );
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!email || !username || !password) {
      Alert.alert('Lỗi!', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const payload: SignupPayload = {
      email,
      username,
      password,
      lastName,
      firstName,
    };

    try {
      dispatch(signupRequest(payload));
    } catch (error: any) {
      Alert.alert('Đăng ký thất bại', error.message || 'Có lỗi xảy ra');
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/image/background/login-bg.jpg')}
      style={styles.background}
      blurRadius={3}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Icon name="building-columns" size={48} color={Color.lightBg} />
            </View>
            <Text style={styles.appName}>TP BANK</Text>
            <Text style={styles.tagline}>Tạo tài khoản miễn phí</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.title}>Đăng ký tài khoản</Text>

            {/* Username */}
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'username' && styles.inputFocused,
              ]}
            >
              <Icon
                name="user"
                size={20}
                color={
                  focusedInput === 'username' ? Color.secondBg : Color.subText
                }
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Tên đăng nhập"
                autoCapitalize="none"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Email */}
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'email' && styles.inputFocused,
              ]}
            >
              <Icon
                name="envelope"
                size={20}
                color={
                  focusedInput === 'email' ? Color.secondBg : Color.subText
                }
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* First Name */}
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'firstname' && styles.inputFocused,
              ]}
            >
              <Icon
                name="id-card"
                size={20}
                color={
                  focusedInput === 'firstname' ? Color.secondBg : Color.subText
                }
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Tên"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setFocusedInput('firstname')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Last Name */}
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'lastname' && styles.inputFocused,
              ]}
            >
              <Icon
                name="id-badge"
                size={20}
                color={
                  focusedInput === 'lastname' ? Color.secondBg : Color.subText
                }
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Họ"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setFocusedInput('lastname')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Password */}
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'password' && styles.inputFocused,
              ]}
            >
              <Icon
                name="lock"
                size={20}
                color={
                  focusedInput === 'password' ? Color.secondBg : Color.subText
                }
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Mật khẩu"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.signupButtonText}>
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginLinkContainer}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <Text style={styles.loginLink}>Đăng nhập ngay</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 50
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Color.whiteText,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 14,
    color: Color.whiteText,
    marginTop: 4,
    opacity: 0.9,
  },
  formCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',

    borderRadius: 20,
    padding: 24,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 8 },
    //     shadowOpacity: 0.15,
    //     shadowRadius: 16,
    //   },
    //   android: { elevation: 12 },
    // }),
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Color.whiteText,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Color.lightLine,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    backgroundColor: '#fafafa',
  },
  inputFocused: {
    borderColor: Color.secondBg,
    backgroundColor: '#fff',
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
  signupButton: {
    backgroundColor: Color.lightBg,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: Color.secondBg,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  signupButtonText: {
    color: Color.whiteText,
    fontSize: 17,
    fontWeight: '700',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: Color.whiteText,
    fontSize: 15,
  },
  loginLink: {
    color: Color.secondBg,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SignUpScreen;

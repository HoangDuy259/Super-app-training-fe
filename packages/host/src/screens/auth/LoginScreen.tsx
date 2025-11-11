import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/RootNavigation';
import { AuthContext } from '../../saga/auth/AuthContext';
import type { RootState, AppDispatch } from '../../store/store';
import Color from './../../themes/Color';
import { hostSession } from '../../utils/hostStorage';
import Icon from 'react-native-vector-icons/FontAwesome6';


type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { isAuthenticated, refreshToken } = useSelector(
    (state: RootState) => state.auth,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { logIn } = useContext(AuthContext);
  const handleLogin = () => {
    if (email && password) {
      logIn({ email, password });
    }
  };

  useEffect(() => {
    const test = async () => {
      const token = await hostSession.getTokens();
      const user = await hostSession.getUser();
      console.log('[screen] token when mount: ', token);
      console.log('[screen] user when mount: ', user);
    };
    test();
  }, [refreshToken]);

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert('Đăng nhập thành công', `Xin chào`);
      navigation.navigate('Main');
    }
  }, [isAuthenticated]);

  return (
    <ImageBackground
      source={require('../../assets/image/background/login-bg.jpg')} // Thêm ảnh nền
      style={styles.background}
      blurRadius={3}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Logo + Tên App */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Icon name="building-columns" size={48} color={Color.lightBg} />
            </View>
            <Text style={styles.appName}>TP BANK</Text>
            <Text style={styles.tagline}>Ngân hàng số của bạn</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.title}>Đăng nhập</Text>

            {/* Email Input */}
            <View style={[styles.inputContainer, focusedInput === 'email' && styles.inputFocused]}>
              <Icon name="envelope" size={20} color={focusedInput === 'email' ? Color.secondBg : Color.subText} style={styles.inputIcon} />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, focusedInput === 'password' && styles.inputFocused]}>
              <Icon name="lock" size={20} color={focusedInput === 'password' ? Color.secondBg : Color.subText} style={styles.inputIcon} />
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

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotLink}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={styles.signupContainer}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.signupText}>Chưa có tài khoản? </Text>
              <Text style={styles.signupLink}>Đăng ký ngay</Text>
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
    marginBottom: 40,
    paddingTop: 50
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12 },
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
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 24,
    // ...Platform.select({
    //   ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16 },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Color.lightLine,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: Color.secondBg,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: Color.lightBg,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: Color.secondBg, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  loginButtonText: {
    color: Color.whiteText,
    fontSize: 17,
    fontWeight: '700',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: Color.whiteText,
    fontSize: 15,
  },
  signupLink: {
    color: Color.secondBg,
    fontSize: 15,
    fontWeight: '600',
  },
});
export default LoginScreen;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/RootNavigation';
import { AuthContext } from '../../saga/auth/AuthContext';
import type { RootState, AppDispatch } from '../../store/store';
import Color from './../../themes/Color';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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
    if (isAuthenticated) {
      Alert.alert('Đăng nhập thành công', `Xin chào`);
      navigation.navigate('Main');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Đăng nhập</Text>
      <TextInput
        placeholder="Email"
        keyboardType="default"
        autoCapitalize="none"
        style={[styles.input, focusedInput === 'email' && styles.focusedInput]}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput(null)}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={[styles.input, focusedInput === 'password' && styles.focusedInput]}
        placeholder="Mật khẩu"
        secureTextEntry
        onFocus={() => setFocusedInput('password')}
        onBlur={() => setFocusedInput(null)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Bạn chưa có tài khoản? Đăng ký.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Color.modalBg,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.highlightText,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 6,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  focusedInput: {
    borderColor: Color.boldBg,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: Color.boldBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: Color.highlightText,
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoginScreen;

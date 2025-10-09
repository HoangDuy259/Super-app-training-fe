import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { RootStackParamsList } from '../../navigation/RootNavigation';
import { AuthContext } from '../../saga/auth/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignupPayload } from '../../saga/auth/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Color from '../../themes/Color';

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);


  const handleSignUp = async () => {
    if (!email || !username || !password) {
      Alert.alert('Lỗi!', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const payload: SignupPayload = {
      email: email,
      userName: username,
      password: password,
    };

    try {
      await signUp(payload);
      Alert.alert('Đăng ký thành công');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Đăng ký thất bại', error.message || 'Có lỗi xảy ra');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Đăng ký tài khoản</Text>
      <TextInput
        placeholder="Tên đăng nhập"
        keyboardType="default"
        autoCapitalize="none"
        style={[styles.input, focusedInput === 'username' && styles.focusedInput]}
        value={username}
        onChangeText={setUsername}
        onFocus={() => setFocusedInput('username')}
        onBlur={() => setFocusedInput(null)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, focusedInput === 'email' && styles.focusedInput]}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput(null)}
      />
      <TextInput
        placeholder="Họ"
        keyboardType="default"
        autoCapitalize="none"
        style={[styles.input, focusedInput === 'lastname' && styles.focusedInput]}
        value={lastName}
        onChangeText={setLastName}
        onFocus={() => setFocusedInput('lastname')}
        onBlur={() => setFocusedInput(null)}
      />
      <TextInput
        placeholder="Tên"
        keyboardType="default"
        autoCapitalize="none"
        style={[styles.input, focusedInput === 'firstname' && styles.focusedInput]}
        value={firstName}
        onChangeText={setFirstName}
        onFocus={() => setFocusedInput('firstname')}
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
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Bạn đã có tài khoản chưa? Đăng nhập. </Text>
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.highlightText
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

export default SignUpScreen;

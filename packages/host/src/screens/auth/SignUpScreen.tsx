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
import { AuthContext } from '../../features/auth/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignupPayload } from '../../features/auth/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

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
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const { signUp } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !username || !phoneNum || !password || !confirmPassword) {
      Alert.alert('Lỗi!', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Lỗi!', 'Xác nhận mật khẩu chưa khớp');
      return;
    }

    const payload: SignupPayload = {
      email: email,
      userName: username,
      password: password,
      confirmPassword: confirmPassword,
      phoneNum: phoneNum,
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
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      {/* <TextInput
        placeholder="First Name"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      /> */}
      <TextInput
        value={phoneNum}
        onChangeText={setPhoneNum}
        style={styles.input}
        placeholder="Phone Number"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Alreay have an account? Log In </Text>
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
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#056edd',
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
    color: '#056edd',
    marginTop: 10,
    fontSize: 16,
  },
});

export default SignUpScreen;

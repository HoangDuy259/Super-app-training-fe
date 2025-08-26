import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../../navigation/RootNavigation";
import { AuthContext } from "../../features/auth/AuthContext";
import type { RootState, AppDispatch } from "../../app/store";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamsList, "Login">;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useContext(AuthContext);
  console.log(logIn);
  const handleLogin = () => {
    if (email && password) {
      logIn(email, password);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert("Đăng nhập thành công", `Xin chào`);
      navigation.navigate("Home");
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log In</Text>
      <TextInput
        placeholder="Email"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>You don't have an account? Sign Up.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 6,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#056edd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#056edd",
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoginScreen;

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import styles from "../styles/AuthScreens";
import axiosInstance from "../constants/axios";
import registerNNPushToken, { registerIndieID } from "native-notify";

const LoginScreen = ({ handleLogin, getToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email) return alert("Email not given");
    if (!password) return alert("Password not given");
    try {
      const deviceId = "123";
      const fcmToken = "123";
      const result = await axiosInstance.post("/auth/login", {
        email,
        password,
        deviceId,
        fcmToken,
      });
      console.log(result.data.data);
      const data = result.data.data;
      if (typeof data === "string") return alert(data);

      await getToken(data.accessToken);
      const temp = await registerIndieID(
        result.data.data.userId,
        8001,
        "zy08cMaUkMdVRgRWjNB7bm"
      );
      console.log(temp);
      await handleLogin({ token: data.accessToken });
    } catch (error) {
      console.log("error", error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.FormText}>
        Don't have an account?{" "}
        <Text
          style={styles.FormLink}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Register now
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";

import axiosInstance from "../constants/axios";
import styles from "../styles/AuthScreens";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const router = useRouter();

  const onSubmit = async () => {
    if (!name.trim()) return alert("Please enter a name");
    if (!email.trim()) return alert("Please enter email");
    if (!password) return alert("Please enter a password");
    try {
      const deviceId = "123";
      const fcmToken = "123";

      console.log(name, email, password, deviceId, fcmToken);

      const result = await axiosInstance.post("/auth/register", {
        username: name,
        email,
        password,
        deviceId,
        fcmToken,
      });

      console.log("result : ", result);

      const data = result.data.data;
      if (typeof data === "string") return alert(data);
      alert("Sigup Successful. Please login to continue");
      router.back();
    } catch (error) {
      console.log("error", error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.FormText}>
        Already have an account?{" "}
        <Text
          style={styles.FormLink}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Login now
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

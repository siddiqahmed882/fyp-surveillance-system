import LoginScreen from "./LoginScreen";
import Display from "./Display";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { getData, storeData } from "../utils";
import registerNNPushToken, { registerIndieID } from "native-notify";
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const Index = () => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	// async function requestUserPermission() {
	// 	const authStatus = await messaging().requestPermission();
	// 	const enabled =
	// 		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
	// 		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	// 	if (enabled) {
	// 		console.log('Authorization status:', authStatus);
	// 	}
	// }

	const getToken = async (accessToken) => {

		console.log(accessToken);
		if (!accessToken) token === "token";
		// const fcmToken = await messaging().getToken();
		// alert(fcmToken);
		// setToken(fcmToken);
		// console.log("Token = ", fcmToken);


		// if (fcmToken) {
		// 	axios.post('https://5bdbnhzw-8001.inc1.devtunnels.ms/api/v1/notification/fcm/',
		// 		{
		// 			token: fcmToken,
		// 		},
		// 		{
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 				Authorization: `Bearer ${accessToken}`
		// 			}
		// 		}
		// 	).then((response) => {
		// 		console.log(response.data);
		// 		alert(response.data.message);
		// 	}).catch((error) => {
		// 		console.log(error);
		// 		alert(error.message);
		// 	})
		// }

	}

	useEffect(() => {
		getData(null)
			.then((value) => setUser(value))
			.catch((error) => console.log(error));

		// requestUserPermission();
	}, []);

	const handleLogin = async (userData) => {
		const updatedUserInfo = { ...userData };
		await storeData(updatedUserInfo);
		setUser(updatedUserInfo);
	};

	const handleLogout = async () => {
		await storeData(null);
		setUser(null);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShown: false,
				}}
			/>
			{user != null || user?.token ? (
				<Display handleLogout={handleLogout} />
			) : (
				<LoginScreen handleLogin={handleLogin} getToken={getToken} />
			)}
		</SafeAreaView>
	);
};

export default Index;

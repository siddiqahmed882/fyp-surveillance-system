import { AddRoom } from "./AddRoom";
import { Home } from "./Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "./LogoutScreen";
import Notifications from "./Notifications";
import { Ionicons } from "@expo/vector-icons";

const Display = ({ handleLogout }) => {
	const Drawer = createDrawerNavigator();

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={{
				drawerPosition: "left",
				headerShown: true,
				headerTitle: "",
				drawerItemStyle: {
					top: 20,
					height: 70,
					alignContent: "center",
					justifyContent: "center",
				},
				drawerActiveTintColor: "#FF7754",
			}}
		>
			<Drawer.Screen
				name="Home"
				component={Home}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
				}}
			/>
			<Drawer.Screen
				name="AddRoom"
				component={AddRoom}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="add-circle-sharp" color={color} size={size} />
					),
				}}
			/>
			<Drawer.Screen
				name="Notifications"
				component={Notifications}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="notifications" color={color} size={size} />
					),
				}}
			/>
			<Drawer.Screen
				name="Logout"
				children={() => <LogoutScreen handleLogout={handleLogout} />}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="log-out" color={color} size={size} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default Display;

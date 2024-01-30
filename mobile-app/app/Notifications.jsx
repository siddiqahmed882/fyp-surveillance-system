import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import { COLORS } from "../constants";

import useNotificationFetch from "../hook/useNotificationFetch";
import { ScrollView } from "react-native-gesture-handler";

const NotificationListItem = ({ title, body }) => {
	return (
		<View style={styles.textContainer}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.body}>{body}</Text>
		</View>
	);
};

const Notifications = () => {
	const [refreshing, setRefreshing] = useState(false);

	const {
		data: notifications,
		isLoading,
		error,
		refetch,
	} = useNotificationFetch();

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, []);

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{isLoading ? (
				<ActivityIndicator size="large" color={COLORS.primary} />
			) : error ? (
				<Text>Something went wrong</Text>
			) : notifications.length === 0 ? (
				<Text>No data available</Text>
			) : (
				notifications.map((notification) => (
					<RenderNotificationItem notification={notification} />
				))
			)}
		</ScrollView>
	);
};

const RenderNotificationItem = ({ notification }) => {
	return (
		<NotificationListItem
			key={notification.id + 1}
			title={notification.title}
			body={notification.body}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	textContainer: {
		flex: 1,
		flexDirection: "column",
		paddingVertical: 12,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	body: {
		fontSize: 16,
		color: "#666",
	},
});

export default Notifications;

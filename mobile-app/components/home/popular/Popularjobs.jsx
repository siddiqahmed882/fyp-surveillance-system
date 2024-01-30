import { useState } from "react";
import { useRouter } from "expo-router";
import {
	View,
	Text,
	RefreshControl,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const Popularjobs = ({ data, isLoading, error }) => {
	const router = useRouter();

	const handleCardPress = (item) => {
		router.push("Notifications");
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Your Notifications</Text>
				<TouchableOpacity>
					{/* <Text style={styles.headerBtn}>Show all</Text> */}
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<PopularJobCard item={item} handleCardPress={handleCardPress} />
						)}
						contentContainerStyle={{
							flexGrow: 1,
							flexDirection: "row",
							columnGap: SIZES.medium,
						}}
						keyExtractor={(item) => item.id}
						// contentContainerStyle={{ columnGap: SIZES.medium }}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				)}
			</View>
		</View>
	);
};

export default Popularjobs;

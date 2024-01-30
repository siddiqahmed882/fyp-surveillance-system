import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
	View,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";

import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import { getData, getURL } from "../../utils";

const JobSearch = () => {
	const params = useSearchParams();
	const router = useRouter();

	const [searchResult, setSearchResult] = useState([]);
	const [searchLoader, setSearchLoader] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const [page, setPage] = useState(1);

	const handleSearch = async () => {
		setSearchLoader(true);
		setSearchResult([]);

		try {
			const result = await getData(null);

			const options = {
				method: "POST",
				url: getURL("search"),
				headers: {
					Authorization: `Bearer ${result.token}`,
				},
				data: {
					searchQuery: params.id,
				},
				// params: {
				// 	page: page.toString(),
				// },
			};
			const response = await axios.request(options);
			setSearchResult(response.data.data);
		} catch (error) {
			setSearchError(error);
			console.log(error);
		} finally {
			setSearchLoader(false);
		}
	};

	const handlePagination = (direction) => {
		if (direction === "left" && page > 1) {
			setPage(page - 1);
			handleSearch();
		} else if (direction === "right") {
			setPage(page + 1);
			handleSearch();
		}
	};

	useEffect(() => {
		handleSearch();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimensions="60%"
							handlePress={() => router.back()}
						/>
					),
					headerTitle: "",
				}}
			/>

			<FlatList
				data={searchResult}
				renderItem={({ item }) => (
					<NearbyJobCard
						item={item}
						key={`nearby-job-${item?.id}`}
						handleNavigate={() => {
							router.push(`/job-details/${item.id}`);
						}}
					/>
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
				ListHeaderComponent={() => (
					<>
						<View style={styles.container}>
							<Text style={styles.searchTitle}>{params.id}</Text>
							<Text style={styles.noOfSearchedJobs}>Rooms Online</Text>
						</View>
						<View style={styles.loaderContainer}>
							{searchLoader ? (
								<ActivityIndicator size="large" color={COLORS.primary} />
							) : (
								searchError && <Text>Oops something went wrong</Text>
							)}
						</View>
					</>
				)}
				ListFooterComponent={() => (
					<View style={styles.footerContainer}>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination("left")}
						>
							<Image
								source={icons.chevronLeft}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<View style={styles.paginationTextBox}>
							<Text style={styles.paginationText}>{page}</Text>
						</View>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination("right")}
						>
							<Image
								source={icons.chevronRight}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default JobSearch;

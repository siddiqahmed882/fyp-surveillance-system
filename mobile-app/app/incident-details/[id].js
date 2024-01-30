import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useNearByJobsFetch from "../../hook/useNearByJobsFetch";
import { getURL } from "../../utils";

const JobDetails = () => {
	const params = useSearchParams();
	const router = useRouter();

	const { data, isLoading, error, refetch } = useNearByJobsFetch(params.id);

	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [refreshing, setRefreshing] = useState(false);

	const tabs = ["Device Info", "Room Info", "Real Time Data"];

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
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

			<>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRe fresh={onRefresh} />
					}
				>
					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.primary} />
					) : error ? (
						<Text>Something went wrong</Text>
					) : data.length === 0 ? (
						<Text>No data available</Text>
					) : (
						<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
							<Company
								companyLogo={data.id}
								jobTitle={data.room_name}
								companyName={data.device_type}
								location={data.device_name}
							/>

							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>

							<DisplayTabContent activeTab={activeTab} data={data} />
						</View>
					)}
				</ScrollView>
				<JobFooter
					url={
						data.device_data
							? `${getURL("video_feed")}/${data.device_data}`
							: "https://careers.google.com/jobs/results/"
					}
				/>
			</>
		</SafeAreaView>
	);
};

const DisplayTabContent = ({ activeTab, data }) => {
	switch (activeTab) {
		case "Device Info":
			return (
				<Specifics
					title="Device Info"
					specificType="info"
					points={data.device_info ?? ["N/A"]}
				/>
			);

		case "Room Info":
			return (
				<JobAbout
					title="Room Info"
					info={data.room_name ?? "No data provided"}
				/>
			);

		case "Real Time Data":
			return (
				<Specifics
					title="Real Time Data"
					specificType="data"
					points={data.device_data ?? ["N/A"]}
				/>
			);

		default:
			return null;
	}
};

export default JobDetails;

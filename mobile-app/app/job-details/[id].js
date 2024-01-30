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
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useNearByJobsFetch from "../../hook/useNearByJobsFetch";

const JobDetails = () => {
	const params = useSearchParams();
	const router = useRouter();

	const { data, isLoading, error, refetch } = useNearByJobsFetch(params.id);

	const tabs = [
		"Device Info",
		"Room Info",
		data?.device_type === "Camera" ? "Real Time Data" : null,
	].filter(Boolean);

	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [refreshing, setRefreshing] = useState(false);

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
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.primary} />
					) : error ? (
						<Text>Something went wrong</Text>
					) : data.length < 1 ? (
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
					deviceId={data.device_id ?? ["N/A"]}
					deviceData={data.device_data ?? ["N/A"]}
				/>
			);

		case "Room Info":
			return (
				<JobAbout
					title="Room Info"
					info={data.room_name ?? "No data provided"}
					roomNo={data.room_no}
				/>
			);

		case "Real Time Data":
			return (
				<Specifics
					title="Real Time Data"
					specificType={data.device_type ?? ["N/A"]}
					points={data.device_data ?? ["N/A"]}
				/>
			);

		default:
			return null;
	}
};

export default JobDetails;

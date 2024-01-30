import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
	container: {
		width: 250,
		padding: SIZES.xLarge,
		backgroundColor: "#FFF",
		borderRadius: SIZES.medium,
		justifyContent: "space-between",
		...SHADOWS.medium,
		shadowColor: COLORS.white,
	},
	logoContainer: {
		width: 50,
		height: 50,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.medium,
		justifyContent: "center",
		alignItems: "center",
	},
	logoImage: {
		width: "70%",
		height: "70%",
	},
	companyName: {
		fontSize: SIZES.medium,
		fontFamily: FONT.regular,
		color: "#B3AEC6",
		marginTop: SIZES.small / 1.5,
	},
	infoContainer: {
		marginTop: SIZES.large,
	},
	jobName: {
		fontSize: SIZES.large,
		fontFamily: FONT.medium,
		color: COLORS.primary,
	},
	infoWrapper: {
		flexDirection: "row",
		marginTop: 5,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	publisher: {
		fontSize: SIZES.medium - 2,
		fontFamily: FONT.bold,
		color: COLORS.primary,
	},
	location: {
		fontSize: SIZES.medium - 2,
		fontFamily: FONT.regular,
		color: "#B3AEC6",
	},
});

export default styles;

import { COLORS, SIZES } from "../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 40,
	},
	input: {
		borderWidth: 1,
		borderColor: "#cccccc",
		borderRadius: 5,
		width: "80%",
		marginBottom: 20,
		padding: 10,
		fontSize: 16,
	},
	button: {
		backgroundColor: COLORS.tertiary,
		borderRadius: SIZES.small,
		width: "80%",
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 16,
	},
	buttonText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	FormText: {
		fontSize: 16,
	},
	FormLink: {
		color: COLORS.tertiary,
	},
});

export default styles;

import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ title, info, roomNo }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.headText}>{title}</Text>

			<View style={styles.contentBox}>
				<Text style={styles.contextText}>Room Info: {info}</Text>
			</View>

			<View style={styles.contentBox}>
				<Text style={styles.contextText}>Room Number: {roomNo}</Text>
			</View>
		</View>
	);
};

export default About;

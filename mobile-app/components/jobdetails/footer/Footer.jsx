import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ url }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.likeBtn}
				onPress={() =>
					alert(
						"The button on right will take you to Chrome Browser to see CCTV real-time footage"
					)
				}
			>
				<Image
					source={icons.chevronRight}
					resizeMode="contain"
					style={styles.likeBtnImage}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.applyBtn}
				onPress={() => Linking.openURL(url)}
			>
				<Text style={styles.applyBtnText}>Check the Live Video</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Footer;

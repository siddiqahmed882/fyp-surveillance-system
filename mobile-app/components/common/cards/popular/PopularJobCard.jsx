import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item, handleCardPress }) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				handleCardPress(item);
			}}
		>
			<TouchableOpacity style={styles.logoContainer}>
				<Image
					source={{
						uri: checkImageURL(item.email)
							? item.email
							: "https://www.pngkey.com/png/detail/254-2547897_security-camera-logo-png-download-video-surveillance-icon.png",
					}}
					resizeMode="contain"
					style={styles.logoImage}
				/>
			</TouchableOpacity>
			<View style={styles.infoContainer}>
				<Text style={styles.jobName} numberOfLines={1}>
					{item.title ? item.title : "No Notifications yet"}
				</Text>
				<Text style={styles.location}>{item.body ? item.body : null}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default PopularJobCard;

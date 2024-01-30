import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri:
              checkImageURL(item.email) && item.email !== undefined
                ? "https://www.pngkey.com/png/detail/254-2547897_security-camera-logo-png-download-video-surveillance-icon.png"
                : "https://www.pngkey.com/png/detail/254-2547897_security-camera-logo-png-download-video-surveillance-icon.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {item.room_name ? item.room_name : "No Room Registered yet."}
        </Text>
        <Text style={styles.jobType}>
          {item.device_name ? item.device_name : null}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;

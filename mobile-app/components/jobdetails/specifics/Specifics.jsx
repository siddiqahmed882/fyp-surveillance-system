import { View, Text } from "react-native";

import { WebView } from "react-native-webview";
import styles from "./specifics.style";
import { getURL } from "../../../utils";
import { JobFooter } from "../..";

const Specifics = ({ title, specificType, points, deviceId, deviceData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      {specificType === "Camera" ? (
        <>
          <WebView
            source={{ uri: `${getURL("video_feed")}/${points}` }}
            style={{ height: 225, width: "100%" }}
            onError={(error) => console.log("WebView error:", error)}
            mixedContentMode="always"
          />

          <JobFooter
            url={
              deviceData
                ? `${getURL("video_feed")}/${deviceData}`
                : "https://careers.google.com/jobs/results/"
            }
          />
        </>
      ) : (
        <View style={styles.pointsContainer}>
          <View style={styles.pointWrapper}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>Device Info: {points}</Text>
          </View>

          <View style={styles.pointWrapper}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>Device Id: {deviceId}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Specifics;

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = ({ isLoading, error, data }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Rooms</Text>
        <TouchableOpacity>
          {/* <Text style={styles.headerBtn}>Show all</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading || data?.length === 0 ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went Wrong</Text>
        ) : (
          data?.map((item) => (
            <NearbyJobCard
              item={item}
              key={`nearby-job-${item?.id}`}
              handleNavigate={() => {
                router.push(`/job-details/${item.id}`);
              }}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;

import { useRouter } from "expo-router";
import { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";

import { SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, Welcome } from "../components";
import useNearByJobsFetch from "../hook/useNearByJobsFetch";
import useNotificationFetch from "../hook/useNotificationFetch";

export const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data, error, isLoading, refetch } = useNearByJobsFetch(null);
  const {
    data: notifications,
    isLoading: isNotificationsLoading,
    error: notificationError,
    refetch: notificationRefetch,
  } = useNotificationFetch();

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetch(), notificationRefetch()]);
    setRefreshing(false);
  };

  console.log(data, notifications);
  return (
    <ScrollView
      showVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Welcome
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={() => {
            if (searchTerm) {
              setSearchTerm("");
              router.push(`/search/${searchTerm}`);
            }
          }}
        />
        <Popularjobs
          data={notifications}
          isLoading={isNotificationsLoading}
          error={notificationError}
        />
        <Nearbyjobs data={data} error={error} isLoading={isLoading} />
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

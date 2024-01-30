import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";
import { getData } from "../utils";
import axiosInstance from "../constants/axios";
export const AddRoom = () => {
  const navigation = useNavigation();

  const [deviceType, setDeviceType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");

  const handleDeviceTypeChange = (value) => {
    setDeviceType(deviceType === value ? "" : value);
    setRoomName("");
    setRoomNumber("");
    setDeviceId("");
    setDeviceName("");
    setDeviceInfo("");
  };

  const handleSubmit = async () => {
    const obj = {
      device_type: deviceType,
      device_name: deviceName,
      device_id: deviceId,
      device_info: deviceInfo,
      room_no: parseInt(roomNumber),
      room_name: roomName,
    };
    try {
      const result = await getData(null);
      const response = await axiosInstance.post("/room/", obj, {
        headers: { Authorization: `Bearer ${result.token}` },
      });
      alert("An IoT device has been added");
      navigation.navigate("Home");
      setDeviceType("");
      setRoomName("");
      setRoomNumber("");
      setDeviceId("");
      setDeviceName("");
      setDeviceInfo("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Add IoT Device</Text>

        <View style={{ marginBottom: 20 }}>
          <Text>Device Type:</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginTop: 5,
            }}
            onPress={() => handleDeviceTypeChange("Sensor")}
          >
            <Text>
              {deviceType === "Sensor" ? "Sensor (selected)" : "Sensor"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginTop: 5,
            }}
            onPress={() => handleDeviceTypeChange("Camera")}
          >
            <Text>
              {deviceType === "Camera" ? "Camera (selected)" : "Camera"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginTop: 5,
            }}
            onPress={() => handleDeviceTypeChange("")}
          >
            <Text>{deviceType === "" ? "None (selected)" : "None"}</Text>
          </TouchableOpacity>
        </View>

        {deviceType === "Sensor" && (
          <View style={{ marginBottom: 20 }}>
            <Text>Room Name:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter room name"
              value={roomName}
              onChangeText={setRoomName}
            />
            <Text>Room Number:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter room number"
              value={roomNumber}
              onChangeText={setRoomNumber}
            />
            <Text>Sensor Name:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter sensor name"
              value={deviceName}
              onChangeText={setDeviceName}
            />
            <Text>Sensor ID:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter sensor ID"
              value={deviceId}
              onChangeText={setDeviceId}
            />
            <Text>Device Info:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter Device info"
              value={deviceInfo}
              onChangeText={setDeviceInfo}
            />
          </View>
        )}

        {deviceType === "Camera" ? (
          <View style={{ marginBottom: 20 }}>
            <Text>Room Name:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter room name"
              value={roomName}
              onChangeText={setRoomName}
            />
            <Text>Room Number:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter room number"
              value={roomNumber}
              onChangeText={setRoomNumber}
            />
            <Text>Camera Name:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter camera name"
              value={deviceName}
              onChangeText={setDeviceName}
            />
            <Text>Camera ID:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter camera ID"
              value={deviceId}
              onChangeText={setDeviceId}
            />
            <Text>Device Info:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              placeholder="Enter Device info"
              value={deviceInfo}
              onChangeText={setDeviceInfo}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            borderRadius: SIZES.medium,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.tertiary,
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRoom;

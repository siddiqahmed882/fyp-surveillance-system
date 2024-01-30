import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import {
  useGetRapidPendingRidesQuery,
  useGetSharedPendingRidesQuery,
} from "../../state/api";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import carImage from "../../assets/Asset 3car-for-map.png";
import carImage2 from "../../assets/Asset 2car-for-map.png";
import { RefreshOutlined } from "@mui/icons-material";

const PendingRides = (props) => {
  const {
    data: sharedRidesData,
    isLoading: isLoadingSharedRides,
    refetch: refetchSharedRides,
  } = useGetSharedPendingRidesQuery();

  const {
    data: rapidRidesData,
    isLoading: isLoadingRapidRides,
    refetch: refetchRapidRides,
  } = useGetRapidPendingRidesQuery();

  const [pendingSharedRides, setPendingSharedRides] = useState([]);

  const [pendingRapidRides, setPendingRapidRides] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const reformedData =
      sharedRidesData &&
      sharedRidesData.data &&
      sharedRidesData.data.rides.length > 0 &&
      sharedRidesData.data.rides.map((ride) => ({
        rideId: ride.id,
        userId: ride.passenger.id,
        passengerEmail: ride.passenger.email,
        status: ride.status,
        rideType: "Shared Express",
        isPriorityRide: ride.isPriorityRide ? "True" : "False",
        hasChild: ride.hasChild ? "True" : "False",
        companion: ride.companion != null ? ride.companion.id : "No companion",
        startingPoint: ride.startingPoint,
        endingPoint: ride.endingPoint,
        createdAt: ride.createdAt,
      }));
    setPendingRapidRides(reformedData);
  }, [sharedRidesData]);

  useEffect(() => {
    const reformedData2 =
      rapidRidesData &&
      rapidRidesData.data &&
      rapidRidesData.data.rides.length > 0 &&
      rapidRidesData.data.rides.map((ride) => ({
        rideId: ride.id,
        userId: ride.passenger.id,
        passengerEmail: ride.passenger.email,
        status: ride.status,
        rideType: "Rapid Express",
        startingPoint: ride.pickup,
        endingPoint: ride.dropOff,
        createdAt: ride.createdAt,
      }));
    setPendingSharedRides(reformedData2);
  }, [rapidRidesData]);

  const [mapState, setMapState] = React.useState({
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: null,
    rideType: null,
    rideStatus: null,
  });

  const onMarkerClick = (
    rideId,
    userId,
    rideType,
    passengerEmail,
    companionName = null,
    startingPoint,
    endingPoint,
    createdAt
  ) => {
    setMapState({
      rideId,
      userId,
      activeMarker: `${startingPoint.lat},${startingPoint.lng}`,
      rideType,
      passengerEmail,
      companionName,
      startingPoint,
      endingPoint,
      createdAt,
      showingInfoWindow: true,
    });
  };

  const onInfoWindowClose = () => {
    setMapState({
      activeMarker: null,
      showingInfoWindow: false,
      rideType: null,
      rideStatus: null,
    });
  };

  const onViewDetails = (id, rideType, e) => {
    if (id != null && rideType != null) {
      navigate(`/single-ride/${id}`, {
        state: {
          rideId: id,
          rideType:
            rideType === "Shared Express" ? "sharedExpress" : "rapidExpress",
        },
      });
    }
  };

  const handleInfoWindowOpen = () => {
    const html = (
      <div>
        <h3>
          {"User Id: "}
          {mapState.rideId != null ? mapState.rideId : "Default"}
        </h3>
        <h3>
          {"Passenger Id: "}
          {mapState.userId != null ? mapState.userId : "Default"}
        </h3>
        <h5>
          {"Co-ordinates: "}
          {mapState.activeMarker != null ? mapState.activeMarker : "Default"}
          <br />
          {"Ride Type: "}
          {mapState.rideType != null ? mapState.rideType : "Default"}
          <br />
          {"Passenger Email: "}
          {mapState.passengerEmail != null
            ? mapState.passengerEmail
            : "Default"}
          <br />
          {"Companion Name: "}
          {mapState.companionName != null ? mapState.companionName : "Default"}
          <br />
          {"Starting Point Name: "}
          {mapState.startingPoint.address != null
            ? mapState.startingPoint.address
            : "Default"}
          <br />
          {mapState.startingPoint.lat != null &&
          mapState.startingPoint.lng != null
            ? `Lat: ${mapState.startingPoint.lat}, Lng: ${mapState.startingPoint.lng}`
            : "Default"}
          <br />
          {"Ending Point Name: "}
          {mapState.endingPoint.address != null
            ? mapState.endingPoint.address
            : "Default"}
          <br />
          {mapState.endingPoint.lat != null && mapState.endingPoint.lng != null
            ? `Lat: ${mapState.endingPoint.lat}, Lng: ${mapState.endingPoint.lng}`
            : "Default"}{" "}
          <br />
          {"Created At: "}
          {mapState.createdAt != null ? mapState.createdAt : "Default"}
        </h5>
        {/* <button
          style={{ cursor: "pointer" }}
          onClick={(e) => onViewDetails(mapState.userId, mapState.rideType, e)}
        >
          View Details
        </button> */}
      </div>
    );
    ReactDOM.render(React.Children.only(html), document.getElementById("iwd"));
  };

  const handleRefetch = () => {
    refetchSharedRides();
    refetchRapidRides();
  };

  return !isLoadingRapidRides && !isLoadingSharedRides ? (
    <Box m="1.5rem 2.5rem">
      <Header title="PENDING RIDES" subtitle="Shared and Rapid Rides" />

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() => handleRefetch()}
      >
        Refresh <RefreshOutlined sx={{ ml: "5px" }} />
      </Button>

      <Box
        mt="40px"
        mb="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
        style={{ position: "relative" }}
      >
        <Map
          google={props.google}
          zoom={11}
          initialCenter={{
            lat: 24.958, // Specify the initial latitude
            lng: 67.057, // Specify the initial longitude
          }}
        >
          {pendingSharedRides &&
            pendingSharedRides.length > 0 &&
            pendingSharedRides.map((item, index) => (
              <Marker
                onClick={() =>
                  onMarkerClick(
                    item.rideId,
                    item.userId,
                    item.rideType,
                    item.passengerEmail,
                    item.startingPoint,
                    item.endingPoint,
                    item.createdAt
                  )
                }
                key={item.rideId}
                name={item.passengerEmail}
                icon={{
                  url: carImage,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(25, 40),
                }}
                position={{
                  lat: item.startingPoint.lat,
                  lng: item.startingPoint.lng,
                }}
              />
            ))}

          {pendingRapidRides &&
            pendingRapidRides.length > 0 &&
            pendingRapidRides.map((item, index) => (
              <Marker
                onClick={() =>
                  onMarkerClick(
                    item.rideId,
                    item.userId,
                    item.rideType,
                    item.passengerEmail,
                    item.companionName,
                    item.startingPoint,
                    item.endingPoint,
                    item.createdAt
                  )
                }
                key={item.rideId}
                name={item.passengerEmail}
                icon={{
                  url: carImage2,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(25, 40),
                }}
                position={{
                  lat: item.startingPoint.lat,
                  lng: item.startingPoint.lng,
                }}
              />
            ))}

          <InfoWindow
            onClose={onInfoWindowClose}
            marker={mapState.activeMarker}
            visible={mapState.showingInfoWindow}
            onOpen={() =>
              handleInfoWindowOpen(mapState.rideType, mapState.rideStatus)
            }
          >
            <div id="iwd" />
          </InfoWindow>
        </Map>
      </Box>
      <Header
        style={{ marginBottom: "20px" }}
        // title="Marker Info"
        subtitle="Click the Red Marker to see info of Ride."
      />
    </Box>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBVS4hNSxdpKlxpHWrbe02IJ0tQjhQBdhQ",
})(PendingRides);

import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { useGetLiveRidesQuery } from "../../state/api";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import carImage from "../../assets/google-marker-car-image.png";
import { RefreshOutlined } from "@mui/icons-material";

const LiveRides = (props) => {
  const { data, isLoading, refetch } = useGetLiveRidesQuery();

  const [latLng, setLatLng] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme(); // Assuming you pass the theme as a prop

  useEffect(() => {
    if (data && data.data && data.data.rides.length > 0) {
      const reformedData = data.data.rides.map((ride) => ({
        rideId: ride.id,
        status: ride.status,
        rideType: ride.rideType,
        lat: ride.driverLocation.lat,
        lng: ride.driverLocation.lng,
      }));
      setLatLng(reformedData);
    }
  }, [data]);

  const [mapState, setMapState] = React.useState({
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: null,
    rideType: null,
    rideStatus: null,
  });

  const onMarkerClick = (name, marker, rideType, rideStatus) => {
    setMapState({
      selectedPlace: name,
      activeMarker: marker,
      rideType: rideType,
      rideStatus: rideStatus,
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
          {"Ride Id: "}
          {mapState.selectedPlace != null ? mapState.selectedPlace : "Default"}
        </h3>
        <h5>
          {"Co-ordinates: "}
          {mapState.activeMarker != null ? mapState.activeMarker : "Default"}
        </h5>
        <h5>
          {"Ride Type: "}
          {mapState.rideType != null ? mapState.rideType : "Default"}
        </h5>
        <h5>
          {"Ride Status: "}
          {mapState.rideStatus != null ? mapState.rideStatus : "Default"}
        </h5>
        <button
          style={{ cursor: "pointer" }}
          onClick={(e) =>
            onViewDetails(mapState.selectedPlace, mapState.rideType, e)
          }
        >
          View Details
        </button>
      </div>
    );
    ReactDOM.render(React.Children.only(html), document.getElementById("iwd"));
  };

  return !isLoading ? (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LIVE RIDES"
        subtitle="Find where your rides are located."
      />

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() => refetch()}
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
          {latLng.length > 0 &&
            latLng.map((item, index) => (
              <Marker
                onClick={() =>
                  onMarkerClick(
                    item.rideId,
                    `${item.lat},${item.lng}`,
                    item.rideType,
                    item.status
                  )
                }
                key={item.rideId}
                name={item.name}
                icon={{
                  url: carImage,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={{ lat: item.lat, lng: item.lng }} // Specify marker position
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
})(LiveRides);

import React, { useEffect, useState } from "react";
import { useGetSingleCustomerQuery } from "../../state/api";
import {
  Box,
  useTheme,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import Header from "../../components/Header";
import profileImage from "../../assets/profile.jpg";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import Documents from "./Documents";
import UserDetailsCard from "./UserDetailsCard";
import PassengerDetailsCard from "./PassengerDetailsCard";
import DriverDetailsCard from "./DriverDetailsCard";
import VehicleDetailsCard from "./VehicleDetailsCard";

const SingleCustomer = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleCustomerQuery(id);
  const [formData, setFormData] = useState(null);
  const [hovered, setHovered] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const [updatedDriverProfileStatus, setUpdatedDriverProfileStatus] =
    useState(null);
  const [updatedPassengerProfileStatus, setUpdatedPassengerProfileStatus] =
    useState(null);
  const [updatedVehicleStatus, setUpdatedVehicleStatus] = useState({
    id: null,
    status: null,
  });

  const statusType = [
    {
      value: "underReview",
      label: "Under Review",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "suspended",
      label: "Suspended",
    },
  ];

  const accessToken = useSelector((state) => state.global.authToken);

  useEffect(() => {
    if (!isLoading && data != null && data !== undefined) {
      console.log(data.data.user.data);
      setFormData({
        id: data.data.user.data.id,
        name: data.data.user.data.fullName,
        email: data.data.user.data.email,
        phoneNumber: data.data.user.data.phoneNumber,
        role: data.data.user.data.roles.join(", "),
        profilePic: data.data.user.data.profilePic,
        gender: data.data.user.data.gender === "F" ? "Female" : "Male",
        driverProfile: data.data.user.data.driverProfile,
        passengerProfile: data.data.user.data.passengerProfile,
        cnicNumber: data.data.user.data.cnicNumber,
      });
    }
  }, [isLoading, data]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdatedStatusSubmit = async (e) => {
    e.preventDefault();
    console.log(
      updatedDriverProfileStatus,
      updatedPassengerProfileStatus,
      updatedVehicleStatus
    );

    if (updatedDriverProfileStatus != null) {
      try {
        const response = await axios.patch(
          `${localStorage.getItem("baseUrl")}admin/driver-profiles/status`,
          {
            driverProfileId: formData.driverProfile.id,
            status: updatedDriverProfileStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        alert(response.data.message);
        refetch();
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }

    if (updatedPassengerProfileStatus != null) {
      try {
        const response = await axios.patch(
          `${localStorage.getItem("baseUrl")}admin/passenger-profiles/status`,
          {
            passengerProfileId: formData.passengerProfile.id,
            status: updatedPassengerProfileStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        alert(response.data.message);
        refetch();
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }

    if (
      updatedVehicleStatus.id != null &&
      updatedVehicleStatus.status != null
    ) {
      try {
        const response = await axios.patch(
          `${localStorage.getItem("baseUrl")}admin/vehicles/${
            updatedVehicleStatus.id
          }`,
          {
            status: updatedVehicleStatus.status,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        alert(response.data.message);
        refetch();
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }

    // window.location.reload();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMER" subtitle="Details of Customer" />
      <Box
        mt="40px"
        height="80vh"
        display="block"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {formData == null || isLoading ? (
          "Loading..."
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {formData.profilePic ? (
                <Card
                  variant="outlined"
                  style={{
                    height: "50vh",
                    backgroundColor: "transparent",
                    width: "70vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0",
                    position: "relative", // Added to position the overlay properly
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                      Profile Picture
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    style={{
                      height: hovered ? 200 : 140, // Adjust the size as needed
                      width: hovered ? 200 : 140,
                      transition: "all 0.3s", // Add smooth transition
                      borderRadius: "50%", // To make it a circular image
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setModalImage(formData.profilePic || profileImage);
                      setOpenModal(true);
                    }}
                    image={formData.profilePic || profileImage}
                    title="User Image"
                  />
                </Card>
              ) : null}

              {formData.name ? (
                <UserDetailsCard
                  key={id}
                  id={id}
                  name={formData.name}
                  cnicNumber={formData.cnicNumber}
                  email={formData.email}
                  role={formData.role}
                  gender={formData.gender}
                />
              ) : null}

              {formData.passengerProfile ? (
                <PassengerDetailsCard
                  id={formData.passengerProfile.id}
                  status={formData.passengerProfile.status}
                  statusType={statusType}
                  handleUpdatedStatusSubmit={handleUpdatedStatusSubmit}
                  setUpdatedPassengerProfileStatus={
                    setUpdatedPassengerProfileStatus
                  }
                />
              ) : null}

              {formData.driverProfile ? (
                <DriverDetailsCard
                  id={formData.driverProfile.id}
                  status={formData.driverProfile.status}
                  statusType={statusType}
                  handleUpdatedStatusSubmit={handleUpdatedStatusSubmit}
                  setUpdatedDriverProfileStatus={setUpdatedDriverProfileStatus}
                />
              ) : null}

              {formData.driverProfile &&
              formData.driverProfile.vehicles.length > 0
                ? formData.driverProfile.vehicles.map((vehicle, index) => (
                    <VehicleDetailsCard
                      key={index}
                      id={vehicle.id}
                      isSelected={vehicle.selected}
                      color={vehicle.color}
                      model={vehicle.model}
                      year={vehicle.year}
                      noOfSeats={vehicle.noOfSeats}
                      engineCapacity={vehicle.engineCapacity}
                      isAcAvailable={vehicle.isAcAvailable}
                      isTrunkAvailable={vehicle.isTrunkAvailable}
                      licensePlateNumber={vehicle.licensePlateNumber}
                      status={vehicle.status}
                      handleUpdatedStatusSubmit={handleUpdatedStatusSubmit}
                      setUpdatedVehicleStatus={setUpdatedVehicleStatus}
                    />
                  ))
                : null}
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Zoomed Image</DialogTitle>
              <DialogContent>
                <img
                  src={modalImage}
                  alt="Zoomed"
                  style={{ width: 500, height: 500 }}
                />
              </DialogContent>
            </Dialog>
          </>
        )}

        <Documents />
      </Box>
    </Box>
  );
};

export default SingleCustomer;

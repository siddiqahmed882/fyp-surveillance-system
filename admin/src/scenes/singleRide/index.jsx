import React, { useEffect, useState } from "react";
import { useGetSingleRideQuery } from "../../state/api";
import {
  Box,
  useTheme,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  FormControlLabel,
  Switch,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header";
import profileImage from "../../assets/profile.jpg";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";

const SingleRide = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { data, isLoading } = useGetSingleRideQuery({
    id: state.rideId,
    type: state.rideType,
  });

  const [formData, setFormData] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // const [isVerified, setIsVerified] = useState([]);

  const rows = [
    {
      id: 1,
      name: "Profile Picture",
      image: formData != null ? formData.profilePic : profileImage,
    },
    {
      id: 2,
      name: "CNIC Front Picture",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.cnicFrontPic
          : profileImage,
    },
    {
      id: 3,
      name: "CNIC Back Picture",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.cnicBackPic
          : profileImage,
    },
    {
      id: 4,
      name: "License Plate Number",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.licensePic
          : profileImage,
    },
    {
      id: 5,
      name: "Assign Admin Role",
      image: formData != null ? formData.profilePic : profileImage,
    },
  ];

  const [toggleBtn, setToggleBtn] = useState(Array(rows.length).fill(false));

  const columns = [
    {
      field: "name",
      headerName: "Picture Name",
      width: 250,
    },
    {
      field: "picture",
      headerName: "Picture",
      width: 150,
      renderCell: (params) => (
        <Card>
          <CardMedia
            component="img"
            style={{
              height: 40, // Adjust the size as needed
              width: 40,
              cursor: "pointer",
            }}
            onClick={() => {
              setModalImage(params.row.image || profileImage);
              setOpenModal(true);
            }}
            image={
              params.row.name === "Assign Admin Role"
                ? profileImage
                : params.row.image || profileImage
            }
            title="User Image"
          />
        </Card>
      ),
    },
    {
      field: "toggleSwitch",
      headerName: "Is Verified",
      width: 150,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Switch
              checked={toggleBtn[params.id - 1]}
              onChange={() => handleToggleSwitch(params)}
              color="warning"
            />
          }
        />
      ),
    },
    {
      field: "inputField",
      headerName: "Remarks",
      width: 250,
      renderCell: (params) => (
        <TextField
          id={`inputField-${params.id}`}
          label={params.row.name + " Remark"}
          variant="outlined"
          size="small"
          fullWidth
          // You can handle the input change with onChange prop
          onChange={(e) => handleToggleSwitch(params, e.target.value)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (!isLoading && data != null && data !== undefined) {
      setFormData({
        rideDetails: {
          id: data.data.ride.id,
          status: data.data.ride.status,
          createdAt: data.data.ride.createdAt,
        },
        driver: data.data.ride.driver,
        passenger: data.data.ride.passenger,
        companion: data.data.ride.companion,
        pickup: data.data.ride.pickup,
        dropOff: data.data.ride.dropOff,
        fare: data.data.ride.fare,
        vehicle: data.data.ride.vehicle,
        rideCancellation: data.data.ride.rideCancellation,
      });

      data?.data?.user?.driverProfile?.vehicles.map((vehicle, index) =>
        rows.push({
          id: index + 6,
          name: "Vehicle " + (index + 1) + " Registration Picture",
          image: vehicle.vehicleRegistrationPic,
        })
      );
    }
  }, [isLoading, data]);

  const handleToggleSwitch = (params, value = 0) => {
    setToggleBtn((prevToggleBtns) => {
      const newToggleBtns = [...prevToggleBtns];
      newToggleBtns[params.id - 1] = !newToggleBtns[params.id - 1];
      return newToggleBtns;
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    // Handle form submission here, e.g., update data in the backend
    // console.log("Form submitted with data:", formData);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Ride" subtitle="Details of Ride" />
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
              {formData.rideDetails ? (
                <Card
                  variant="outlined"
                  style={{
                    // height: "50vh",
                    backgroundColor: "transparent",
                    width: "70vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h3"
                      paddingTop={3}
                      component="div"
                    >
                      Ride Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ride Id : {formData.rideDetails.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status : {formData.rideDetails.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created At : {formData.rideDetails.createdAt}
                    </Typography>

                    {formData.driver ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Driver Details
                        </Typography>
                        {formData.driver.profilePicture ? (
                          <Card
                            variant="outlined"
                            style={{
                              height: "30%",
                              backgroundColor: "transparent",
                              width: "50%",
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
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Profile Picture
                              </Typography>
                            </CardContent>
                            <CardMedia
                              component="img"
                              style={{
                                height: hovered ? 100 : 40, // Adjust the size as needed
                                width: hovered ? 100 : 40,
                                transition: "all 0.3s", // Add smooth transition
                                borderRadius: "50%", // To make it a circular image
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setModalImage(
                                  formData.driver.profilePicture || profileImage
                                );
                                setOpenModal(true);
                              }}
                              image={
                                formData.driver.profilePicture || profileImage
                              }
                              title="User Image"
                            />
                          </Card>
                        ) : null}
                        <Typography variant="body2" color="text.secondary">
                          Driver Id: {formData.driver.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Name: {formData.driver.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gender: {formData.driver.gender}
                        </Typography>
                      </>
                    ) : null}

                    {formData.passenger ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Passenger Details
                        </Typography>
                        {formData.passenger.profilePicture ? (
                          <Card
                            variant="outlined"
                            style={{
                              height: "30%",
                              backgroundColor: "transparent",
                              width: "50%",
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
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Profile Picture
                              </Typography>
                            </CardContent>
                            <CardMedia
                              component="img"
                              style={{
                                height: hovered ? 100 : 40, // Adjust the size as needed
                                width: hovered ? 100 : 40,
                                transition: "all 0.3s", // Add smooth transition
                                borderRadius: "50%", // To make it a circular image
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setModalImage(
                                  formData.passenger.profilePicture ||
                                    profileImage
                                );
                                setOpenModal(true);
                              }}
                              image={
                                formData.passenger.profilePicture ||
                                profileImage
                              }
                              title="User Image"
                            />
                          </Card>
                        ) : null}
                        <Typography variant="body2" color="text.secondary">
                          Passenger Id: {formData.passenger.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Name: {formData.passenger.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gender: {formData.passenger.gender}
                        </Typography>
                      </>
                    ) : null}

                    {formData.companion ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Companion Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Name: {formData.companion.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gender: {formData.companion.gender}
                        </Typography>
                      </>
                    ) : null}

                    {formData.pickup ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Pick Up Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Address: {formData.pickup.address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Time:
                          {formData.pickup.time == null
                            ? "Not yet reached"
                            : formData.pickup.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Co-ordinates: {formData.pickup.coords.lat}
                          {", "}
                          {formData.pickup.coords.lng}
                        </Typography>
                      </>
                    ) : null}

                    {formData.dropOff ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Drop Off Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Address: {formData.dropOff.address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Time:
                          {formData.dropOff.time == null
                            ? "Not yet reached"
                            : formData.dropOff.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Co-ordinates: {formData.dropOff.coords.lat}
                          {", "}
                          {formData.dropOff.coords.lng}
                        </Typography>
                      </>
                    ) : null}

                    {formData.vehicle ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Vehicle Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Id: {formData.vehicle.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Brand:
                          {formData.vehicle.brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Model:
                          {formData.vehicle.model}
                        </Typography>{" "}
                        <Typography variant="body2" color="text.secondary">
                          Color:
                          {formData.vehicle.color}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Category:
                          {formData.vehicle.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          License Plate Number:
                          {formData.vehicle.licensePlateNumber}
                        </Typography>
                      </>
                    ) : null}

                    {formData.fare ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Fare Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tips: {formData.fare.tips}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Waiting Charges:
                          {formData.fare.waitingCharges}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Distance Charges:
                          {formData.fare.distanceCharges}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Base Charges:
                          {formData.fare.baseCharges}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status:
                          {formData.fare.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method:
                          {formData.fare.paymentMethod}
                        </Typography>
                      </>
                    ) : null}

                    {formData.rideCancellation ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Ride Cancellation Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Reason: {formData.rideCancellation.reason}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Time: {formData.rideCancellation.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cancelled By: {formData.rideCancellation.cancelledBy}
                        </Typography>
                      </>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}
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

            {formData.driverProfile && (
              <>
                <Box
                  sx={{
                    height: 400,
                    width: "70vw",
                    margin: "0 auto",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    width: "70vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                    marginBottom: "10rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SingleRide;

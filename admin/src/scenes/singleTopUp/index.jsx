import React, { useState } from "react";
import { useGetSingleTopUpQuery } from "../../state/api";
import {
  Box,
  useTheme,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import Header from "../../components/Header";
import profileImage from "../../assets/profile.jpeg";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

const SingleTopUp = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { data, isLoading } = useGetSingleTopUpQuery(state.topUpId);

  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const [updateTopUp, setUpdateTopUp] = useState(false);
  const [topUpData, setTopUpData] = useState({
    amount: 0,
    status: "pending",
    remarks: null,
  });

  const accessToken = localStorage.getItem("token");

  const topUpStatusType = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "approved",
      label: "Approved",
    },
    {
      value: "rejected",
      label: "Rejected",
    },
  ];

  const modifiedData = data?.data?.topup
    ? {
        id: data.data.topup.id,
        amount: data.data.topup.amount,
        status: data.data.topup.status,
        imageUrl: data.data.topup.image.url,
        imageRemarks: data.data.topup.image.remarks,
        submittedByName: data.data.topup.submittedBy.name,
        submittedByProfilePic:
          data.data.topup.submittedBy.profilePic || profileImage,
        submittedByEmail: data.data.topup.submittedBy.email,
        submittedByPhoneNumber: data.data.topup.submittedBy.phoneNumber,
        createdAt: data.data.topup.createdAt,
      }
    : null;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      amount: Number(topUpData.amount),
      status: topUpData.status,
    };

    if (topUpData.remarks != null) {
      data.remarks = topUpData.remarks;
    }

    await axios
      .put(
        `${localStorage.getItem("baseUrl")}admin/topups/${state.topUpId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("Response", res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });

    window.location.reload();
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMER" subtitle="Details of Customer" />
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() =>
          setUpdateTopUp((prev) => (prev === false ? true : false))
        }
      >
        Top Up
      </Button>

      {updateTopUp === true && (
        <Box>
          <React.Fragment>
            <h2>Update Top Up</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-select-currency"
                select
                label="Status"
                defaultValue={topUpData.status}
                sx={{ mb: 4 }}
                onChange={(e) =>
                  setTopUpData({
                    ...topUpData,
                    status: e.target.value,
                  })
                }
              >
                {topUpStatusType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Amount"
                  onChange={(e) =>
                    setTopUpData({ ...topUpData, amount: e.target.value })
                  }
                  value={topUpData.amount}
                  fullWidth
                  required
                />
              </Stack>
              {topUpData.status === "rejected" ? (
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Remarks"
                  onChange={(e) =>
                    setTopUpData({
                      ...topUpData,
                      remarks: e.target.value,
                    })
                  }
                  value={topUpData.remarks}
                  required
                  fullWidth
                  sx={{ mb: 4, mr: 2 }}
                />
              ) : null}

              <Button variant="outlined" color="secondary" type="submit">
                Submit
              </Button>
            </form>
            <small>
              {/* Already have an account? <Link to="/login">Login Here</Link> */}
            </small>
          </React.Fragment>
        </Box>
      )}

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
        {modifiedData == null || isLoading ? (
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
              {modifiedData.imageUrl ? (
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
                      Submitted Verification Image
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
                      setModalImage(modifiedData.imageUrl || profileImage);
                      setOpenModal(true);
                    }}
                    image={modifiedData.imageUrl || profileImage}
                    title="User Image"
                  />
                </Card>
              ) : null}

              {modifiedData.submittedByProfilePic ? (
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
                      Submitted By Person Profile Image
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
                      setModalImage(
                        modifiedData.submittedByProfilePic || profileImage
                      );
                      setOpenModal(true);
                    }}
                    image={modifiedData.submittedByProfilePic || profileImage}
                    title="User Image"
                  />
                </Card>
              ) : null}

              {modifiedData.id ? (
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
                      Top Up Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Id : {modifiedData.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Amount : {modifiedData.amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status : {modifiedData.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created At : {modifiedData.createdAt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Image Remarks : {modifiedData.imageRemarks}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submitted By Name : {modifiedData.submittedByName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submitted By Email : {modifiedData.submittedByEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submitted By Phone Number :{" "}
                      {modifiedData.submittedByPhoneNumber}
                    </Typography>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default SingleTopUp;

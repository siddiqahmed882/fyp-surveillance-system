import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const VehicleDetailsCard = ({
  id,
  isSelected,
  color,
  model,
  year,
  noOfSeats,
  engineCapacity,
  isAcAvailable,
  isTrunkAvailable,
  licensePlateNumber,
  status,
  handleUpdatedStatusSubmit,
  setUpdatedVehicleStatus,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 545,
        minWidth: 545,
        marginTop: "1.5rem",
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 28 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Vehicles Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {id}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Is the Selected Vehicle: {isSelected ? "Yes" : "No"}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Status: {status}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Color: {color}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Year: {year}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Model: {model}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Number of Seats: {noOfSeats}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Engine Capacity: {engineCapacity}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Is the AC Available: {isAcAvailable}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Is the Trunk Available: {isTrunkAvailable}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          License Plate Number: {licensePlateNumber}
        </Typography>

        <React.Fragment>
          <h2>Update Status</h2>
          <form onSubmit={(e) => handleUpdatedStatusSubmit(e)}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Type"
                defaultValue={status}
                sx={{ mb: 4, mr: 2 }}
                onChange={(e) =>
                  setUpdatedVehicleStatus({ id: id, status: e.target.value })
                }
              >
                <MenuItem key="underReview" value="underReview">
                  Under Review
                </MenuItem>
                <MenuItem key="active" value="active">
                  Active
                </MenuItem>
                <MenuItem key="reject" value="reject">
                  Reject
                </MenuItem>
              </TextField>
            </Stack>
            <Button variant="outlined" color="secondary" type="submit">
              Submit
            </Button>
          </form>
        </React.Fragment>
      </CardContent>
    </Card>
  );
};

export default VehicleDetailsCard;

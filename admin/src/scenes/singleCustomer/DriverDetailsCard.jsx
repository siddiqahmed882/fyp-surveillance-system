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
import React, { useState } from "react";

const DriverDetailsCard = ({
  id,
  status,
  handleUpdatedStatusSubmit,
  setUpdatedDriverProfileStatus,
  statusType,
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
          Driver Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {id}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Status: {status}
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
                onChange={(e) => setUpdatedDriverProfileStatus(e.target.value)}
              >
                {statusType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
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

export default DriverDetailsCard;

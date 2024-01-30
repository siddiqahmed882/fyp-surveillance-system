import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const DetailsCard = ({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
  rideId,
  rideType,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 545,
        minWidth: 545,
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
          Report Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {id}
        </Typography>

        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Title: {title}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Description: {description}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Status: {status}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Priority: {priority}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Created At: {createdAt}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Ride Id: {rideId}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Ride Type: {rideType}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default DetailsCard;

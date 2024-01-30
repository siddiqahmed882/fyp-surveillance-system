import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const UserDetailsCard = ({ id, name, email, cnicNumber, role, gender }) => {
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
          User Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {id}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          FullName: {name}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          CNIC Number: {cnicNumber}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Email: {email}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Role: {role}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Gender: {gender}
        </Typography>
      </CardContent>

      {/* <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Name: {name}</Typography>
            <Typography>CNIC Number: {cnicNumber}</Typography>
            <Typography>Role: {role}</Typography>
            <Typography>Gender: {gender}</Typography>
          </CardContent>
        </Collapse> */}
    </Card>
  );
};
export default UserDetailsCard;

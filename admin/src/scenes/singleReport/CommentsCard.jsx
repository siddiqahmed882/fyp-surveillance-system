import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const CommentsCard = ({ id, text, createdAt, sequenceNumber, commentBy }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
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
          Comment {sequenceNumber}
        </Typography>

        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {id}
        </Typography>

        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Text: {text}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Created At: {createdAt}
        </Typography>

        <Typography
          sx={{ fontSize: 20, mt: "1.5rem" }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Commented By
        </Typography>

        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[400]}>
          {commentBy.id}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[400]}>
          {commentBy.fullName}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[400]}>
          {commentBy.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CommentsCard;

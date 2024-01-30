import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { useGetReportsQuery } from "../../state/api";

const Review = ({
  _id,
  title,
  description,
  status,
  rating,
  priority,
  creator,
  ride,
  assignee,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {description}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Status: {status}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{`Priority: ${priority}`}</Typography>
      </CardContent>
      <CardActions>
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
          <Typography>Creator Id: {creator.id}</Typography>
          <Typography>Creator Name: {creator.name}</Typography>
          <Typography>Creator Role: {creator.role}</Typography>
          <Typography>
            Assignee Id: {assignee && assignee.id ? assignee.id : "Unassigned"}
          </Typography>
          <Typography>
            Assignee Name:{" "}
            {assignee && assignee.id ? assignee.name : "Unassigned"}
          </Typography>
          <Typography>Ride Id: {ride.id ? ride.id : "Unassigned"}</Typography>
          <Typography>
            Ride Type: {ride.id ? ride.type : "Unassigned"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Reviews = () => {
  const { data, isLoading } = useGetReportsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  let modifiedData =
    data?.data?.map((element) => ({
      ...element,
      _id: element.id,
    })) || [];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="REVIEWS" subtitle="See your list of reviews" />
      {modifiedData && !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {modifiedData.map((report) => (
            <Review
              key={report._id}
              _id={report._id}
              rating={2}
              title={report.title}
              description={report.description}
              ride={report.ride}
              creator={report.creator}
              priority={report.priority}
              status={report.status}
              assignee={report.assignee}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Reviews;

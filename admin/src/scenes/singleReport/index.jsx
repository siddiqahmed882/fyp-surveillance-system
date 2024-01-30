import { Box, Button, Card, MenuItem, Stack, TextField } from "@mui/material";
import Header from "../../components/Header";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleReportQuery } from "../../state/api";
import UserCard from "./UserCard";
import { useTheme } from "@emotion/react";
import DetailsCard from "./DetailsCard";
import CommentsCard from "./CommentsCard";
import axios from "axios";
import { REPORT_PRIORITY, REPORT_STATUS } from "./config";

const SingleReport = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleReportQuery(id);
  const theme = useTheme();

  const [addComment, setAddComment] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    status: "inProgress",
    priority: "low",
  });

  const [commentData, setCommentData] = useState("");

  const modifiedData = data?.data?.report;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, commentData);

    await axios
      .post(
        `${localStorage.getItem("baseUrl")}admin/report-tickets/${id}/comments`,
        { text: commentData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res?.data);
        alert("Comment added successfully");
        refetch();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });
  };

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    console.log(id, updateStatus);

    await axios
      .patch(
        `${localStorage.getItem("baseUrl")}admin/report-tickets/${id}`,
        { status: updateStatus.status, priority: updateStatus.priority },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res?.data);
        alert("Comment added successfully");
        refetch();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Report" subtitle="Details of Report" />
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() => setAddComment((prev) => (prev === false ? true : false))}
      >
        Add Comment
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() => setAddStatus((prev) => (prev === false ? true : false))}
      >
        Update Comment
      </Button>

      {addComment === true && (
        <Box>
          <React.Fragment>
            <h2>Add a Comment</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Comment"
                  fullWidth
                  onChange={(e) => setCommentData(e.target.value)}
                  value={commentData}
                  required
                />
              </Stack>
              <Button variant="outlined" color="secondary" type="submit">
                Submit
              </Button>
            </form>
          </React.Fragment>
        </Box>
      )}

      {addStatus === true && (
        <Box>
          <React.Fragment>
            <h2>Update Report Status</h2>
            <form onSubmit={(e) => handleUpdateStatusSubmit(e)}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type"
                  defaultValue={
                    updateStatus.status != null
                      ? updateStatus.status
                      : "inProgress"
                  }
                  sx={{ mb: 4, mr: 2 }}
                  onChange={(e) =>
                    setUpdateStatus({
                      status: e.target.value,
                      priority: updateStatus.priority,
                    })
                  }
                >
                  {REPORT_STATUS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type"
                  defaultValue={
                    updateStatus.priority != null
                      ? updateStatus.priority
                      : "low"
                  }
                  sx={{ mb: 4, mr: 2 }}
                  onChange={(e) =>
                    setUpdateStatus({
                      status: updateStatus.status,
                      priority: e.target.value,
                    })
                  }
                >
                  {REPORT_PRIORITY.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Button variant="outlined" color="secondary" type="submit">
                Submit
              </Button>
            </form>
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
              {modifiedData.id ? (
                <DetailsCard
                  key={modifiedData.id}
                  id={modifiedData.id}
                  title={modifiedData.title}
                  description={modifiedData.description}
                  status={modifiedData.status}
                  priority={modifiedData.priority}
                  createdAt={modifiedData.createdAt}
                  rideId={modifiedData.rideId}
                  rideType={modifiedData.rideType}
                />
              ) : null}

              {modifiedData.creator ? (
                <UserCard
                  key={modifiedData.creator.id}
                  id={modifiedData.creator.id}
                  title="Creator"
                  fullName={modifiedData.creator.fullName}
                  phoneNumber={modifiedData.creator.phoneNumber}
                />
              ) : null}

              {modifiedData.assignee ? (
                <UserCard
                  key={modifiedData.assignee.id}
                  id={modifiedData.assignee.id}
                  title="Assignee"
                  fullName={modifiedData.assignee.fullName}
                  phoneNumber={modifiedData.assignee.phoneNumber}
                />
              ) : null}

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
                {modifiedData.comments.length > 0
                  ? modifiedData.comments.map((comment, index) => (
                      <CommentsCard
                        key={comment.id}
                        id={modifiedData.id}
                        sequenceNumber={index + 1}
                        text={comment.text}
                        createdAt={comment.createdAt}
                        commentBy={comment.commentBy}
                      />
                    ))
                  : null}
              </Card>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SingleReport;

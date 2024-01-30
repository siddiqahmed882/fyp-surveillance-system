import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useGetReportsQuery } from "../../state/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { TextField, Button, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ASSIGNEE } from "./config";

const Report = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetReportsQuery();

  const [addAsignee, setAddAsignee] = useState(false);

  const [reportData, setReportData] = useState({
    reportId: "",
    assigneeId: "admin",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    let data = {};
    if (reportData.assigneeId != null && reportData.assigneeId !== "admin") {
      data = {
        assigneeId: reportData.assigneeId,
      };
    }

    await axios
      .patch(
        `${localStorage.getItem("baseUrl")}admin/report-tickets/${
          reportData.reportId
        }/assign`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Report Ticket assigned successfully");
        setReportData({ reportId: "", assigneeId: "admin" });
        refetch();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }

  const reformedData = data?.data?.map((item) => {
    return {
      _id: item.id,
      title: item.title,
      description: item.description,
      status: item.status,
      priority: item.priority,
      creatorId: item.creator.id,
      creatorName: item.creator.name,
      creatorRole: item.creator.role,
      rideId: item.ride.id,
      rideType: item.ride.type,
      assigneeId: item.assignee != null ? item.assignee.id : "Null",
      assigneeName: item.assignee != null ? item.assignee.name : "Null",
    };
  });

  const handleDeleteClick = (params) => {
    console.log(params.row);
    axios
      .delete(
        `${localStorage.getItem("baseUrl")}admin/discount-codes/` +
          params.row._id
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    window.location.reload();
  };

  const handleEditClick = (id) => {
    console.log("Edit Click", id);
    navigate(`/single-report/${id}`);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.5,
    },
    {
      field: "creatorId",
      headerName: "Creator Id",
      flex: 1,
    },
    {
      field: "creatorName",
      headerName: "Creator Name",
      flex: 1,
    },
    {
      field: "creatorRole",
      headerName: "Creator Role",
      flex: 1,
    },
    {
      field: "rideId",
      headerName: "Ride Id",
      flex: 1,
    },
    {
      field: "rideType",
      headerName: "Ride Type",
      flex: 1,
    },
    {
      field: "assigneeId",
      headerName: "Assignee Id",
      flex: 1,
    },
    {
      field: "assigneeName",
      headerName: "Assignee Name",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",

      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Reports" subtitle="Entire list of Reports" />
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() => setAddAsignee((prev) => (prev === false ? true : false))}
      >
        Assign a Report
      </Button>

      {addAsignee === true && (
        <Box>
          <React.Fragment>
            <h2>Assign to Admin/Moderator</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Report Id"
                  fullWidth
                  onChange={(e) =>
                    setReportData({ ...reportData, reportId: e.target.value })
                  }
                  value={reportData.reportId}
                  required
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Assignee Id"
                  defaultValue={reportData.assigneeId}
                  fullWidth
                  sx={{ mb: 4, mr: 2 }}
                  onChange={(e) =>
                    setReportData({
                      ...reportData,
                      assigneeId: e.target.value,
                    })
                  }
                >
                  {ASSIGNEE.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
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
        height="80vh"
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
        <DataGrid
          loading={reformedData && reformedData.length > 0 ? false : true}
          getRowId={(row) => row._id}
          rows={
            (reformedData && reformedData.length > 0 ? reformedData : []) || []
          }
          columns={columns}
          rowCount={(reformedData && reformedData.length) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                _id: false,
                creatorId: false,
                rideId: false,
                assigneeId: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Report;

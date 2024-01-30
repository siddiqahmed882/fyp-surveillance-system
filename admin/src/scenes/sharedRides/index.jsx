import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useGetSharedRidesQuery } from "../../state/api";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const SharedRides = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetSharedRidesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const reformedData = data?.data?.rides?.map((rapidRide) => {
    return {
      _id: rapidRide.id,
      driverName: rapidRide.driver.name,
      passengerName: rapidRide.passenger.name,
      driverPhoneNumber: rapidRide.driver.phoneNumber,
      driverId: rapidRide.driver.id,
      passengerId: rapidRide.passenger.id,
      fare: rapidRide.fare,
      paymentMethod: rapidRide.paymentMethod,
      status: rapidRide.status,
      isPriorityRide: rapidRide.isPriorityRide ? "True" : "False",
      createdAt: rapidRide.createdAt,
    };
  });

  const handleViewClick = (id) => {
    navigate(`/single-customer/${id}`, { state: { customerId: id } });
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
      editable: true,
    },
    {
      field: "driverName",
      headerName: "Driver Name",
      flex: 1,
    },
    {
      field: "passengerName",
      headerName: "Passenger Name",
      flex: 1,
    },
    {
      field: "driverPhoneNumber",
      headerName: "Driver Phone Number",
      flex: 1,
    },
    {
      field: "fare",
      headerName: "Total Fare",
      flex: 0.5,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 0.75,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "isPriorityRide",
      headerName: "Is Priority Ride",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Driver Details",
      flex: 0.75,
      cellClassName: "actions",

      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            className="textPrimary"
            onClick={() => handleViewClick(params.row.driverId)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "actions2",
      type: "actions",
      headerName: "Passenger Details",
      flex: 0.75,
      cellClassName: "actions",

      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            className="textPrimary"
            onClick={() => handleViewClick(params.row.passengerId)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "editaActions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (id) => {
    navigate(`/single-ride/${id}`, {
      state: { rideId: id, rideType: "sharedExpress" },
    });
  };

  const handleDeleteClick = () => {};

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SHARED RIDES" subtitle="Track your Shared Rides here" />
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
                driverPhoneNumber: false,
                createdAt: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SharedRides;

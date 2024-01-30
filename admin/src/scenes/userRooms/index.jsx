import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery, useGetUserRoomsQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { setCustomerId } from "../../state/index";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { VisibilityOutlined } from "@mui/icons-material";

const UserRooms = ({ userType, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetUserRoomsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      editable: true,
    },
    {
      field: "user_id",
      headerName: "User Id",
      flex: 0.5,
      editable: true,
    },
    {
      field: "room_no",
      headerName: "Room Number",
      flex: 0.5,
      editable: true,
    },
    {
      field: "room_name",
      headerName: "Room Name",
      flex: 0.5,
      editable: true,
    },
    {
      field: "device_id",
      headerName: "Device Id",
      flex: 0.5,
      editable: true,
    },
    {
      field: "device_name",
      headerName: "Device Name",
      flex: 0.5,
      editable: true,
    },
    {
      field: "device_type",
      headerName: "Device Type",
      flex: 0.5,
    },
    {
      field: "device_info",
      headerName: "Device Info",
      flex: 0.5,
    },
  ];

  const handleSaveClick = () => {};

  const handleEditClick = (id) => {
    dispatch(setCustomerId(id));
    navigate(`/single-customer/${id}`, { state: { customerId: id } });
  };

  const handleCancelClick = () => {};

  const handleDeleteClick = () => {};

  let modifiedData =
    data?.data?.map((element) => ({
      ...element,
      _id: element.id,
    })) || [];

  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={userType} subtitle={"List of " + userType} />
      <Box
        mt="40px"
        height="75vh"
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={modifiedData || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserRooms;

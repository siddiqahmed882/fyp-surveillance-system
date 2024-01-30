import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useGetAccessLinksQuery, useGetCustomersQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { setCustomerId } from "../../state/index";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { VisibilityOutlined } from "@mui/icons-material";
import axios from "axios";

const AccessLinks = ({ userType, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, refetch } = useGetAccessLinksQuery();

  const [addAccessLink, setAddAccessLink] = useState(false);

  const accessLinkDataType = [
    {
      value: "percentage",
      label: "Percentage",
    },
    {
      value: "amount",
      label: "Amount",
    },
  ];

  const [accessLinkData, setAccessLinkData] = useState({
    device_id: "",
    data: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      device_id: accessLinkData.device_id,
      data: accessLinkData.data,
    };
    await axios
      .post(`${localStorage.getItem("baseUrl")}admin/access-link`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Access Link added successfully");
        setAccessLinkData({
          device_id: "",
          data: "",
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });

    // window.location.reload();
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      editable: true,
    },
    {
      field: "device_id",
      headerName: "Device Id",
      flex: 0.5,
    },
    {
      field: "data",
      headerName: "Connection Link",
      flex: 0.5,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 0.5,
      cellClassName: "actions",

      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={(e) => handleDeleteClick(e, params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleSaveClick = () => {};

  const handleEditClick = (id) => {
    dispatch(setCustomerId(id));
    navigate(`/single-customer/${id}`, { state: { customerId: id } });
  };

  const handleCancelClick = () => {};

  const handleDeleteClick = async (event, accessLinkId) => {
    event.preventDefault();

    console.log(accessLinkId);
    await axios
      .delete(
        `http://localhost:8001/api/v1/admin/access-link/${accessLinkId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Access Link deleted successfully");
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  let modifiedData =
    data?.data?.map((element) => ({
      ...element,
      _id: element.id,
    })) || [];

  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={userType} subtitle={"List of " + userType} />

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() =>
          setAddAccessLink((prev) => (prev === false ? true : false))
        }
      >
        Add Access Link
      </Button>

      {addAccessLink === true && (
        <Box>
          <React.Fragment>
            <h2>Create Access Link</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Device Id"
                  onChange={(e) =>
                    setAccessLinkData({
                      ...accessLinkData,
                      device_id: e.target.value,
                    })
                  }
                  value={accessLinkData.device_id}
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Connection Link"
                  onChange={(e) =>
                    setAccessLinkData({
                      ...accessLinkData,
                      data: e.target.value,
                    })
                  }
                  value={accessLinkData.data}
                  fullWidth
                  required
                />
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

export default AccessLinks;

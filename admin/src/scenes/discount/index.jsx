import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useGetDiscountQuery } from "../../state/api";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { TextField, Button, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import axios from "axios";

const Discount = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetDiscountQuery();

  const [addDiscount, setAddDiscount] = useState(false);

  const discountDataType = [
    {
      value: "percentage",
      label: "Percentage",
    },
    {
      value: "amount",
      label: "Amount",
    },
  ];

  const [discountData, setDiscountData] = useState({
    name: "",
    description: "",
    code: "",
    type: "percentage",
    maxUses: 0,
    percentage: 0,
    amount: 0,
    startDate: Date.now(),
    endDate: Date.now(),
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: discountData.name,
      description: discountData.description,
      code: discountData.code,
      type: discountData.type,
      amount: Number(discountData.amount),
      percentage: Number(discountData.percentage),
      maxUses: Number(discountData.maxUses),
      startDate: discountData.startDate,
      endDate: discountData.endDate,
    };
    await axios
      .post(`${localStorage.getItem("baseUrl")}admin/discount-codes`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Discount code added successfully");
        setDiscountData({
          name: "",
          description: "",
          code: "",
          type: "percentage",
          maxUses: 0,
          percentage: 0,
          amount: 0,
          startDate: Date.now(),
          endDate: Date.now(),
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });

    // window.location.reload();
  }

  const reformedData = data?.data?.map((item) => {
    return {
      _id: item.id,
      name: item.name,
      description: item.description,
      code: item.code,
      type: item.type,
      startDate: item.startDate,
      endDate: item.endDate,
      maxUses: item.maxUses,
      isValid: item.isValid,
      percentage: item.type === "percentage" ? item.percentage : 0,
      amount: item.type === "amount" ? item.amount : 0,
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
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "maxUses",
      headerName: "Max Uses",
      flex: 1,
    },
    {
      field: "isValid",
      headerName: "Is Valid",
      flex: 1,
    },
    {
      field: "percentage",
      headerName: "Percentage",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
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
      <Header title="Discount Codes" subtitle="Entire list of Discount Codes" />
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{ mt: "1rem" }}
        onClick={() =>
          setAddDiscount((prev) => (prev === false ? true : false))
        }
      >
        Add Discount
      </Button>

      {addDiscount === true && (
        <Box>
          <React.Fragment>
            <h2>Create Discount Code</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Name"
                  onChange={(e) =>
                    setDiscountData({ ...discountData, name: e.target.value })
                  }
                  value={discountData.name}
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Description"
                  onChange={(e) =>
                    setDiscountData({
                      ...discountData,
                      description: e.target.value,
                    })
                  }
                  value={discountData.description}
                  fullWidth
                  required
                />
              </Stack>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Code"
                onChange={(e) =>
                  setDiscountData({ ...discountData, code: e.target.value })
                }
                value={discountData.code}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="number"
                variant="outlined"
                color="secondary"
                label="Max Uses"
                onChange={(e) =>
                  setDiscountData({
                    ...discountData,
                    maxUses: parseInt(e.target.value),
                  })
                }
                value={discountData.maxUses}
                required
                // fullWidth
                sx={{ mb: 4, mr: 2 }}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Type"
                defaultValue={discountData.type}
                sx={{ mb: 4, mr: 2 }}
                onChange={(e) =>
                  setDiscountData({
                    ...discountData,
                    type: e.target.value,
                  })
                }
              >
                {discountDataType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {discountData.type === "percentage" ? (
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Percentage"
                  onChange={(e) =>
                    setDiscountData({
                      ...discountData,
                      percentage: parseInt(e.target.value),
                    })
                  }
                  value={discountData.percentage}
                  required
                  // fullWidth
                  sx={{ mb: 4, mr: 2 }}
                />
              ) : null}
              {discountData.type === "amount" ? (
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Amount"
                  onChange={(e) =>
                    setDiscountData({
                      ...discountData,
                      amount: parseInt(e.target.value),
                    })
                  }
                  value={discountData.amount}
                  required
                  // fullWidth
                  sx={{ mb: 4 }}
                />
              ) : null}
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Start Date"
                onChange={(e) =>
                  setDiscountData({
                    ...discountData,
                    startDate: e.target.value,
                  })
                }
                value={discountData.startDate}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="End Date"
                onChange={(e) =>
                  setDiscountData({ ...discountData, endDate: e.target.value })
                }
                value={discountData.endDate}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
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

export default Discount;

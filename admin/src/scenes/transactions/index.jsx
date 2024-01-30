import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../state/api";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [reformedData, setReformedData] = useState(null);
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  useEffect(() => {
    if (data != null && data.data.fares) {
      setReformedData(
        data.data.fares.map((fare) => {
          return {
            _id: fare.id,
            rideId: fare.rideId,
            rideType: fare.rideType,
            distanceCharges: fare.distanceCharges,
            durationCharges: fare.durationCharges,
            baseCharges: fare.baseCharges,
            waitingCharges: fare.waitingCharges,
            maintenanceCharges: fare.maintenanceCharges,
            salesTax: fare.salesTax,
            platformFee: fare.platformFee,
            status: fare.status,
            total: fare.total,
          };
        })
      );
    }
  }, [data]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      editable: true,
    },
    {
      field: "rideId",
      headerName: "Ride ID",
      flex: 1,
      editable: true,
    },
    {
      field: "rideType",
      headerName: "Ride Type",
      flex: 1,
    },
    {
      field: "distanceCharges",
      headerName: "Distance Charges",
      flex: 1,
    },
    {
      field: "durationCharges",
      headerName: "Duration Charges",
      flex: 1,
    },
    {
      field: "baseCharges",
      headerName: "Base Charges",
      flex: 1,
    },
    {
      field: "waitingCharges",
      headerName: "Waiting Charges",
      flex: 1,
    },
    {
      field: "maintenanceCharges",
      headerName: "Maintenance Charges",
      flex: 1,
    },
    {
      field: "salesTax",
      headerName: "Sales Tax",
      flex: 1,
    },
    {
      field: "platformFee",
      headerName: "Platform Fee",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total Cost",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
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
          loading={isLoading || reformedData == null}
          getRowId={(row) => row._id}
          rows={reformedData || []}
          columns={columns}
          rowCount={reformedData != null ? reformedData.length : 0 || 0}
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
                durationCharges: false,
                distanceCharges: false,
                baseCharges: false,
                waitingCharges: false,
                maintenanceCharges: false,
                platformFee: false,
                salesTax: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;

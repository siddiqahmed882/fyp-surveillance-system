import * as React from "react";
import { DOCUMENT_AND_TOPUP_STATUS } from "./config";
import {
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useUpdateDocumentMutation } from "../../state/api";

function DocumentsDataGrid({ data, title }) {
  const accessToken = useSelector((state) => state.global.authToken);

  const [documents, setDocuments] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const [updateDocument] = useUpdateDocumentMutation();

  const columns = [
    {
      field: "name",
      headerName: "Picture Name",
      width: 250,
    },
    {
      field: "picture",
      headerName: "Picture",
      width: 250,
      renderCell: (params) => (
        <Card>
          <CardMedia
            component="img"
            style={{
              height: 40, // Adjust the size as needed
              width: 40,
              cursor: "pointer",
            }}
            onClick={() => {
              setModalImage(params.row.url);
              setOpenModal(true);
            }}
            image={params.row.url}
            title="User Image"
          />
        </Card>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: DOCUMENT_AND_TOPUP_STATUS,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 250,
      editable: true,
    },
  ];

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCellEditCommit = async (params) => {
    console.log("Params", params);
    let finalizedObject;
    const updatedRows = documents.map((document) => {
      if (document.id === params.id) {
        const updatedObject = { ...document, [params.field]: params.value };

        if (params.field === "status" && params.value === "rejected") {
          updatedObject.remarks = "Not approved by Admin";
        }

        if (params.field === "status" && params.value === "approved") {
          updatedObject.remarks = "Approved by Admin";
        }

        if (params.field === "status" && params.value === "uploaded") {
          updatedObject.remarks = "Waiting for approval by Admin";
        }

        finalizedObject = updatedObject;
        return updatedObject;
      }
      return document;
    });

    updateDocument({
      formData: {
        documentId: finalizedObject.id,
        status: finalizedObject.status,
        remarks: finalizedObject.remarks,
      },
    })
      .then((res) => {
        setSnackbar({
          children: "Document updated successfully",
          severity: "success",
        });
        setDocuments(updatedRows);
      })
      .catch((error) => {
        setSnackbar({
          children: error.message,
          severity: "error",
        });
      });

    // setDocuments(updatedRows);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={documents}
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        hideFooterPagination
        hideFooter
        rowHeight={5 * 16}
        rowSpacingType="margin"
        rowSpacing={5}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Zoomed Image</DialogTitle>
        <DialogContent>
          <img
            src={modalImage}
            alt="Zoomed"
            style={{ width: 500, height: 500 }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DocumentsDataGrid;

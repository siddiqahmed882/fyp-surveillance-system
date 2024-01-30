import { useParams } from "react-router-dom";
import { useGetAllDocumentsByUserIdQuery } from "../../state/api";
import { Box, Typography } from "@mui/material";
import DocumentsDataGrid from "./DocumentsDataGrid";

function Documents() {
  const { id: userId } = useParams();

  const {
    data: documentsResponse,
    isLoading,
    isError,
    error,
  } = useGetAllDocumentsByUserIdQuery(userId);

  let content = null;

  if (isLoading) {
    content = <Typography>Loading</Typography>;
  } else if (isError) {
    content = <Typography>{error.message}</Typography>;
  } else {
    if (
      documentsResponse.data.documents.length === 0 &&
      documentsResponse.data.vehicles.length === 0
    ) {
      content = <Typography>No Documents</Typography>;
    } else {
      content = (
        <>
          <DocumentsDataGrid
            data={documentsResponse.data.documents}
            title="User Documents"
          />
          {documentsResponse.data.vehicles.length > 0 &&
            documentsResponse.data.vehicles.map((vehicle) => (
              <DocumentsDataGrid
                key={vehicle.id}
                data={vehicle.documents}
                title="Vehicle Documents"
              />
            ))}
        </>
      );
    }
  }

  return (
    <Box flex={1} p={2}>
      {content}
    </Box>
  );
}

export default Documents;

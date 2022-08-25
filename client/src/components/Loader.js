import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loader() {
  return (
    <div className="bg-silver min-h-screen">
      <Box className="w-full h-96 flex justify-center items-center">
        <CircularProgress color="secondary" />
      </Box>
    </div>
  );
}

export default Loader;

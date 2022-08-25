import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function Alerts({ error, open, setOpen }) {
  return (
    <Stack
      className="alert"
      sx={{
        width: "40%",
        position: "fixed",
        top: "85px",
        left: "30%",
        zIndex: "1",
      }}
      spacing={2}
    >
      <Collapse in={open}>
        <Alert
          severity={error ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen("");
              }}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          <span className="text-alert">{open}</span>
        </Alert>
      </Collapse>
    </Stack>
  );
}

export default Alerts;

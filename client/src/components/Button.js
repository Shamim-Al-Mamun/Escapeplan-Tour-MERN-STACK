import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  borderRadius: "25px",
  height: "40px",
  minWidth: "150px",
  fontSize: "11px",
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export default ColorButton;

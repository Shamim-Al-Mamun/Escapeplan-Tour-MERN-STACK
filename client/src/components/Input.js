import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const CustomInput = styled(TextField)({
  "& label.Mui-focused": {
    color: purple[700],
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: purple[700],
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: purple[500],
    },
    "&.Mui-focused fieldset": {
      borderColor: purple[700],
    },
  },
});
const ColorInput = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <CustomInput
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};
export default ColorInput;

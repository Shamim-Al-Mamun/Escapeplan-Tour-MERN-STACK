import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Email from "@mui/icons-material/Email";
import Paper from "@mui/material/Paper";
import Key from "@mui/icons-material/Key";
import axios from "axios";
import ColorButton from "./Button";
import ColorInput from "./Input";
import Alerts from "./Alerts";
import Api from "../API/Api";

function ResetPass() {
  const { baseURL } = Api();

  const Navigate = useNavigate();

  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);

  const [newPass, setNewPass] = useState("");
  const [confirmnewPass, setConfirmNewPass] = useState("");

  const onsubmit = (e) => {
    const email = localStorage.getItem("forgotPass_email");
    e.preventDefault();
    if (newPass && confirmnewPass) {
      if (newPass === confirmnewPass) {
        axios
          .post(`${baseURL}/user/resetpass`, {
            email: email,
            password: newPass,
          })
          .then((res) => {
            const message = res.data.message;
            const reset = res.data.reset;
            if (reset) {
              setError(false);
              setOpen(message);
              setNewPass("");
              setConfirmNewPass("");
              Navigate("/login", { replace: true });
            }
          })
          .catch((err) => console.log(err));
      } else {
        setError(true);
        setOpen("Incorrent confirm Password!");
      }
    } else {
      setError(true);
      setOpen("Enter values!");
    }
  };

  return (
    <>
      <Alerts error={error} open={open} setOpen={setOpen} />
      <div className="w-full min-h-screen pt-20 ">
        <div className="bg-silver pt-20 min-h-screen">
          <Paper
            elevation={10}
            className="w-5/6 sm:w-2/4 m-auto p-3 rounded-md"
          >
            <p className="text-3xl text-center font-medium mb-3 py-2">
              Reset Password
            </p>
            <form onSubmit={onsubmit}>
              <div className="w-full sm:w-2/4 m-auto my-7">
                <ColorInput
                  className="w-full"
                  size="small"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  iconStart={<Key />}
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                />
              </div>
              <div className="w-full sm:w-2/4 m-auto my-7">
                <ColorInput
                  className="w-full"
                  size="small"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  iconStart={<Key />}
                  value={confirmnewPass}
                  onChange={(e) => {
                    setConfirmNewPass(e.target.value);
                  }}
                />
              </div>
              <div className="w-full text-center my-7">
                <ColorButton className="w-2/5" type="submit">
                  Submit
                </ColorButton>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default ResetPass;

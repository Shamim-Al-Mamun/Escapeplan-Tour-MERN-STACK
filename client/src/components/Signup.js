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

function Signup() {
  const { baseURL } = Api();

  const Navigate = useNavigate();

  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);

  const [signInfo, setSignInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = signInfo;

  const onsubmit = (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        axios
          .post(`${baseURL}/user/signup`, signInfo)
          .then((res) => {
            const message = res.data.message;
            const user = res.data.user;
            setError(!user);
            setOpen(message);
            Navigate("/login");
          })
          .catch((err) => console.log(err));
        setSignInfo({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
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
            className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 m-auto p-3 rounded-md"
          >
            <div>
              <Link className="text-sm underline" to="/login">
                <KeyboardBackspaceIcon />
              </Link>
            </div>
            <p className="text-3xl text-center font-medium mb-3">Sign Up</p>
            <form onSubmit={onsubmit}>
              <div className="w-full sm:w-2/4 m-auto my-7">
                <ColorInput
                  className="w-full"
                  label="User name"
                  placeholder="User name"
                  type="User name"
                  size="small"
                  iconStart={<PersonIcon />}
                  value={username}
                  onChange={(e) => {
                    setSignInfo({
                      ...signInfo,
                      username:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.toString().slice(1),
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-2/4 m-auto my-7">
                <ColorInput
                  className="w-full"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  size="small"
                  iconStart={<Email />}
                  value={email}
                  onChange={(e) => {
                    setSignInfo({ ...signInfo, email: e.target.value });
                  }}
                />
              </div>
              <div className="w-full sm:w-2/4 m-auto my-7">
                <ColorInput
                  className="w-full"
                  size="small"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  iconStart={<Key />}
                  value={password}
                  onChange={(e) => {
                    setSignInfo({ ...signInfo, password: e.target.value });
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
                  value={confirmPassword}
                  onChange={(e) => {
                    setSignInfo({
                      ...signInfo,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full text-center my-7">
                <ColorButton className="w-2/5" type="submit">
                  Sign up
                </ColorButton>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default Signup;

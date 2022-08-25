import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Visibility from "@mui/icons-material/Visibility";
import Email from "@mui/icons-material/Email";
import Key from "@mui/icons-material/Key";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../app/features/user/userSlice";
import ColorButton from "./Button";
import ColorInput from "./Input";
import Alerts from "./Alerts";
import Api from "../API/Api";

function Login() {
  const { baseURL } = Api();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginInfo;

  const onsubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (email && password) {
      axios
        .post(`${baseURL}/user/login`, loginInfo)
        .then((res) => {
          console.log(res.data);
          const token = res.data.access_token;
          if (token) {
            setLoading(false);
            setError(false);
            setOpen(res.data.message);
            dispatch(login(loginInfo));
            localStorage.setItem("EscapePlan_token", token);
            Navigate("/", { replace: true });
          } else {
            setLoading(false);
            setError(true);
            setOpen(res.data.message);
          }
          console.log(token);
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
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
            <p className="text-3xl text-center font-medium my-3">Login</p>
            <p className="text-sm text-center">
              Doesn't have an account yet?{" "}
              <Link className="text-purple underline" to="/signup">
                Signup
              </Link>
            </p>
            <form onSubmit={onsubmit}>
              <div className="w-full sm:w-2/4 m-auto my-7">
                <ColorInput
                  // error
                  className="w-full"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  size="small"
                  iconStart={<Email />}
                  value={email}
                  onChange={(e) => {
                    setLoginInfo({ ...loginInfo, email: e.target.value });
                  }}
                />
              </div>
              <div className="w-full sm:w-2/4 m-auto mt-7">
                <ColorInput
                  className="w-full"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  size="small"
                  iconStart={<Key />}
                  iconEnd={password && <Visibility />}
                  value={password}
                  onChange={(e) => {
                    setLoginInfo({ ...loginInfo, password: e.target.value });
                  }}
                />
              </div>
              <div className="w-full sm:w-2/4 m-auto flex justify-start">
                <Link
                  className="text-sm text-purple underline"
                  to="/forgotpassword"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="w-full text-center my-7">
                <ColorButton className="w-2/5" type="submit">
                  {loading && (
                    <svg
                      class="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Login
                </ColorButton>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import emailjs from "emailjs-com";
import Email from "@mui/icons-material/Email";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import ColorButton from "./Button";
import ColorInput from "./Input";
import Alerts from "./Alerts";
import Api from "../API/Api";

function ForgotPass() {
  const { baseURL } = Api();
  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  // random link Generate
  const generateLink = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    function generateString(length) {
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const Random = generateString(100);
    const link = `${Random.slice(1, Random.length)}`;
    localStorage.setItem("randomUrl_token", link);
    return link;
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (email) {
      axios.post(`${baseURL}/user/forgotpass`, { email: email }).then((res) => {
        const user = res.data.user;
        const message = res.data.message;
        if (user && user.length > 0) {
          generateLink();
          localStorage.setItem("forgotPass_email", email);
          const randomUrl_token = localStorage.getItem("randomUrl_token");
          console.log(randomUrl_token);
          const URL = window.location.host;
          const templateParams = {
            email: email,
            link: `${URL}/resetpassword/${randomUrl_token}`,
          };
          emailjs
            .send(
              "service_z56t325",
              "template_5r7bzxf",
              templateParams,
              "3Lz0qE7tu2R6ZvtgI"
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {});
          setError(false);
          setOpen("A reset link has been sent to this mail!");
          setEmail("");
        } else {
          setError(true);
          setOpen(message);
        }
      });
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
            <p className="text-3xl text-center mb-7 ">Forgot Password</p>
            <form onSubmit={onsubmit}>
              <div className="w-full sm:w-2/4 m-auto">
                <ColorInput
                  className="w-full"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  size="small"
                  iconStart={<Email />}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="w-full text-center my-7">
                <ColorButton className="w-2/5" type="submit">
                  Send
                </ColorButton>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default ForgotPass;

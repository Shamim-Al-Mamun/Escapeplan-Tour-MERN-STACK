import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { FaHome, FaPhone, FaPaperPlane } from "react-icons/fa";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import contactPhoto from "../Images/contactPhoto.jpg";
import ColorButton from "./Button";
import ColorInput from "./Input";
import Api from "../API/Api";

function Contact() {
  const { baseURL } = Api();

  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const timestamp = new Date().getTime();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    timestamp: timestamp,
  });
  const { name, email, subject, message } = contactInfo;

  const onsubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (name && email && subject && message) {
      axios
        .post(`${baseURL}/contact`, contactInfo)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setError(false);
          setOpen("Sent successfully!");
          setContactInfo({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
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
      <div className="w-full min-h-screen pt-20">
        <div className="sm:flex bg-silver pt-10 pb-20">
          <div className="w-5/6 lg:w-2/6 m-auto p-5 sm:w-3/4 md:w-3/4 h-5/6 flex justify-center">
            <Paper elevation={10} className="w-full text-center p-5">
              <p className="text-3xl text-purple">Contact us</p>
              <form onSubmit={onsubmit}>
                <div className="w-full px-3 my-5">
                  <ColorInput
                    label="Name"
                    className="w-full"
                    size="small"
                    value={name}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        name:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.toString().slice(1),
                      })
                    }
                  />
                </div>
                <div className="w-full px-3 my-5">
                  <ColorInput
                    label="Email"
                    className="w-full"
                    size="small"
                    value={email}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full px-3 my-5">
                  <ColorInput
                    label="subject"
                    className="w-full"
                    size="small"
                    value={subject}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        subject:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.toString().slice(1),
                      })
                    }
                  />
                </div>
                <div className="w-full px-3 my-5">
                  <ColorInput
                    label="message"
                    size="small"
                    className="w-full"
                    rows={4}
                    multiline
                    value={message}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        message:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.toString().slice(1),
                      })
                    }
                  />
                </div>
                <div className="my-3">
                  <ColorButton type="submit" endIcon={<SendIcon />}>
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
                    Send
                  </ColorButton>
                </div>
              </form>
            </Paper>
          </div>
          <div className="w-full sm:w-2/4 h-5/6 pt-10 flex items-center justify-center">
            <div className="px-5">
              <p className="text-center text-purple text-3xl">Address</p>
              <div className="w-full my-3 flex items-center">
                <div className="mr-5 text-purple text-xl">
                  <FaHome />
                </div>
                <p className="text-sm">
                  (650) 233-9755 28 Anderson Way Menlo Park, California(CA),
                  94025
                </p>
              </div>
              <div className="w-full my-3 flex items-center">
                <div className="mr-5 text-purple text-xl">
                  <FaPhone />
                </div>
                <p className="text-sm">4546464646346</p>
              </div>
              <div className="w-full my-3 flex items-center">
                <div className="mr-5 text-purple text-xl">
                  <FaPaperPlane />
                </div>
                <p className="text-sm">escapeplan@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full"
            style={{
              maxHeight: "650px",
            }}
            src={contactPhoto}
            alt="pic"
          />
        </div>
      </div>
    </>
  );
}

export default Contact;

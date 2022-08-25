import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaMagento,
} from "react-icons/fa";
import ColorButton from "./Button";
import Api from "../API/Api";

function Footer() {
  const { baseURL } = Api();
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    if (email) {
      axios
        .post(`${baseURL}/subscription`, { email: email })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      setOpen(true);
      setEmail("");
    }
  };

  return (
    <>
      <Stack
        className="alert"
        sx={{
          width: "40%",
          position: "fixed",
          bottom: "20px",
          left: "30%",
          zIndex: "1",
        }}
        spacing={2}
      >
        <Collapse in={open}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            <span className="text-alert">Sent successfully!</span>
          </Alert>
        </Collapse>
      </Stack>
      <div className="bg-secondaryColor text-white px-2 py-1">
        <p className="text-2xl lg:text-xl md:xs text-center py-2">
          Join our exclusive membership to receive the latest news and trends
        </p>
        <p className="text-sm text-gray text-center py-1">
          You can unsubscribe at any time.
        </p>
        <form onSubmit={onsubmit}>
          <div className="w-80 m-auto">
            <div className="w-full m-auto flex items-center p-2">
              <input
                className="mr-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ColorButton endIcon={<SendIcon />} type="submit">
                Send{" "}
              </ColorButton>
            </div>
          </div>
        </form>
        <div className="flex justify-around items-center pt-5">
          <p className="text-2xl pb-3 flex items-center">
            <span className="mr-1 text-primaryColor">
              {" "}
              <FaMagento />
            </span>{" "}
            Escape Plan
          </p>
          <div className="flex w-48 pb-3 justify-around">
            <a
              className="hover:text-hoverColor duration-300"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className="hover:text-hoverColor duration-300"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              className="hover:text-hoverColor duration-300"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className="hover:text-hoverColor duration-300"
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              className="hover:text-hoverColor duration-300"
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaPinterest />
            </a>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center">
          Copyright ©2022 All rights reserved | This template is made by{" "}
          <a
            href="https://mamun-projects.netlify.app/"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Mamun
          </a>{" "}
        </p>
      </div>
    </>
  );
}

export default Footer;

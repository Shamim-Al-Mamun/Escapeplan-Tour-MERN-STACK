import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";

import Api from "../API/Api";
import Loader from "./Loader";
import Timestamp from ".././utils/Timestamp";

function Messages() {
  const { baseURL } = Api();
  const [contact, setContact] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/contact`)
      .then((res) => {
        console.log(res);
        setContact(res.data.contacts);
      })
      .catch((err) => console.log(err));
  }, [baseURL]);

  return (
    <>
      {contact && !contact.length > 0 && <Loader />}
      <div className="w-full min-h-screen pt-20 pb-5">
        {contact.map((contact) => {
          return (
            <Paper elevation={6} className="sm:w-3/4 w-5/6 m-auto mt-10 p-5">
              <ul className="text-sm sm:text-lg">
                <li>
                  <span>Name: </span>
                  {contact.name}
                </li>
                <li>
                  {" "}
                  <span>Email: </span>
                  {contact.email}
                </li>
                <li>
                  {" "}
                  <span>Subject: </span>
                  {contact.subject}
                </li>
                <li>
                  {" "}
                  <span>Message: </span>
                  {contact.message}
                </li>
              </ul>
              <p className="text-xs flex items-center">
                <AccessTimeIcon sx={{ fontSize: "13px" }} />{" "}
                <span className="mx-1">{Timestamp(contact.timestamp)}</span>
              </p>
            </Paper>
          );
        })}
      </div>
    </>
  );
}

export default Messages;

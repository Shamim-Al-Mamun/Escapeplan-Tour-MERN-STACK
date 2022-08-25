import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Api from "../API/Api";
import Loader from "./Loader";

function Subscription() {
  const { baseURL } = Api();
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/subscription`)
      .then((res) => {
        console.log(res);
        setSubscription(res.data.subscriptions);
      })
      .catch((err) => console.log(err));
  }, [baseURL]);

  return (
    <>
      {subscription && !subscription.length > 0 && <Loader />}
      <div className="w-full min-h-screen pt-20">
        <Paper elevation={6} className="sm:w-3/4 w-5/6 m-auto mt-10">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <p className="font-semibold sm:text-2xl text-xl">
                      Subscriptions
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscription.map((email) => (
                  <TableRow
                    key={email.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{email.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}

export default Subscription;

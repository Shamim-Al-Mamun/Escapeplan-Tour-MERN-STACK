import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Loader from "./Loader";
import { fetchUsers } from "../app/features/users/usersSlice";
import { Button } from "@mui/material";

function BookingManage() {
  const { isLoading, users, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);
  console.log(isLoading);
  console.log(error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <div className="w-full min-h-screen pt-20">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red">{error}</p>
        ) : (
          <Paper elevation={6} className="sm:w-3/4 w-5/6 m-auto mt-10">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <p className="font-semibold sm:text-2xl text-md">
                        Username
                      </p>
                    </TableCell>
                    <TableCell align="center">
                      <p className="font-semibold sm:text-2xl text-md">Email</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className="font-semibold sm:text-2xl text-md">
                        Bookings
                      </p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.length > 0 &&
                    users.map(
                      (user) =>
                        user.booking.length > 0 && (
                          <TableRow
                            key={user.email}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              {user.username}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">
                              <div className="flex">
                                {user.booking.length > 0 &&
                                  user.booking.map((b) => {
                                    return (
                                      <Button
                                        style={{
                                          height: "30px",
                                          minWidth: "5px",
                                          fontSize: "8px",
                                          marginLeft: "3px",
                                        }}
                                        size="small"
                                        variant="contained"
                                      >
                                        {b.place}
                                      </Button>
                                    );
                                  })}
                              </div>
                              {/* {user[0].booking && <p>fsf</p>} */}
                            </TableCell>
                            {/* {users[0].booking && user[0].booking.length > 0 && (
                          <TableCell align="center">{user.email}</TableCell>
                        )} */}
                          </TableRow>
                        )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </div>
    </>
  );
}

export default BookingManage;

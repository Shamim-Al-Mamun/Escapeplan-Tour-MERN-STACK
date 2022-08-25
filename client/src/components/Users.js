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

function Users() {
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.length > 0 &&
                    users.map((user) => (
                      <TableRow
                        key={user.email}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </div>
    </>
  );
}

export default Users;

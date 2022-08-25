import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Loader from "./Loader";
import ColorButton from "./Button";
import { Link } from "react-router-dom";

import { fetchPackages } from "../app/features/packages/packagesSlice";
import { deletepackage } from "../app/features/packages/packagesSlice";

function PackageManage() {
  const { isLoading, packages, error } = useSelector((state) => state.packages);
  const dispatch = useDispatch();
  console.log(packages);
  console.log(isLoading);
  console.log(error);

  const handleDelete = (id) => {
    dispatch(deletepackage(id));
  };

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  return (
    <>
      <div className="w-full min-h-screen pt-20">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red">{error}</p>
        ) : (
          <>
            <Paper elevation={6} className="sm:w-3/4 w-5/6 m-auto mt-10">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Place</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Operations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {packages.map((packages) => (
                      <TableRow>
                        <TableCell align="center">{packages.place}</TableCell>
                        <TableCell align="center">
                          {packages.price}/= tk
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              handleDelete(packages._id);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="sm:w-3/4 w-5/6 m-auto mt-3 text-center p-5">
              <Link to="/manage/package/addnew">
                <ColorButton className="w-full sm:w-1/5 sm:m-auto">
                  Add Package
                </ColorButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PackageManage;

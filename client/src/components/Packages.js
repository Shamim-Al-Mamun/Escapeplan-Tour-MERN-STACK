import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import PackagePhoto from "../Images/packagPhoto.jpg";
import ColorButton from "./Button";

import Loader from "./Loader";
import { fetchPackages } from "../app/features/packages/packagesSlice";

function Packages() {
  const { isLoading, packages, error } = useSelector((state) => state.packages);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen pt-20">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red">{error}</p>
      ) : (
        <div className="bg-silver">
          <p className="text-3xl text-center py-5 text-purple">
            Our Monthly Tour Packages
          </p>
          {user && user.length < 1 && (
            <div className="md:flex flex-wrap justify-center py-3">
              {packages.map((packages) => {
                return (
                  <>
                    <Paper
                      elevation={12}
                      sx={{ maxWidth: 345, width: 300 }}
                      className="card mb-3 md:m-5 m-auto"
                    >
                      <Card variant="standard">
                        <CardMedia
                          component="img"
                          // height="140px"
                          style={{
                            height: "200px",
                            width: "300px",
                          }}
                          src={`/uploads/${packages.pic}`}
                          alt="packagepic"
                        />
                        <CardContent>
                          <Typography
                            className="flex justify-between"
                            gutterBottom
                            component="div"
                          >
                            <span className="text-2xl">{packages.place}</span>
                            <span className="text-md"> {packages.price}/=</span>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {packages.description.slice(0, 100) + "..."}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {/* <Button
                            style={{
                              borderRadius: "25px",
                              height: "40px",
                              minWidth: "150px",
                              fontSize: "11px",
                            }}
                            variant="contained"
                            color="success"
                          >
                            Booked
                          </Button> */}
                          <Link to="/login">
                            <ColorButton> Book now</ColorButton>
                          </Link>
                          <Button size="small">
                            <Link to={`/package/${packages._id}`}>
                              See details
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Paper>
                  </>
                );
              })}
            </div>
          )}
          {user && user.length > 0 && (
            <div className="md:flex flex-wrap justify-center py-3">
              {packages &&
                packages.length > 0 &&
                packages.map((packages) => {
                  return (
                    <>
                      <Paper
                        elevation={12}
                        sx={{ maxWidth: 345, width: 300 }}
                        className="card mb-3 md:m-5 m-auto"
                      >
                        <Card variant="standard">
                          <CardMedia
                            component="img"
                            // height="140px"
                            style={{
                              height: "200px",
                              width: "300px",
                            }}
                            src={`/uploads/${packages.pic}`}
                            alt="packagepic"
                          />
                          <CardContent>
                            <Typography
                              className="flex justify-between"
                              gutterBottom
                              component="div"
                            >
                              <span className="text-2xl">{packages.place}</span>
                              <span className="text-md">
                                {" "}
                                {packages.price}/=
                              </span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {packages.description.slice(0, 100) + "..."}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {user[0].booking.length > 0 &&
                              user[0].booking.map((b) => {
                                return (
                                  <>
                                    {b._id === packages._id && (
                                      <Button
                                        style={{
                                          borderRadius: "25px",
                                          height: "40px",
                                          minWidth: "150px",
                                          fontSize: "11px",
                                        }}
                                        variant="contained"
                                        color="success"
                                      >
                                        Booked
                                      </Button>
                                    )}
                                  </>
                                );
                              })}
                            <Button size="small">
                              <Link to={`/package/${packages._id}`}>
                                See details
                              </Link>
                            </Button>
                          </CardActions>
                        </Card>
                      </Paper>
                    </>
                  );
                })}
            </div>
          )}
          <div>
            <img
              className="w-full"
              style={{
                maxHeight: "650px",
              }}
              src={PackagePhoto}
              alt="package"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;

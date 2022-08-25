import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { fetchUser } from "../app/features/user/userSlice";

import Loader from "./Loader";
function Booking() {
  const { isLoading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchUser());
  }, [dispatch]);

  // const handleUpdate = (packages) => {
  //   if (user && user.length > 0) {
  //     const { _id, booking } = user[0];
  //     console.log(user[0]);
  //     console.log(booking);
  //     const updateUser = {
  //       ...user[0],
  //       booking: [...booking, packages._id],
  //     };
  //     const updated = {
  //       id: _id,
  //       user: updateUser,
  //     };
  //     console.log(updated.user.booking);
  //     dispatch(update(updated));
  //     dispatch(fetchUser());
  //   }
  // };
  // var packageBooked = [];
  // if (user && user.length > 0) {
  //   if (packages && packages.length > 0) {
  //     user[0].booking.map((booked) => {
  //       const favourite = packages.filter(
  //         (packages) => packages._id === booked
  //       );
  //       packageBooked.push(favourite[0]);
  //       console.log(booked);
  //       return 0;
  //     });
  //   }
  // }
  // console.log(packageBooked);

  return (
    <div className="w-full min-h-screen pt-20">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red">{error}</p>
      ) : (
        <div className="bg-silver min-h-screen">
          <p className="text-3xl text-center py-5 text-purple">
            Packages you booked
          </p>
          {user && user.length > 0 && (
            <div className="md:flex flex-wrap justify-center py-3">
              {user[0].booking.length > 0 &&
                user[0].booking.map((packages) => {
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
                                {packages.price}= tk
                              </span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {packages.description.slice(0, 100) + "..."}
                            </Typography>
                          </CardContent>
                          <CardActions>
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
              {user[0].booking < 1 && (
                <div>
                  <p className="text-center text-gray pt-10">No bookings yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Booking;

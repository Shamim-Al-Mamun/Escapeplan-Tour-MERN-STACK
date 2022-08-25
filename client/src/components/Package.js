import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { fetchPackage } from "../app/features/package/packageSlice";
import { fetchUser } from "../app/features/user/userSlice";
import { updateUser } from "../app/features/user/userSlice";
import Loader from "./Loader";
import ColorButton from "./Button";

function Package() {
  const { isLoading, Singlepackage, error } = useSelector(
    (state) => state.package
  );
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { packageID } = useParams();

  useEffect(() => {
    dispatch(fetchPackage(packageID));
  }, [dispatch, packageID]);

  const handleUpdate = (bookedPackages) => {
    if (user && user.length > 0) {
      const { _id, booking } = user[0];
      const updatedUser = {
        ...user[0],
        booking: [...booking, bookedPackages],
      };
      const updated = {
        id: _id,
        user: updatedUser,
      };
      dispatch(updateUser(updated));
      dispatch(fetchUser());
    }
  };
  var checkBooked = [];
  if (
    user &&
    user.length > 0 &&
    user[0].booking.length > 0 &&
    Singlepackage &&
    Singlepackage.length > 0
  ) {
    checkBooked = user[0].booking.filter((b) => b._id === Singlepackage[0]._id);
  }

  return (
    <div className="w-full min-h-screen pt-20">
      <div className="bg-silver py-5">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red">{error}</p>
        ) : (
          Singlepackage &&
          Singlepackage.length > 0 && (
            <Paper elevation={12} className="p-10 mx-3 md:m-10">
              {Singlepackage.map((packages) => {
                return (
                  <>
                    <img
                      className="w-5/6 md:w-3/6 rounded-md m-auto h-96"
                      src={`/uploads/${packages.pic}`}
                      alt="packagepic"
                    />
                    <div className=" flex justify-around mx-3">
                      <p className="w-full text-right m-5">{packages.place}</p>
                      <p className="w-full text-left m-5">{packages.price}/=</p>
                    </div>
                    <div className="text-center mb-3">
                      {checkBooked && checkBooked.length > 0 ? (
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
                      ) : (
                        <ColorButton
                          className="md:w-1/6 w-2/4"
                          onClick={(e) => {
                            handleUpdate(packages);
                          }}
                        >
                          Book now
                        </ColorButton>
                      )}
                    </div>
                    <p className="text-sm">{packages.description}</p>
                  </>
                );
              })}
            </Paper>
          )
        )}
      </div>
    </div>
  );
}

export default Package;

import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function Profile() {
  const { isLoading, user, error } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen pt-20">
      <div className="bg-silver py-10 min-h-screen">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red">{error}</p>
        ) : (
          user &&
          user.length > 0 && (
            <Paper elevation={10} className="sm:w-3/4 w-5/6 m-auto p-5 ">
              <div className="text-center">
                <div className="z-10 w-1/5 m-auto ml-4 flex ">
                  <img
                    className="border border-purple rounded-md mt-3"
                    src={`/uploads/${user[0].userImage}`}
                    alt="user pic"
                  />
                  <span className="pl-1">
                    <Link to="/change/userpic">
                      <EditIcon sx={{ fontSize: "12px" }} />
                    </Link>
                  </span>
                </div>
                <p className="pl-4 p-0 m-0 flex items-center">
                  <span>{user[0].username}</span>
                  <span className="mb-3 m-1">
                    <Link to="/change/name">
                      <EditIcon sx={{ fontSize: "12px" }} />
                    </Link>
                  </span>
                </p>
                <div>
                  <p className="pl-4 p-0 m-0 text-sm flex items-center">
                    <span>{user[0].email}</span>
                    <span className="mb-3 m-1">
                      <Link to="/change/email">
                        <EditIcon sx={{ fontSize: "12px" }} />
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </Paper>
          )
        )}
      </div>
    </div>
  );
}

export default Profile;

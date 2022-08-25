import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Menu() {
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Navigate("/");
    localStorage.removeItem("EscapePlan_token");
  };

  return (
    <div className="w-full min-h-screen pt-20">
      <div className="ml-2 font-medium bg-metal m-auto">
        <div className="flex justify-between py-3">
          {user && user.length > 0 && (
            <img
              className="border border-purple z-10 w-1/5 ml-4 rounded-md"
              src={`/uploads/${user[0].userImage}`}
              alt="user"
            />
          )}
          {user && user.length > 0 && (
            <p className="text-3xl text-end p-12 pt-3"> {user[0].username}</p>
          )}
        </div>
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li className="nav-item">
            <div className="ml-2 font-medium bg-metal sidebar">
              <ul className="w-full text-white ml-10">
                <li className="mb-2">
                  <Link className="cursor-pointer " to="/manage/profile">
                    Profile
                  </Link>
                </li>
                {user && user.length > 0 && user[0].type === "Admin" && (
                  <>
                    <li className="mb-2">
                      <Link className="cursor-pointer " to="/manage/package">
                        Packages
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="cursor-pointer " to="/manage/booking">
                        Bookings
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="cursor-pointer " to="/users">
                        Users
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="cursor-pointer " to="/messages">
                        Messages
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="cursor-pointer " to="/subscription">
                        Subscription
                      </Link>
                    </li>
                  </>
                )}
                {user && user.length > 0 && user[0].type === "General" && (
                  <li className="mb-2">
                    <Link className="cursor-pointer " to="/booking">
                      Booking
                    </Link>
                  </li>
                )}
                <li className="mb-2">
                  <span className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;

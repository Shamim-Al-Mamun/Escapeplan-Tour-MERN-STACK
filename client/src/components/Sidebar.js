import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Sidebar({ setSidebarOpen }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setSidebarOpen(false);
    localStorage.removeItem("EscapePlan_token");
    Navigate("/", { replace: true });
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between w-full z-30 px-2 py-3 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div
          className="lg:flex flex-grow items-center"
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <div className="ml-2 font-medium bg-metal sidebar">
                {user && user.length > 0 && (
                  <p className="text-3xl text-end pr-5 pb-3 pt-3">
                    {user[0].username}
                  </p>
                )}
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
    </nav>
  );
}

export default Sidebar;

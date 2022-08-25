import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMagento, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ setWindowWidth, setSidebarOpen, sidebarOpen, user }) {
  const Navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [currentScroll, setCurrentScroll] = useState(window.scrollY);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const handleWindowScroll = () => {
    setCurrentScroll(window.scrollY);
  };
  const handleWindowResize = () => {
    setCurrentWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", handleWindowResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWidth, currentScroll]);
  return (
    <nav
      className={
        currentScroll >= 66
          ? "relative flex flex-wrap items-center justify-between w-full z-40 px-2 py-3 mb-3 bg-navColor duration-500"
          : "relative flex flex-wrap items-center justify-between w-full z-40 px-2 py-3 mb-3"
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-3xl flex items-center font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            to="/"
          >
            <span className="m-1 text-primaryColor">
              <FaMagento />
            </span>{" "}
            <span className="text-bermuda">Escape Plan</span>
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded color-black block lg:hidden outline-none focus:outline-none text-purple sm:mt-0 mt-5"
            type="button"
            onClick={() => currentWidth < 1025 && setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-primaryColor hover:opacity-75"
                to="/"
                onClick={() =>
                  currentWidth < 1025 && setNavbarOpen(!navbarOpen)
                }
              >
                <span className="ml-2 font-medium">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-primaryColor hover:opacity-75"
                to="/testimonial"
                onClick={() =>
                  currentWidth < 1025 && setNavbarOpen(!navbarOpen)
                }
              >
                <span className="ml-2 font-medium">Testimonial</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-primaryColor hover:opacity-75"
                to="/packages"
                onClick={() =>
                  currentWidth < 1025 && setNavbarOpen(!navbarOpen)
                }
              >
                <span className="ml-2 font-medium">Package</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-primaryColor hover:opacity-75"
                to="/contact"
                onClick={() =>
                  currentWidth < 1025 && setNavbarOpen(!navbarOpen)
                }
              >
                <span className="ml-2 font-medium">Contact</span>
              </Link>
            </li>
            {user && user.length > 0 ? (
              <li className="nav-item">
                <img
                  className="propic border border-purple z-10"
                  src={`/uploads/${user[0].userImage}`}
                  alt="user"
                  onClick={() => {
                    currentWidth < 1025 && setNavbarOpen(!navbarOpen);
                    currentWidth > 1025
                      ? setSidebarOpen(!sidebarOpen)
                      : Navigate("/menu");
                  }}
                />
                {/* {currentWidth > 1025 && sidebarOpen && <Sidebar />} */}
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-primaryColor hover:opacity-75"
                  to="/login"
                  onClick={() =>
                    currentWidth < 1025 && setNavbarOpen(!navbarOpen)
                  }
                >
                  <span className="ml-2 font-medium">Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

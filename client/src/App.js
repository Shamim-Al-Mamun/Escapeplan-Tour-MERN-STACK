import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ForgotPass from "./components/ForgotPass";
import Navbar from "./components/header/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Packages from "./components/Packages";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Testimonial from "./components/Testimonial";
import Loader from "./components/Loader";
import Booking from "./components/Booking";
import Subscription from "./components/Subscription";
import Messages from "./components/Messages";
import Users from "./components/Users";
import PackageManage from "./components/PackageManage";
import Package from "./components/Package";

import PrivateOutlet from "./components/PrivateOutlet";

import "./App.css";
import { fetchUser } from "./app/features/user/userSlice";
import ResetPass from "./components/ResetPass";
import AddPackage from "./components/AddPackage";
import BookingManage from "./components/BookingManage";
import ChangeUserPic from "./components/ChangeUserPic";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [randomUrl, setRandomUrl] = useState(false);

  const { isLoading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // localStorage.removeItem("EscapePlan_token");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const randomUrl_token = localStorage.getItem("randomUrl_token");
    if (randomUrl_token) {
      setRandomUrl(randomUrl_token);
    }
  }, []);
  console.log(randomUrl);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red pt-20">{error}</p>
      ) : (
        <Router>
          <Navbar
            user={user}
            setWindowWidth={setWindowWidth}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
          {windowWidth > 1024 && sidebarOpen && (
            <Sidebar setSidebarOpen={setSidebarOpen} />
          )}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/testimonial" exact element={<Testimonial />} />
            <Route path="/packages" exact element={<Packages />} />
            <Route path="/package/:packageID" exact element={<Package />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/forgotpassword" exact element={<ForgotPass />} />

            <Route
              path={`/resetpassword/${randomUrl}`}
              exact
              element={<ResetPass />}
            />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/manage/profile" exact element={<Profile />} />
            <Route path="/*" element={<PrivateOutlet user={user} />}>
              <Route path="manage/package" exact element={<PackageManage />} />
              <Route path="manage/booking" exact element={<BookingManage />} />
              <Route
                path="manage/package/addnew"
                exact
                element={<AddPackage />}
              />
              <Route path="booking" exact element={<Booking />} />
              <Route path="users" exact element={<Users />} />
              <Route path="messages" exact element={<Messages />} />
              <Route path="subscription" exact element={<Subscription />} />
              <Route path="change/userpic" exact element={<ChangeUserPic />} />
            </Route>
            <Route path="/menu" exact element={<Menu />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;

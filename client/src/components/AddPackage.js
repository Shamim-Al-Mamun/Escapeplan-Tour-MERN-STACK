import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Paper from "@mui/material/Paper";
import axios from "axios";
import ColorButton from "./Button";
import ColorInput from "./Input";
import Alerts from "./Alerts";
import Api from "../API/Api";

import { addpackage } from "../app/features/packages/packagesSlice";

function AddPackage() {
  const { baseURL } = Api();
  const dispatch = useDispatch();

  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [packageInfo, setPackageInfo] = useState({
    place: "",
    price: "",
    description: "",
    pic: "package.webp",
  });
  const [file, setFile] = useState("");

  const { place, price, description, pic } = packageInfo;

  const onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    let fd = new FormData();
    fd.append("pictures", file);
    if (place && price && description) {
      dispatch(addpackage(packageInfo));
      const token = localStorage.getItem("EscapePlan_token");
      if (token && pic) {
        axios
          .post(`${baseURL}/package/addpackage`, fd, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const message = res.data.message;
            console.log(res);
            setError(false);
            setOpen(message);
          })
          .catch((err) => console.log(err));
      }
      setPackageInfo({
        place: "",
        price: "",
        description: "",
        pic: "",
      });
      setFile("");
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
      setOpen("Enter values!");
    }
  };
  return (
    <>
      <Alerts error={error} open={open} setOpen={setOpen} />
      <div className="w-full min-h-screen pt-20 ">
        <div className="bg-silver pt-20 min-h-screen">
          <Paper
            elevation={10}
            className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 m-auto p-3 rounded-md"
          >
            <div>
              <Link className="text-sm underline" to="/login">
                <KeyboardBackspaceIcon />
              </Link>
            </div>
            <p className="text-3xl text-center font-medium mb-3">New Package</p>
            <form onSubmit={onsubmit}>
              <div className="w-full px-3 my-5">
                <ColorInput
                  label="Place"
                  className="w-full"
                  size="small"
                  value={place}
                  onChange={(e) => {
                    setPackageInfo({
                      ...packageInfo,
                      place:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.toString().slice(1),
                    });
                  }}
                />
              </div>
              <div className="w-full px-3 my-5">
                <ColorInput
                  label="price"
                  type="number"
                  className="w-full"
                  size="small"
                  value={price}
                  onChange={(e) => {
                    setPackageInfo({ ...packageInfo, price: e.target.value });
                  }}
                />
              </div>
              <div className="w-full px-3 my-5">
                <ColorInput
                  label="Description"
                  size="small"
                  className="w-full"
                  rows={4}
                  multiline
                  value={description}
                  onChange={(e) => {
                    setPackageInfo({
                      ...packageInfo,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full px-3 mt-5">
                {/* <label
                  className="block mb-2 text-sm font-medium text-gray-900 text-textPurple border p-3 rounded-md"
                  for="file_input"
                >
                  Upload file
                </label> */}
                <input
                  className="block w-full text-sm text-purple text-text rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setPackageInfo({
                      ...packageInfo,
                      pic: e.target.files[0].name,
                    });
                  }}
                />
              </div>
              <div className="w-full text-center my-7">
                <ColorButton type="submit" endIcon={<SendIcon />}>
                  {loading && (
                    <svg
                      class="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Save
                </ColorButton>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default AddPackage;

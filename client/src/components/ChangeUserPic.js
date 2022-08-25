import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
// import axios from "axios";
import ColorButton from "./Button";
// import Alerts from "./Alerts";
// import Api from "../API/Api";

// import { updateUser } from "../app/features/user/userSlice";

function ChangeUserPic() {
  //   const { baseURL } = Api();
  //   const { user } = useSelector((state) => state.user);

  //   const dispatch = useDispatch();

  //   const [open, setOpen] = useState("");
  //   const [error, setError] = useState(false);

  const [fileName, setFileName] = useState();
  const [file, setFile] = useState("");

  const onsubmit = () => {
    console.log(fileName, file);
    // let fd = new FormData();
    // fd.append("pictures", file);
    // if (fileName) {
    //   const { _id } = user[0];
    //   const updatedUser = {
    //     ...user[0],
    //     userImage: fileName,
    //   };
    //   const updated = {
    //     id: _id,
    //     user: updatedUser,
    //   };
    //   dispatch(updateUser(updated));
    //   setFileName("");
    // }
    // const token = localStorage.getItem("EscapePlan_token");
    // console.log(token);
    // if (token && fileName) {
    //   axios
    //     .post(`${baseURL}/package/addpackage`, fd, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     .then((res) => {
    //       const message = res.data.message;
    //       console.log(res);
    //       setError(false);
    //       setOpen(message);
    //     })
    //     .catch((err) => console.log(err));
    //   setFile("");
    // }
  };
  return (
    <>
      {/* <Alerts error={error} open={open} setOpen={setOpen} /> */}
      <div className="min-h-screen pt-20">
        <div className="min-h-screen bg-silver py-10">
          <Paper
            elevation={10}
            className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 m-auto p-3 rounded-md"
          >
            <p className="text-center text-xl">Change User pic</p>
            <form onSubmit={onsubmit}>
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
                    setFileName(e.target.files[0].name);
                  }}
                />
              </div>
              <div className="w-full text-center my-7">
                <ColorButton type="submit" endIcon={<SendIcon />}>
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

export default ChangeUserPic;

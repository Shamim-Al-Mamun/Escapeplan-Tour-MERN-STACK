import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import usersReducer from "./features/users/usersSlice";
import packagesReducer from "./features/packages/packagesSlice";
import packageReducer from "./features/package/packageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    packages: packagesReducer,
    package: packageReducer,
  },
});

export default store;

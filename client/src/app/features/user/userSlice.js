import axios from "axios";
import Api from "../../../API/Api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const { baseURL } = Api();

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("EscapePlan_token");
  if (token) {
    const res = await axios.get(`${baseURL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } else {
    return [];
  }
});

export const login = createAsyncThunk("user/login", async (loginInfo) => {
  const res = await axios.post(`${baseURL}/user/login`, loginInfo);
  console.log(res.data);
  return res.data.user;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updated) => {
    const token = localStorage.getItem("EscapePlan_token");
    const { id, user } = updated;
    if (token) {
      const res = await axios.put(`${baseURL}/user/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      return res.data.updatedUser;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const token = localStorage.getItem("EscapePlan_token");
  console.log(token);
  if (token) {
    const res = await axios.get(`${baseURL}/user/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    return res.data.user;
  } else {
    return [];
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: [],
    error: null,
  },
  extraReducers: (builder) => {
    //fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.error = action.error.message;
    });
    //fetch user after login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.error = action.error.message;
    });
    //fetch user after logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.error = action.error.message;
    });
    //update users
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;

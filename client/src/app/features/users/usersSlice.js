import axios from "axios";
import Api from "../../../API/Api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const { baseURL } = Api();

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const token = localStorage.getItem("EscapePlan_token");
  console.log(token);
  if (token) {
    const res = await axios.get(`${baseURL}/user/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    return res.data.users;
  } else {
    return [];
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    error: null,
  },
  extraReducers: (builder) => {
    //fetch user
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;

import axios from "axios";
import Api from "../../../API/Api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { baseURL } = Api();

export const fetchPackages = createAsyncThunk(
  "user/fetchPackages",
  async () => {
    const res = await axios.get(`${baseURL}/package/all`);
    console.log(res.data);
    return res.data.packages;
  }
);

export const addpackage = createAsyncThunk(
  "user/addpackage",
  async (packageInfo) => {
    const token = localStorage.getItem("EscapePlan_token");
    console.log(token);
    if (token) {
      const res = await axios.post(
        `${baseURL}/package/addpackage`,
        packageInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      return res.data.packages;
    }
  }
);

export const deletepackage = createAsyncThunk(
  "user/deletepackage",
  async (id) => {
    const token = localStorage.getItem("EscapePlan_token");
    console.log(token);
    if (token) {
      const res = await axios.delete(`${baseURL}/package/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      return res.data.packages;
    }
  }
);

const packagesSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    packages: [],
    error: null,
  },
  extraReducers: (builder) => {
    //fetch packages
    builder.addCase(fetchPackages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPackages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.packages = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPackages.rejected, (state, action) => {
      state.isLoading = false;
      state.packages = [];
      state.error = action.error.message;
    });
    //Add packages
    builder.addCase(addpackage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addpackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.packages = action.payload;
      state.error = null;
    });
    builder.addCase(addpackage.rejected, (state, action) => {
      state.isLoading = false;
      state.packages = [];
      state.error = action.error.message;
    });
    //Delete packages
    builder.addCase(deletepackage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletepackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.packages = action.payload;
      state.error = null;
    });
    builder.addCase(deletepackage.rejected, (state, action) => {
      state.isLoading = false;
      state.packages = [];
      state.error = action.error.message;
    });
  },
});

export default packagesSlice.reducer;

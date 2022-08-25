import axios from "axios";
import Api from "../../../API/Api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const { baseURL } = Api();

export const fetchPackage = createAsyncThunk(
  "user/fetchPackage",
  async (id) => {
    const res = await axios.get(`${baseURL}/package/${id}`);
    console.log(res.data);
    return res.data.package;
  }
);

const packageSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    Singlepackage: [],
    error: null,
  },
  extraReducers: (builder) => {
    //fetch user
    builder.addCase(fetchPackage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Singlepackage = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPackage.rejected, (state, action) => {
      state.isLoading = false;
      state.Singlepackage = [];
      state.error = action.error.message;
    });
  },
});

export default packageSlice.reducer;

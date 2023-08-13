import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const CompanyPost = createAsyncThunk("Company/post", async (body) => {
  return await axios.post(`${API_URL}/company`, body , { headers:{ token : cookies.get("token")}}).then((res) => res);
});
export const CompanyGet = createAsyncThunk("Company/get", async () => {
  return await axios
    .get(`${API_URL}/company`)
    .then((response) => response.data);
});

export const CompanyDelete = createAsyncThunk("Company/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/company/${id}` , { headers:{ token : cookies.get("token")}})
    .then((response) => response.data);
});
export const CompanyPut = createAsyncThunk(
  "Company/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/company/${id}`, body , { headers:{ token : cookies.get("token")}})
      .then((response) => console.log(response.data));
  }
);

export const UploadImage = createAsyncThunk("Company/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "v0khd47o");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/deunojdib/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});
const CompanySlice = createSlice({
  name: "Company",
  initialState: {
    CompanyGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    CompanyPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    CompanyDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    CompanyPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadCompany: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [CompanyGet.pending]: (state, action) => {
      state.CompanyGet.loading = true;
    },
    [CompanyGet.fulfilled]: (state, action) => {
      state.CompanyGet.loading = false;
      state.CompanyGet.success = true;
      state.CompanyGet.data = action.payload;
      state.CompanyGet.error = false;
    },
    [CompanyGet.rejected]: (state, action) => {
      state.CompanyGet.loading = false;
      state.CompanyGet.error = true;
      state.CompanyGet.success = false;
    },
    // add
    [CompanyPost.pending]: (state, action) => {
      state.CompanyPost.loading = true;
    },
    [CompanyPost.fulfilled]: (state, action) => {
      state.CompanyPost.loading = false;
      state.CompanyPost.Success = true;
      state.CompanyPost.Error = false;
    },
    [CompanyPost.rejected]: (state, action) => {
      state.CompanyPost.loading = false;
      state.CompanyPost.Error = true;
      state.CompanyPost.Success = false;
    },
    // delete
    [CompanyDelete.pending]: (state, action) => {
      state.CompanyDelete.loadingDelete = true;
    },
    [CompanyDelete.fulfilled]: (state, action) => {
      state.CompanyDelete.loading = false;
      state.CompanyDelete.Success = true;
      state.CompanyDelete.Error = false;
    },
    [CompanyDelete.rejected]: (state, action) => {
      state.CompanyDelete.loading = false;
      state.CompanyDelete.Error = true;
      state.CompanyDelete.Success = false;
    },
    // put
    [CompanyPut.pending]: (state, action) => {
      state.CompanyPut.loading = true;
    },
    [CompanyPut.fulfilled]: (state, action) => {
      state.CompanyPut.Error = false;
      state.CompanyPut.Success = true;
      state.CompanyPut.Loading = false;
    },
    [CompanyPut.rejected]: (state, action) => {
      state.CompanyPut.Error = true;
      state.CompanyPut.Success = false;
      state.CompanyPut.Loading = false;
    },

    [UploadImage.pending]: (state, action) => {
      state.uploadCompany.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadCompany.Error = false;
      state.uploadCompany.Success = true;
      state.uploadCompany.Loading = false;
      state.uploadCompany.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadCompany.Error = true;
      state.uploadCompany.Success = false;
      state.uploadCompany.Loading = false;
    },
  },
});

export const {} = CompanySlice.actions;
export default CompanySlice.reducer;

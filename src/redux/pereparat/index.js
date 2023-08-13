import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const PereparatPost = createAsyncThunk("Pereparat/post", async (body) => {
  return await axios.post(`${API_URL}/category_pereparat`, body , { headers:{ token : cookies.get("token")}}).then((res) => res);
});
export const PereparatGet = createAsyncThunk("Pereparat/get", async () => {
  return await axios
    .get(`${API_URL}/category_pereparat`)
    .then((response) => response.data);
});

export const PereparatDelete = createAsyncThunk("Pereparat/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/category_pereparat/${id}` , { headers:{ token : cookies.get("token")}})
    .then((response) => response.data);
});
export const PereparatPut = createAsyncThunk(
  "Pereparat/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/category_pereparat/${id}`, body , { headers:{ token : cookies.get("token")}})
      .then((response) => console.log(response.data));
  }
);

export const UploadImage = createAsyncThunk("Pereparat/upload", async (e) => {
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
const PereparatSlice = createSlice({
  name: "Pereparat",
  initialState: {
    PereparatGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    PereparatPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    PereparatDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    PereparatPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadPereparat: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [PereparatGet.pending]: (state, action) => {
      state.PereparatGet.loading = true;
    },
    [PereparatGet.fulfilled]: (state, action) => {
      state.PereparatGet.loading = false;
      state.PereparatGet.success = true;
      state.PereparatGet.data = action.payload;
      state.PereparatGet.error = false;
    },
    [PereparatGet.rejected]: (state, action) => {
      state.PereparatGet.loading = false;
      state.PereparatGet.error = true;
      state.PereparatGet.success = false;
    },
    // add
    [PereparatPost.pending]: (state, action) => {
      state.PereparatPost.loading = true;
    },
    [PereparatPost.fulfilled]: (state, action) => {
      state.PereparatPost.loading = false;
      state.PereparatPost.Success = true;
      state.PereparatPost.Error = false;
    },
    [PereparatPost.rejected]: (state, action) => {
      state.PereparatPost.loading = false;
      state.PereparatPost.Error = true;
      state.PereparatPost.Success = false;
    },
    // delete
    [PereparatDelete.pending]: (state, action) => {
      state.PereparatDelete.loadingDelete = true;
    },
    [PereparatDelete.fulfilled]: (state, action) => {
      state.PereparatDelete.loading = false;
      state.PereparatDelete.Success = true;
      state.PereparatDelete.Error = false;
    },
    [PereparatDelete.rejected]: (state, action) => {
      state.PereparatDelete.loading = false;
      state.PereparatDelete.Error = true;
      state.PereparatDelete.Success = false;
    },
    // put
    [PereparatPut.pending]: (state, action) => {
      state.PereparatPut.loading = true;
    },
    [PereparatPut.fulfilled]: (state, action) => {
      state.PereparatPut.Error = false;
      state.PereparatPut.Success = true;
      state.PereparatPut.Loading = false;
    },
    [PereparatPut.rejected]: (state, action) => {
      state.PereparatPut.Error = true;
      state.PereparatPut.Success = false;
      state.PereparatPut.Loading = false;
    },

    [UploadImage.pending]: (state, action) => {
      state.uploadPereparat.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadPereparat.Error = false;
      state.uploadPereparat.Success = true;
      state.uploadPereparat.Loading = false;
      state.uploadPereparat.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadPereparat.Error = true;
      state.uploadPereparat.Success = false;
      state.uploadPereparat.Loading = false;
    },
  },
});

export const {} = PereparatSlice.actions;
export default PereparatSlice.reducer;

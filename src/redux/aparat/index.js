import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const AparatPost = createAsyncThunk("Aparat/post", async (body) => {
  return await axios.post(`${API_URL}/category_aparat`, body , { headers:{ token : cookies.get("token")}}).then((res) => res);
});
export const AparatGet = createAsyncThunk("Aparat/get", async () => {
  return await axios
    .get(`${API_URL}/category_aparat`)
    .then((response) => response.data);
});

export const AparatDelete = createAsyncThunk("Aparat/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/category_aparat/${id}` , { headers:{ token : cookies.get("token")}})
    .then((response) => response.data);
});
export const AparatPut = createAsyncThunk(
  "Aparat/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/category_aparat/${id}`, body , { headers:{ token : cookies.get("token")}})
      .then((response) => console.log(response.data));
  }
);

export const UploadImage = createAsyncThunk("Aparat/upload", async (e) => {
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
const AparatSlice = createSlice({
  name: "Aparat",
  initialState: {
    AparatGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    AparatPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    AparatDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    AparatPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadAparat: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [AparatGet.pending]: (state, action) => {
      state.AparatGet.loading = true;
    },
    [AparatGet.fulfilled]: (state, action) => {
      state.AparatGet.loading = false;
      state.AparatGet.success = true;
      state.AparatGet.data = action.payload;
      state.AparatGet.error = false;
    },
    [AparatGet.rejected]: (state, action) => {
      state.AparatGet.loading = false;
      state.AparatGet.error = true;
      state.AparatGet.success = false;
    },
    // add
    [AparatPost.pending]: (state, action) => {
      state.AparatPost.loading = true;
    },
    [AparatPost.fulfilled]: (state, action) => {
      state.AparatPost.loading = false;
      state.AparatPost.Success = true;
      state.AparatPost.Error = false;
    },
    [AparatPost.rejected]: (state, action) => {
      state.AparatPost.loading = false;
      state.AparatPost.Error = true;
      state.AparatPost.Success = false;
    },
    // delete
    [AparatDelete.pending]: (state, action) => {
      state.AparatDelete.loadingDelete = true;
    },
    [AparatDelete.fulfilled]: (state, action) => {
      state.AparatDelete.loading = false;
      state.AparatDelete.Success = true;
      state.AparatDelete.Error = false;
    },
    [AparatDelete.rejected]: (state, action) => {
      state.AparatDelete.loading = false;
      state.AparatDelete.Error = true;
      state.AparatDelete.Success = false;
    },
    // put
    [AparatPut.pending]: (state, action) => {
      state.AparatPut.loading = true;
    },
    [AparatPut.fulfilled]: (state, action) => {
      state.AparatPut.Error = false;
      state.AparatPut.Success = true;
      state.AparatPut.Loading = false;
    },
    [AparatPut.rejected]: (state, action) => {
      state.AparatPut.Error = true;
      state.AparatPut.Success = false;
      state.AparatPut.Loading = false;
    },

    [UploadImage.pending]: (state, action) => {
      state.uploadAparat.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadAparat.Error = false;
      state.uploadAparat.Success = true;
      state.uploadAparat.Loading = false;
      state.uploadAparat.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadAparat.Error = true;
      state.uploadAparat.Success = false;
      state.uploadAparat.Loading = false;
    },
  },
});

export const {} = AparatSlice.actions;
export default AparatSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const UslugyPost = createAsyncThunk("Uslugy/post", async (body) => {
  return await axios.post(`${API_URL}/uslugy`, body).then((res) => res);
});
export const UslugyGet = createAsyncThunk("Uslugy/get", async () => {
  return await axios
    .get(`${API_URL}/uslugy`)
    .then((response) => response.data);
});

export const UslugyDelete = createAsyncThunk("Uslugy/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/uslugy/${id}`)
    .then((response) => response.data);
});
export const UslugyPut = createAsyncThunk(
  "Uslugy/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/uslugy/${id}`, body)
      .then((response) => console.log(response.data));
  }
);

export const UploadImage = createAsyncThunk("Uslugy/upload", async (e) => {
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
const UslugySlice = createSlice({
  name: "Uslugy",
  initialState: {
    UslugyGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    UslugyPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    UslugyDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    UslugyPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadUslugy: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [UslugyGet.pending]: (state, action) => {
      state.UslugyGet.loading = true;
    },
    [UslugyGet.fulfilled]: (state, action) => {
      state.UslugyGet.loading = false;
      state.UslugyGet.success = true;
      state.UslugyGet.data = action.payload;
      state.UslugyGet.error = false;
    },
    [UslugyGet.rejected]: (state, action) => {
      state.UslugyGet.loading = false;
      state.UslugyGet.error = true;
      state.UslugyGet.success = false;
    },
    // add
    [UslugyPost.pending]: (state, action) => {
      state.UslugyPost.loading = true;
    },
    [UslugyPost.fulfilled]: (state, action) => {
      state.UslugyPost.loading = false;
      state.UslugyPost.Success = true;
      state.UslugyPost.Error = false;
    },
    [UslugyPost.rejected]: (state, action) => {
      state.UslugyPost.loading = false;
      state.UslugyPost.Error = true;
      state.UslugyPost.Success = false;
    },
    // delete
    [UslugyDelete.pending]: (state, action) => {
      state.UslugyDelete.loadingDelete = true;
    },
    [UslugyDelete.fulfilled]: (state, action) => {
      state.UslugyDelete.loading = false;
      state.UslugyDelete.Success = true;
      state.UslugyDelete.Error = false;
    },
    [UslugyDelete.rejected]: (state, action) => {
      state.UslugyDelete.loading = false;
      state.UslugyDelete.Error = true;
      state.UslugyDelete.Success = false;
    },
    // put
    [UslugyPut.pending]: (state, action) => {
      state.UslugyPut.loading = true;
    },
    [UslugyPut.fulfilled]: (state, action) => {
      state.UslugyPut.Error = false;
      state.UslugyPut.Success = true;
      state.UslugyPut.Loading = false;
    },
    [UslugyPut.rejected]: (state, action) => {
      state.UslugyPut.Error = true;
      state.UslugyPut.Success = false;
      state.UslugyPut.Loading = false;
    },

    [UploadImage.pending]: (state, action) => {
      state.uploadUslugy.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadUslugy.Error = false;
      state.uploadUslugy.Success = true;
      state.uploadUslugy.Loading = false;
      state.uploadUslugy.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadUslugy.Error = true;
      state.uploadUslugy.Success = false;
      state.uploadUslugy.Loading = false;
    },
  },
});

export const {} = UslugySlice.actions;
export default UslugySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const CategoryAdd = createAsyncThunk("Form/post", async (body) => {
  return await axios.post(`${API_URL}/category`, body).then((res) => res);
});
export const CategoryGet = createAsyncThunk("category/get", async () => {
  return await axios
    .get(`${API_URL}/category`)
    .then((response) => response.data);
});

export const CategoryDelete = createAsyncThunk(
  "category/delete",
  async (id) => {
    return await axios
      .delete(`${API_URL}/category/${id}`)
      .then((response) => response.data);
  }
);
export const CategoryPut = createAsyncThunk(
  "category/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/category/${id}`, body)
      .then((response) => console.log(response.data));
  }
);

export const UploadCategoryImage = createAsyncThunk("CategoryImg/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "dat87nly");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dffclbjds/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});
const CategorySlice = createSlice({
  name: "admin",
  initialState: {
    categoryGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    categoryPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    categoryDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    categoryPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadCategoryImage: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [CategoryGet.pending]: (state, action) => {
      state.categoryGet.loading = true;
    },
    [CategoryGet.fulfilled]: (state, action) => {
      state.categoryGet.loading = false;
      state.categoryGet.success = true;
      state.categoryGet.data = action.payload;
      state.categoryGet.error = false;
    },
    [CategoryGet.rejected]: (state, action) => {
      state.categoryGet.loading = false;
      state.categoryGet.error = true;
      state.categoryGet.success = false;
    },
    // add
    [CategoryAdd.pending]: (state, action) => {
      state.categoryPost.loading = true;
    },
    [CategoryAdd.fulfilled]: (state, action) => {
      state.categoryPost.loading = false;
      state.categoryPost.Success = true;
      state.categoryPost.Error = false;
    },
    [CategoryAdd.rejected]: (state, action) => {
      state.categoryPost.loading = false;
      state.categoryPost.Error = true;
      state.categoryPost.Success = false;
    },
    // delete
    [CategoryDelete.pending]: (state, action) => {
      state.categoryDelete.loadingDelete = true;
    },
    [CategoryDelete.fulfilled]: (state, action) => {
      state.categoryDelete.loading = false;
      state.categoryDelete.Success = true;
      state.categoryDelete.Error = false;
    },
    [CategoryDelete.rejected]: (state, action) => {
      state.categoryDelete.loading = false;
      state.categoryDelete.Error = true;
      state.categoryDelete.Success = false;
    },
    // put

    [CategoryPut.pending]: (state, action) => {
      state.categoryPut.loading = true;
    },
    [CategoryPut.fulfilled]: (state, action) => {
      state.categoryPut.Error = false;
      state.categoryPut.Success = true;
      state.categoryPut.Loading = false;
    },
    [CategoryPut.rejected]: (state, action) => {
      state.categoryPut.Error = true;
      state.categoryPut.Success = false;
      state.categoryPut.Loading = false;
    },

    [UploadCategoryImage.pending]: (state, action) => {
      state.uploadCategoryImage.Loading = true;
    },
    [UploadCategoryImage.fulfilled]: (state, action) => {
      state.uploadCategoryImage.Error = false;
      state.uploadCategoryImage.Success = true;
      state.uploadCategoryImage.Loading = false;
      state.uploadCategoryImage.data = action.payload;
      // console.log( );
    },
    [UploadCategoryImage.rejected]: (state, action) => {
      state.uploadCategoryImage.Error = true;
      state.uploadCategoryImage.Success = false;
      state.uploadCategoryImage.Loading = false;
    },
  },
});

export const {} = CategorySlice.actions;
export default CategorySlice.reducer;

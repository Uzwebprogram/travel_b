import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const NewsPost = createAsyncThunk("news/post", async (body) => {
  return await axios.post(`${API_URL}/news`, body).then((res) => res);
});
export const NewsGet = createAsyncThunk("news/get", async () => {
  return await axios
    .get(`${API_URL}/news`)
    .then((response) => response.data);
});

export const NewsDelete = createAsyncThunk("news/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/news/${id}`)
    .then((response) => response.data);
});
export const NewsPut = createAsyncThunk(
  "news/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/news/${id}`, body)
      .then((response) => console.log(response.data));
  }
);

export const UploadImage = createAsyncThunk("news/upload", async (e) => {
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
const NewsSlice = createSlice({
  name: "news",
  initialState: {
    newsGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    newsPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    newsDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    newsPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadNews: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [NewsGet.pending]: (state, action) => {
      state.newsGet.loading = true;
    },
    [NewsGet.fulfilled]: (state, action) => {
      state.newsGet.loading = false;
      state.newsGet.success = true;
      state.newsGet.data = action.payload;
      state.newsGet.error = false;
    },
    [NewsGet.rejected]: (state, action) => {
      state.newsGet.loading = false;
      state.newsGet.error = true;
      state.newsGet.success = false;
    },
    // add
    [NewsPost.pending]: (state, action) => {
      state.newsPost.loading = true;
    },
    [NewsPost.fulfilled]: (state, action) => {
      state.newsPost.loading = false;
      state.newsPost.Success = true;
      state.newsPost.Error = false;
    },
    [NewsPost.rejected]: (state, action) => {
      state.newsPost.loading = false;
      state.newsPost.Error = true;
      state.newsPost.Success = false;
    },
    // delete
    [NewsDelete.pending]: (state, action) => {
      state.newsDelete.loadingDelete = true;
    },
    [NewsDelete.fulfilled]: (state, action) => {
      state.newsDelete.loading = false;
      state.newsDelete.Success = true;
      state.newsDelete.Error = false;
    },
    [NewsDelete.rejected]: (state, action) => {
      state.newsDelete.loading = false;
      state.newsDelete.Error = true;
      state.newsDelete.Success = false;
    },
    // put
    [NewsPut.pending]: (state, action) => {
      state.newsPut.loading = true;
    },
    [NewsPut.fulfilled]: (state, action) => {
      state.newsPut.Error = false;
      state.newsPut.Success = true;
      state.newsPut.Loading = false;
    },
    [NewsPut.rejected]: (state, action) => {
      state.newsPut.Error = true;
      state.newsPut.Success = false;
      state.newsPut.Loading = false;
    },

    [UploadImage.pending]: (state, action) => {
      state.uploadNews.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadNews.Error = false;
      state.uploadNews.Success = true;
      state.uploadNews.Loading = false;
      state.uploadNews.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadNews.Error = true;
      state.uploadNews.Success = false;
      state.uploadNews.Loading = false;
    },
  },
});

export const {} = NewsSlice.actions;
export default NewsSlice.reducer;

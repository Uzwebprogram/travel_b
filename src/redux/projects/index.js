import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api";
import axios from "axios";

export const GetProjects = createAsyncThunk("Projects/get", async () => {
  return await axios.get(`${API_URL}/images`).then((response) => response.data);
});
export const PostProjects = createAsyncThunk("Projects/post", async (body) => {
  return await axios.post(`${API_URL}/images`, body).then((res) => res);
});
export const UploadImage = createAsyncThunk("Projects/upload", async (e) => {
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
export const DeleteProjects = createAsyncThunk(
  "Projects/delete",
  async (id) => {
    return await axios
      .delete(`${API_URL}/images/${id}`)
      .then((response) => response.data);
  }
);
export const PutProjects = createAsyncThunk(
  "Projects/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/images/${id}`, body)
      .then((response) => console.log(response.data));
  }
);
const ProjectsSlice = createSlice({
  name: "Projects",
  initialState: {
    getProjects: {
      Error: false,
      Loading: false,
      Success: false,
      Data: [],
    },
    postProjects: {
      Error: false,
      Loading: false,
      Success: false,
    },
    deleteProjects: {
      Error: false,
      Loading: false,
      Success: false,
    },
    putProjects: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadProjects: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    [GetProjects.pending]: (state, action) => {
      state.getProjects.loading = true;
    },
    [GetProjects.fulfilled]: (state, action) => {
      state.getProjects.Error = false;
      state.getProjects.Success = true;
      state.getProjects.Loading = false;
      state.getProjects.Data = action.payload;
    },
    [GetProjects.rejected]: (state, action) => {
      state.getProjects.Error = true;
      state.getProjects.Success = false;
      state.getProjects.Loading = false;
      state.getProjects.Data = [];
    },
    [PostProjects.pending]: (state, action) => {
      state.postProjects.loading = true;
    },
    [PostProjects.fulfilled]: (state, action) => {
      state.postProjects.Error = false;
      state.postProjects.Success = true;
      state.postProjects.Loading = false;
    },
    [PostProjects.rejected]: (state, action) => {
      state.postProjects.Error = true;
      state.postProjects.Success = false;
      state.postProjects.Loading = false;
    },
    [DeleteProjects.pending]: (state, action) => {
      state.deleteProjects.loading = true;
    },
    [DeleteProjects.fulfilled]: (state, action) => {
      state.deleteProjects.Error = false;
      state.deleteProjects.Success = true;
      state.deleteProjects.Loading = false;
    },
    [DeleteProjects.rejected]: (state, action) => {
      state.deleteProjects.Error = true;
      state.deleteProjects.Success = false;
      state.deleteProjects.Loading = false;
    },
    [PutProjects.pending]: (state, action) => {
      state.putProjects.loading = true;
    },
    [PutProjects.fulfilled]: (state, action) => {
      state.putProjects.Error = false;
      state.putProjects.Success = true;
      state.putProjects.Loading = false;
    },
    [PutProjects.rejected]: (state, action) => {
      state.putProjects.Error = true;
      state.putProjects.Success = false;
      state.putProjects.Loading = false;
    },
    [UploadImage.pending]: (state, action) => {
      state.uploadProjects.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadProjects.Error = false;
      state.uploadProjects.Success = true;
      state.uploadProjects.Loading = false;
      state.uploadProjects.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadProjects.Error = true;
      state.uploadProjects.Success = false;
      state.uploadProjects.Loading = false;
    },
  },
});

export const {} = ProjectsSlice.actions;
export default ProjectsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  status: "idle",
  updatedStatus:false,
  selectedId:null,
  error: null,

};

export const fetchPosts = createAsyncThunk("fetch/post", async () => {
  const response = await axios.get("http://localhost:5000/api/todos/getTodos");
  return response.data;
});

export const deletePosts = createAsyncThunk("delete/post", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/todos/delete/${id}`);
    toast.success('Post successfully deleted');
    return id; // Return the id of the deleted post
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createPosts = createAsyncThunk("create/post", async ({ payload, config }, thunkAPI) => {
  try {
    console.log(payload, config);
    const response = await axios.post("http://localhost:5000/api/todos/add", payload, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostStatus: (state, action) => {
      state.updatedStatus=true;
      state.selectedId=action.payload.id;
      console.log(state.updatedStatus,action.payload)
  }
     
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error || null;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        console.log(action.payload);
        toast.success('Post successfully created');
        state.status = 'succeeded';
        state.posts = [...state.posts, action.payload];
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        // Remove the deleted post from the state
        state.status = 'succeeded';
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export const selectPost = (state) => state.posts.posts;
export const { updatePostStatus } = postSlice.actions;
export default postSlice.reducer;

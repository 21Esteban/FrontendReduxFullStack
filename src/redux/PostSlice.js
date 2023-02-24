import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  posts: [],
  isLoading: false,
};



export const getPosts = createAsyncThunk(
  "postSlice/getPosts",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`/post`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

//GUARDAR POST
export const savePost = createAsyncThunk(
  "postSlice/savePosts",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    try {
      await axios.post(`/post`, arg);
      dispatch(getPosts());   
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const deletePost = createAsyncThunk(
  "postSlice/deletePosts",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/post/${id}`);
      dispatch(getPosts());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



export const updatePost = createAsyncThunk(
  "postSlice/updatePosts",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await axios.put(`/post/${arg._id}`, arg);
      dispatch(getPosts());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(savePost.fulfilled, (state, action) => {
      // state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(savePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(savePost.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      alert("Los campos son requeridos")

    });

    builder.addCase(deletePost.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(updatePost.rejected, (state, action) => {
      console.log(action.payload);
    });
  },

});

export const { setLoading } = postSlice.actions;

export default postSlice.reducer;

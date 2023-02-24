import { configureStore } from '@reduxjs/toolkit';
import postReducer from "./PostSlice.js"

export const store = configureStore({
  reducer: {
    postStore: postReducer
  },
})
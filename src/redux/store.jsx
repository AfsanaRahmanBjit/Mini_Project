
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import paginationReducer from './paginationSlice';


const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    auth: authReducer,
  }
});

export default store;

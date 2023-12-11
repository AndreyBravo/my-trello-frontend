import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { tasksReducer } from "./task";
import { api } from "../api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

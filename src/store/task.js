import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
//   const { data } = await axios.post("/auth/login", params);
//   return data;
// });

// export const fetchRegister = createAsyncThunk(
//   "auth/fetchRegister",
//   async (params) => {
//     const { data } = await axios.post("/auth/register", params);
//     return data;
//   }
// );

export const fetchGetAllTask = createAsyncThunk("auth/fetchGetAllTask", async () => {
  const { data } = await axios.get("/task/getAll");
  return data;
});

const initialState = {
  data: [],
  status: "loading",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchGetAllTask.pending]: (state) => {
      state.data = [];
      state.status = "loading";
    },
    [fetchGetAllTask.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchGetAllTask.rejected]: (state) => {
      state.data = [];
      state.status = "error";
    },
    
  },
});

export const tasksReducer = tasksSlice.reducer;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => "task",
      providesTags:()=>[{
        type:'Tasks'
      }]
    }),
  }),
});

export const { useGetAllTasksQuery } = api;

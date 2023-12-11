import { api } from ".";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskById: builder.query({
      query: ([id]) => `task/${id}`,
    }),
    deleteTaskById: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: () => [{ type: "Tasks" }],
    }),
    addTask: builder.mutation({
      query: (payload) => ({
        url: `task`,
        method: "POST",
        credentials: "include",
        body: payload,
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useDeleteTaskByIdMutation,
  useGetTaskByIdQuery,
} = tasksApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const followingsApi = createApi({
  reducerPath: "followingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3065/user/" }),
  endpoints: (builder) => ({
    getFollowings: builder.query({
      query: (followingsLimit) => `followings?limit=${followingsLimit}`,
    }),
  }),
});

export const { useGetFollowingsQuery } = followingsApi;

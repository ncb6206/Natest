import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const followersApi = createApi({
  reducerPath: "followersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3065/user/" }),
  endpoints: (builder) => ({
    getFollowers: builder.query({
      query: (followersLimit) => `followers?limit=${followersLimit}`,
    }),
  }),
});

export const { useGetFollowersQuery } = followersApi;

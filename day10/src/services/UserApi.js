import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const UserApi = createApi({
  reducerPath: "pokemonApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.cardz.visiontrek.in/" }),

  endpoints: (builder) => ({
    RegisterUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    LoginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    GetUserProfile: builder.query({
      query: (access_token) => {
        return {
          url: "get-user-profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    GetUserCard: builder.query({
      query: (params) => {
        console.log(params.id);
        return {
          url: "card-select/" + params.id,
          method: "GET",
          headers: {
            authorization: `Bearer ${params.access_token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useGetUserCardQuery,
} = UserApi;

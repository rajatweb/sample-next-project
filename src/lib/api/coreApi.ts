import { IDropdownType, IGetUserInfoResponse, ITeamFormProps, ITeamPerson, ITeamUserFormProps, ITeams, IUserInfoDropdown, IUserType, Post, PostType } from '@/utils/commonTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["socialUsers", "posts","conntent","users",'teamUsers','teams'],
  endpoints: (build) => ({
    getSocialUsers: build.query<{ socialUsers: Array<IUserInfoDropdown> }, void>({
      query: () => "socialUsers",
      providesTags: ["socialUsers"]
    }),
    addSocialUser: build.mutation<void, IUserInfoDropdown>({
      query(body) {
        return {
          url: `socialUser`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["socialUsers"]
    }),
    getPosts: build.query<Array<Post>, { fromDate: string; lastDate: string }>({
      query: ({ fromDate, lastDate }) => `posts?fromDate=${fromDate}&lastDate=${lastDate}`,
      providesTags: ["posts"]
    }),
    getContentById: build.query<PostType, string>({
      query: (id) => `content?id=${id}`,
      providesTags: ["conntent"]
    }),
    getUserInfo:build.query<IGetUserInfoResponse,string>({
      query: (id) => `user?id:${id}`,
      transformResponse:(response:IUserType)=>{
        const socialDropdown = response.socialAccounts.map((item)=>({text:item.name,value:item.id}))
        return {...response,socialDropdown};
      },
      providesTags: ["users"]
    }),
    getTeamUsers:build.query<{teamUsers:ITeamPerson[]},string>({
      query: (id) => `team-users?id:${id}`,
      providesTags: ["teamUsers"]
    }),
    getTeams:build.query<{data:ITeams[],teamDropdown:IDropdownType[]},string>({
      query: (id) => `teams?id:${id}`,
      transformResponse:(response:ITeams[])=>{
       const teamDropdown = response.map((item)=>({text:item.name,value:item.name}))
        return {data:response,teamDropdown};
      },
      providesTags: ["teams"]
    }),
    createTeam: build.mutation<void, ITeamFormProps>({
      query(body) {
        return {
          url: `teams`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["teams"]
    }),
    updateTeam: build.mutation<void, ITeamFormProps>({
      query(body) {
        return {
          url: `teams`,
          method: "PATCH",
          body
        };
      },
      invalidatesTags: ["teams"]
    }),
    deleteTeam: build.mutation<void, ITeamFormProps>({
      query(body) {
        return {
          url: `teams/${body}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["teams"]
    }),
    inviteTeamUser: build.mutation<void, ITeamUserFormProps>({
      query(body) {
        return {
          url: `team-users`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["teamUsers"]
    }),
    updateTeamUser: build.mutation<void, ITeamUserFormProps>({
      query(body) {
        return {
          url: `team-users`,
          method: "PATCH",
          body
        };
      },
      invalidatesTags: ["teamUsers"]
    }),
    deleteTeamUser: build.mutation<void, ITeamUserFormProps>({
      query(body) {
        return {
          url: `team-users/${body}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["teamUsers"]
    }),
  })
});

export const {
  useGetSocialUsersQuery,
  useAddSocialUserMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useLazyGetContentByIdQuery,
  useGetUserInfoQuery,
  useGetTeamUsersQuery,
  useGetTeamsQuery,
  useInviteTeamUserMutation,
  useUpdateTeamUserMutation,
  useDeleteTeamUserMutation,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
  useCreateTeamMutation
} = coreApi;
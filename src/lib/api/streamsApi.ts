import { IStreamPostType } from '@/utils/steamTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const streamsApi = createApi({
    reducerPath: "streamsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    tagTypes: ["streams"],
    endpoints: (build) => ({
        getUserStreams: build.query<IStreamPostType[], { fromDate: string; lastDate: string,userId:number}>({
            query: ({ fromDate, lastDate,userId }) => `user-streams?userId=${userId}&fromDate=${fromDate}&lastDate=${lastDate}`,
            providesTags: ["streams"]
        }),
        addUserStream: build.mutation<void, any>({
            query(body) {
                return {
                    url: `userStream`,
                    method: "POST",
                    body
                };
            },
            invalidatesTags: ["streams"]
        })
    })
});

export const {useGetUserStreamsQuery} = streamsApi;
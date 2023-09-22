import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGames } from "./IGames";

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    tagTypes: ['Games'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: (build) => ({
        getGames: build.query<IGames[], null>({
            query: () => `games`,
            providesTags: (result, error, arg) =>
            result
                ? [...result.map(({ id }) => ({ type: 'Games' as const, id })), 'Games']
                : ['Games'],
        }),
        addRowGames: build.mutation({
            query: (body) => ({
                url: 'games',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Games']
        }),
        removeRowGames: build.mutation({
            query: (id) => ({
                url: `games/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Games']
        }),
        editingRowGames: build.mutation({
            query: ({id, ...body}) => ({
                url: `games/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Games']
        })
    })
})

export const {useGetGamesQuery, useAddRowGamesMutation, useEditingRowGamesMutation, useRemoveRowGamesMutation} = gamesApi;
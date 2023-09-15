import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:3000/data'

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Data'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: builder => ({
        getData: builder.query({
            query: () => '/',
        }),
    }),

})
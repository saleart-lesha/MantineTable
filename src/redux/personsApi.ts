import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPerson } from "../store/IPerson";

export const personsApi = createApi({
    reducerPath: 'personsApi',
    tagTypes: ['Persons'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: (build) => ({
        getPersons: build.query<IPerson[], null>({
            query: () => `data`,
            providesTags: (result, error, arg) =>
            result
                ? [...result.map(({ id }) => ({ type: 'Persons' as const, id })), 'Persons']
                : ['Persons'],
        }),
        addRow: build.mutation({
            query: (body) => ({
                url: 'data',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Persons']
        }),
        removeRow: build.mutation({
            query: (id) => ({
                url: `data/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Persons']
        })
    })
})

export const {useGetPersonsQuery, useAddRowMutation, useRemoveRowMutation} = personsApi;
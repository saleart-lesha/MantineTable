import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPerson } from "./IPerson";

export const personsApi = createApi({
    reducerPath: 'personsApi',
    tagTypes: ['Persons'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
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
        }),
        editingRow: build.mutation({
            query: ({id, ...body}) => ({
                url: `data/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Persons']
        })
    })
})

export const {useGetPersonsQuery, useAddRowMutation, useRemoveRowMutation, useEditingRowMutation} = personsApi;
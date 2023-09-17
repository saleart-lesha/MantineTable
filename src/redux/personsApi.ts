import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPerson } from "../store/IPerson";

export const personsApi = createApi({
    reducerPath: 'personsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: (build) => ({
        getPersons: build.query<IPerson[], null>({
            query: () => `data`,
        })
    })
})

export const {useGetPersonsQuery} = personsApi;
import { api } from "./api";

export const dataApi = api.injectEndpoints({
    endpoints: builder => ({
        createNewRow: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/',
                method: 'POST',
            }),
        }),
    }),
})
import { configureStore } from "@reduxjs/toolkit";
import { personsApi } from "./personsApi";

export const store = configureStore({
    reducer: {
        [personsApi.reducerPath]: personsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(personsApi.middleware)
})
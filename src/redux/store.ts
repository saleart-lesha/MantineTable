import { configureStore } from "@reduxjs/toolkit";
import { personsApi } from "./personsApi";
import tableReducer from "./tableSlice";

export const store = configureStore({
    reducer: {
        [personsApi.reducerPath]: personsApi.reducer,
        table: tableReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(personsApi.middleware)
})
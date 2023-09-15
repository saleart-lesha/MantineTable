import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import persons from "./persons";

export const store = configureStore({
    reducer: {
        persons
    }
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
import { configureStore } from "@reduxjs/toolkit";
import { personsApi } from "./Persons/personsApi";
import tablePersonsReducer from "./Persons/PersonsTableSlice"
// import tableGamesReducer from "./Games/GamesTableSlice"
import { gamesApi } from "./Games/GamesApi";

export const store = configureStore({
    reducer: {
        [personsApi.reducerPath]: personsApi.reducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
        tablePersons: tablePersonsReducer,
        // tableGames: tableGamesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            personsApi.middleware,
            gamesApi.middleware
        ),
});

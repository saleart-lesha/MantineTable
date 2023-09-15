import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPerson } from "./IPerson";
import { getPersonsApi } from "../api/persons";


interface IPersonsState{
    list: Array<IPerson>;
}

const initialState: IPersonsState = {
    list: [
        // {
        //     id: "1",
        //     firstName: 'Zachary',
        //     lastName: 'Davis',
        //     address: '261 Battle Ford',
        //   },
        //   {
        //     id: "2",
        //     firstName: 'Robert',
        //     lastName: 'Smith',
        //     address: '566 Brakus Inlet',
        //   },
        //   {
        //     id: "3",
        //     firstName: 'Kevin',
        //     lastName: 'Yan',
        //     address: '7777 Kuhic Knoll',
        //   },
    ],
}

export const getPersons = createAsyncThunk(
    'getPersons',
    async() =>{
        const response = await getPersonsApi()

        return response.json()
    }
)

const counterSlice = createSlice({
    name: 'persons',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getPersons.fulfilled, (state, action) => {
            state.list = action.payload
        })
    }
    
})

export default counterSlice.reducer;
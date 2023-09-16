import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPerson } from "./IPerson";
import { getPersonsApi } from "../api/persons";


interface IPersonsState{
    list: Array<IPerson>;
}

const initialState: IPersonsState = {
    list: [],
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
    reducers:{
        addRow: (state, action) =>{
            state.list.push({
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                address: action.payload.address,

            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPersons.fulfilled, (state, action) => {
            state.list = action.payload
        })
    }
    
})

export const {addRow} = counterSlice.actions;
export default counterSlice.reducer;
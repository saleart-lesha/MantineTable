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

export const removePerson = createAsyncThunk(
    'person/removePerson',
    async(id: number, {dispatch}) => {
        try{
            const response = await fetch(`http://localhost:3000/data/${id}`, {
            method: 'DELETE',
        });
        console.log(response)
        dispatch(removeRow(id));
        }
        catch(error){
            console.error(error);
        }
    }
)




const counterSlice = createSlice({
    name: 'persons',
    initialState,
    reducers:{
        addRow: (state, action) =>{
            state.list.push({
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                address: action.payload.address,

            })
        },

        removeRow: (state, action) => {
            console.log(action.payload)
            state.list = state.list.filter(person => person.id !== action.payload);
          }
    },
    extraReducers: (builder) => {
        builder.addCase(getPersons.fulfilled, (state, action) => {
            state.list = action.payload
        })
    }
    
})

export const {addRow, removeRow} = counterSlice.actions;
export default counterSlice.reducer;
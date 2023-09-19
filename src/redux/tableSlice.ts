import { createSlice } from "@reduxjs/toolkit"

interface TableState {
    sorting: {id: string, desc: boolean}
}

const initialState: TableState = {
    sorting: {id: 'name', desc: false}
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setSorting: (state, action) => {
            console.log("qwerqwer")
            return {
                ...state,
                sorting: {
                    id: action.payload.id,
                    desc: action.payload.desc
                },
            }
        },
    }
})

export const {setSorting} = tableSlice.actions;
export default tableSlice.reducer;
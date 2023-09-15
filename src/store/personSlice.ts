import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
  };

interface PersonState {
    persons: Person[];
}

const initialState: PersonState = {
    persons: [
        {
            id: "1",
            firstName: 'Zachary',
            lastName: 'Davis',
            address: '261 Battle Ford',
          },
          {
            id: "2",
            firstName: 'Robert',
            lastName: 'Smith',
            address: '566 Brakus Inlet',
          },
          {
            id: "3",
            firstName: 'Kevin',
            lastName: 'Yan',
            address: '7777 Kuhic Knoll',
          },
    ],
}

// export const PersonSlice = createSlice({
//     name: "person",
//     initialState,
//     reducers:{
//         addPerson: (state, action:PayloadAction<{name: string}>) =>{
            
//         }
//     }

// });
import { createSlice } from '@reduxjs/toolkit';

export interface LocalStorage {
    id: string;
    value: string;
  }


interface InitialState {
  sorting: LocalStorage[] | undefined;
  serching: string | undefined;
}



const localStorageSorting = localStorage.getItem('filters');
const localStorageFilter = localStorage.getItem('serching')

const initialState: InitialState = { sorting: [], serching: "" };

if (localStorageSorting) {
  initialState.sorting = [...JSON.parse(localStorageSorting)];
}

if (localStorageFilter) {
    initialState.serching = JSON.parse(localStorageFilter)
}

console.log(initialState);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSorting: (state, action) => {
      localStorage.setItem('filters', JSON.stringify(action.payload));
      return { ...state, sorting: action.payload };
    },
    setSerching: (state, action) => {
        
      const newSerching = action.payload !== undefined ? action.payload : '';
      localStorage.setItem('serching', JSON.stringify(newSerching));
      return { ...state, serching: newSerching };
    }
  },
});

export const { setSorting, setSerching } = tableSlice.actions;
export default tableSlice.reducer;

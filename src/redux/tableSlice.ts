import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  sorting: LocalStorage[] | undefined;
}

export interface LocalStorage {
  id: string;
  value: string;
}

const localStorageSorting = localStorage.getItem('filters');

const initialState: InitialState = { sorting: [] };

if (localStorageSorting) {
  initialState.sorting = [...JSON.parse(localStorageSorting)];
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
  },
});

export const { setSorting } = tableSlice.actions;
export default tableSlice.reducer;

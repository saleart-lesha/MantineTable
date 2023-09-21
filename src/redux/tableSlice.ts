import { createSlice } from '@reduxjs/toolkit';

export interface LocalStorage {
    id: string;
    value: string;
  }

export interface LocalStoragePagination{
    pageIndex: number;
    pageSize: number;
}


interface InitialState {
  sorting: LocalStorage[] | undefined;
  serching: string | undefined;
  pagination: LocalStoragePagination | undefined
}



const localStorageSorting = localStorage.getItem('filters');
const localStorageFilter = localStorage.getItem('serching')
const localStoragePagination = localStorage.getItem('pagination')

const initialState: InitialState = { sorting: [], serching: "", pagination: { pageIndex: 0, pageSize: 5 } };

if (localStorageSorting) {
  initialState.sorting = [...JSON.parse(localStorageSorting)];
}

if (localStorageFilter) {
    initialState.serching = JSON.parse(localStorageFilter)
}

if (localStoragePagination) {
    initialState.pagination = JSON.parse(localStoragePagination)
}

console.log(initialState);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSorting: (state, action) => {
        console.log(action.payload)
      localStorage.setItem('filters', JSON.stringify(action.payload));
      return { ...state, sorting: action.payload };
    },
    setSerching: (state, action) => {
        
      const newSerching = action.payload !== undefined ? action.payload : '';
      localStorage.setItem('serching', JSON.stringify(newSerching));
      return { ...state, serching: newSerching };
    },
    setPagination: (state, action) =>{
        localStorage.setItem('pagination', JSON.stringify(action.payload));
        return{...state, pagination: action.payload}
    }
  },

});

export const { setSorting, setSerching, setPagination } = tableSlice.actions;
export default tableSlice.reducer;

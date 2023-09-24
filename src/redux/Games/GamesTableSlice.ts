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



const localStorageSorting = localStorage.getItem('filtersGames');
const localStorageFilter = localStorage.getItem('serchingGames')
const localStoragePagination = localStorage.getItem('paginationGames')

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

const tableSliceGame = createSlice({
  name: 'tableGames',
  initialState,
  reducers: {
    setSortingGames: (state, action) => {
      localStorage.setItem('filtersGames', JSON.stringify(action.payload));
      return { ...state, sorting: action.payload };
    },
    setSerchingGames: (state, action) => {
      const newSerching = action.payload !== undefined ? action.payload : '';
      localStorage.setItem('serchingGames', JSON.stringify(newSerching));
      return { ...state, serching: newSerching };
    },
    setPaginationGames: (state, action) =>{
        localStorage.setItem('paginationGames', JSON.stringify(action.payload));
        return{...state, pagination: action.payload}
    }
  },

});

export const { setSortingGames, setSerchingGames, setPaginationGames } = tableSliceGame.actions;
export default tableSliceGame.reducer;

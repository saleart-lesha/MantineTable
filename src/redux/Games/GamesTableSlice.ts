export {
    
}

// import { createSlice } from '@reduxjs/toolkit';

// export interface LocalStorage {
//     id: string;
//     value: string;
//   }

// export interface LocalStoragePagination{
//     pageIndex: number;
//     pageSize: number;
// }


// interface InitialState {
//   sorting: LocalStorage[] | undefined;
//   serching: string | undefined;
//   pagination: LocalStoragePagination | undefined
// }



// const localStorageSorting = localStorage.getItem('filtersGames');
// const localStorageFilter = localStorage.getItem('serchingGames')
// const localStoragePagination = localStorage.getItem('paginationGames')

// const initialState: InitialState = { sorting: [], serching: "", pagination: { pageIndex: 0, pageSize: 5 } };

// if (localStorageSorting) {
//   initialState.sorting = [...JSON.parse(localStorageSorting)];
// }

// if (localStorageFilter) {
//     initialState.serching = JSON.parse(localStorageFilter)
// }

// if (localStoragePagination) {
//     initialState.pagination = JSON.parse(localStoragePagination)
// }

// console.log(initialState);

// const tableSliceGame = createSlice({
//   name: 'tableGames',
//   initialState,
//   reducers: {
//     setSorting: (state, action) => {
//         console.log(action.payload)
//       localStorage.setItem('filtersGames', JSON.stringify(action.payload));
//       return { ...state, sorting: action.payload };
//     },
//     setSerching: (state, action) => {
        
//       const newSerching = action.payload !== undefined ? action.payload : '';
//       localStorage.setItem('serchingGames', JSON.stringify(newSerching));
//       return { ...state, serching: newSerching };
//     },
//     setPagination: (state, action) =>{
//         localStorage.setItem('paginationGames', JSON.stringify(action.payload));
//         return{...state, pagination: action.payload}
//     }
//   },

// });

// export const { setSorting, setSerching, setPagination } = tableSliceGame.actions;
// export default tableSliceGame.reducer;

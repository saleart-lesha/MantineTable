import { useMemo } from 'react';
import { useAddRowMutation, useEditingRowMutation, useGetPersonsQuery, useRemoveRowMutation } from '../redux/Persons/personsApi';
import TableCard from '../widgets/TableCard';
import { MRT_ColumnDef } from 'mantine-react-table';
import { IPerson } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useAddRowGamesMutation, useEditingRowGamesMutation, useGetGamesQuery, useRemoveRowGamesMutation } from '../redux/Games/GamesApi';
import { IGames } from '../redux/Games/IGames';
import { setPaginationGames, setSerchingGames, setSortingGames } from '../redux/Games/GamesTableSlice';
import { setPaginationPersons, setSerchingPersons, setSortingPersons } from '../redux/Persons/PersonsTableSlice';

export type UnionTypes = IPerson | IGames;

function MainPage() {

  const dispatch = useDispatch();

  // Persons
  const { data: PersonData = [] } = useGetPersonsQuery(null);
  const [addPerson] = useAddRowMutation();
  const [removePerson] = useRemoveRowMutation();
  const [editingPerson] = useEditingRowMutation();

  const columnsPersons = useMemo<MRT_ColumnDef<IPerson>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        enableColumnActions: false,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableColumnActions: false,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        enableColumnActions: false,
      },
    ],
    []
  );

  const tableStatePersons = useSelector((state: any) => state.tablePersons);

  const onSortingChangePersons = (t: any) => {
    const newSorting = t(tableStatePersons.sorting);
    dispatch(setSortingPersons(newSorting));
  };

  const onGlobalFilterChangePersons = (newFilters: any) => {
    dispatch(setSerchingPersons(newFilters));
  }

  const onPaginationChangePersons = (t: any) => {
    const newPagination = t(tableStatePersons.pagination);
    dispatch(setPaginationPersons(newPagination));
  }


    // Games
    const { data: GamesData = [] } = useGetGamesQuery(null);
    const [addGames] = useAddRowGamesMutation();
    const [removeGames] = useRemoveRowGamesMutation();
    const [editingGames] = useEditingRowGamesMutation();
  
    const columnsGames = useMemo<MRT_ColumnDef<IGames>[]>(
      () => [
        {
          accessorKey: 'nameGames',
          header: 'Название игры',
          enableColumnActions: false,
        },
        {
          accessorKey: 'yearRelease',
          header: 'Дата выпуска',
          enableColumnActions: false,
        },
        {
          accessorKey: 'genre',
          header: 'Жанр',
          enableColumnActions: false,
        },
      ],
      []
    );
  
    const tableStateGames = useSelector((state: any) => state.tableGames);
    
    const onSortingChangeGames = (t: any) => {
      const newSorting = t(tableStateGames.sorting);
      dispatch(setSortingGames(newSorting));
    };
  
    const onGlobalFilterChangeGames = (newFilters: any) => {
      dispatch(setSerchingGames(newFilters));
    }
  
    const onPaginationChangeGames = (t: any) => {
      const newPagination = t(tableStateGames.pagination);
      dispatch(setPaginationGames(newPagination));
    }
  

  return <><TableCard data={PersonData}
                      addRow={addPerson}
                      removeRow={removePerson}
                      editingRow={editingPerson}
                      columns={columnsPersons}
                      tableState = {tableStatePersons}
                      onSortingChange = {onSortingChangePersons}
                      onGlobalFilterChange = {onGlobalFilterChangePersons}
                      onPaginationChange = {onPaginationChangePersons}
                      title="Рабочие"

            />        
            <TableCard data={GamesData}
                       addRow={addGames}
                       removeRow={removeGames}
                       editingRow={editingGames}
                       columns={columnsGames}
                       tableState = {tableStateGames}
                       onSortingChange = {onSortingChangeGames}
                       onGlobalFilterChange = {onGlobalFilterChangeGames}
                       onPaginationChange = {onPaginationChangeGames}
                       title={"Игры"}

            />
            </>;
}

export default MainPage;

import { useMemo } from 'react';
import { useAddRowMutation, useEditingRowMutation, useGetPersonsQuery, useRemoveRowMutation } from '../redux/Persons/personsApi';
import TableCard from '../widgets/TableCard';
import { MRT_ColumnDef } from 'mantine-react-table';
import { IPerson } from '../redux';
import { useSelector } from 'react-redux';
import { useAddRowGamesMutation, useEditingRowGamesMutation, useGetGamesQuery, useRemoveRowGamesMutation } from '../redux/Games/GamesApi';
import { IGames } from '../redux/Games/IGames';

function MainPage() {
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
  
    // const tableStateGames = useSelector((state: any) => state.tableGames);
  

  return <><TableCard Data={PersonData}
                      addRow={addPerson}
                      removeRow={removePerson}
                      editingRow={editingPerson}
                      columns={columnsPersons}
                      tableState = {tableStatePersons}
                      title="Рабочие"

            />        
            <TableCard Data={GamesData}
                       addRow={addGames}
                       removeRow={removeGames}
                       editingRow={editingGames}
                       columns={columnsGames}
                       tableState = {tableStatePersons}
                       title={"Игры"}
            />
            </>;
}

export default MainPage;

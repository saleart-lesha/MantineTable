import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_TableOptions,
  MRT_Row,
  MRT_TableInstance,
} from 'mantine-react-table';
import { RowActions } from './RowActions';
import { RenderTopToolbar } from './RenderTopToolbar';
import { useDispatch } from 'react-redux';
import { setPagination, setSerching, setSorting } from '../redux/Persons/PersonsTableSlice';
import { IGames } from '../redux/Games/IGames';

const POSITION_ACTIONS_COLUMN = 'last';
const MANTINE_PLACEHOLDER = 'Поиск';

export const Table = ({data, addRow, removeRow, editingRow, columns, tableState} : any) => {
  
  interface IHandleSaveRow {
    row: MRT_Row<IGames>;
    table: MRT_TableInstance<IGames> ;
    values: any;
  }

  const handleSaveRow: MRT_TableOptions<IGames>['onEditingRowSave'] = async ({
    row,
    table,
    values,
  }: IHandleSaveRow) => {
    await editingRow({id: row.original.id, ...values});
    table.setEditingRow(null);
  };

  const dispatch = useDispatch();

  const onSortingChange = (t: any) => {
    const newSorting = t(tableState.sorting);
    dispatch(setSorting(newSorting));
  };

  const onGlobalFilterChange = (newFilters: any) => {
    dispatch(setSerching(newFilters));
  }

  const onPaginationChange = (t: any) => {
    const newPagination = t(tableState.pagination);
    dispatch(setPagination(newPagination));
  }

    const table = useMantineReactTable({
    columns: columns,
    data: data,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableRowActions: true,
    positionActionsColumn: POSITION_ACTIONS_COLUMN,
    enableEditing: true,
    enableGlobalFilterRankedResults: false,
    state: { sorting: tableState.sorting, showGlobalFilter: true, globalFilter: tableState.serching, pagination: tableState.pagination},
    onSortingChange: onSortingChange,
    onGlobalFilterChange: onGlobalFilterChange,
    onPaginationChange: onPaginationChange,
    mantineSearchTextInputProps: { placeholder: MANTINE_PLACEHOLDER },
    onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row }: { row: MRT_Row<IGames>}) => (
      <RowActions row={row} table={table} removePerson={removeRow} />
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <RenderTopToolbar
          table={table}
          addPerson={addRow}
          columns={columns}
        />
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;

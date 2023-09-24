import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_TableOptions,
  MRT_Row,
  MRT_TableInstance,
  LiteralUnion,
} from 'mantine-react-table';
import { RowActions } from './RowActions';
import { RenderTopToolbar } from './RenderTopToolbar';
import { TableCardProps } from '../widgets/TableCard';
import { UnionTypes } from '../pages/MainPage';

const POSITION_ACTIONS_COLUMN = 'last';
const MANTINE_PLACEHOLDER = 'Поиск';

export const Table = <T extends UnionTypes>({data, addRow, removeRow, editingRow, columns, tableState, onPaginationChange, onGlobalFilterChange, onSortingChange} : TableCardProps<T>) => {
  
  interface IHandleSaveRow {
    row: MRT_Row<T>;
    table: MRT_TableInstance<T> ;
    values: Record<LiteralUnion<string & any, string>, any>; // & DeepKeys<T> 
  }

  const handleSaveRow : MRT_TableOptions<T>['onEditingRowSave'] = async ({
    row,
    table,
    values,
  }: IHandleSaveRow) => {
    await editingRow({id: row.original.id, ...values});
    table.setEditingRow(null);
  };

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
    renderRowActions: ({ row }: { row: MRT_Row<T>}) => (
      <RowActions row={row} table={table} removeRow={removeRow} />
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <RenderTopToolbar
          table={table}
          addRow={addRow}
          columns={columns}
        />
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;

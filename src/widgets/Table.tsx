import React, { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_Row,
  MRT_TableInstance,
  MRT_SortingState,
  MRT_PaginationState,
} from 'mantine-react-table';
import { IPerson, useEditingRowMutation } from '../redux';
import {
  useAddRowMutation,
  useGetPersonsQuery,
  useRemoveRowMutation,
} from '../redux';
import { RowActions } from '../entities/RowActions';
import { RenderTopToolbar } from './RenderTopToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorage, setPagination, setSerching, setSorting } from '../redux/tableSlice';

const POSITION_ACTIONS_COLUMN = 'last';
const MANTINE_PLACEHOLDER = 'Поиск';

const Table = () => {
  interface IHandleSaveRow {
    row: MRT_Row<IPerson>;
    table: MRT_TableInstance<IPerson>;
    values: any;
  }

  const { data = [] } = useGetPersonsQuery(null);
  const [addPerson] = useAddRowMutation();
  const [removePerson] = useRemoveRowMutation();
  const [tableData, setTableData] = useState<IPerson[]>(data);
  const [editingPerson] = useEditingRowMutation();
  const columns = useMemo<MRT_ColumnDef<IPerson>[]>(
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

  const handleSaveRow: MRT_TableOptions<IPerson>['onEditingRowSave'] = async ({
    row,
    table,
    values,
  }: IHandleSaveRow) => {
    await editingPerson({id: row.original.id, ...values});
    table.setEditingRow(null);
  };

  const dispatch = useDispatch();
  const tableState = useSelector((state: any) => state.table);

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

  const table: MRT_TableInstance<IPerson> = useMantineReactTable({
    columns,
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
    renderRowActions: ({ row }: { row: MRT_Row<IPerson> }) => (
      <RowActions row={row} table={table} removePerson={removePerson} />
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <RenderTopToolbar
          table={table}
          addPerson={addPerson}
          columns={columns}
        />
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;

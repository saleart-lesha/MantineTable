import React, { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ToggleFiltersButton,
  MRT_GlobalFilterTextInput,
} from 'mantine-react-table';

import { ActionIcon, Box, Button, Flex, Input } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { IPerson } from '../../store/IPerson';
import { useAddRowMutation, useGetPersonsQuery, useRemoveRowMutation } from '../../redux';

const Table = () => {

  const {data = []} = useGetPersonsQuery(null)
  const [addPerson] = useAddRowMutation();
  const [removePerson] = useRemoveRowMutation();

  
  
  const [tableData, setTableData] = useState<IPerson[]>(data);


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
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    table.setEditingRow(null);
  };

  const table = useMantineReactTable({
    columns,
    data: data,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableEditing: true,
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    mantineSearchTextInputProps: { placeholder: 'Поиск' },
    onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color="orange"
          onClick={() => {
            table.setEditingRow(row);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={ async (id) => {
            await removePerson(row.original.id).unwrap();
          }
          }
        >
          <IconTrash />
        </ActionIcon>
      </Box>
    ),
    renderTopToolbar: ({ table }) => {
      const addDate = async (event: any) => {
        event.preventDefault();

        const newRecord: any = {
          firstName: event.target[0].value,
          lastName: event.target[1].value,
          address: event.target[2].value,
        };
        await addPerson(newRecord).unwrap()
      };

      const createInputFields = () => {
        const toolbarInputFields = [];

        for (let i = 0; i < columns.length; i++) {
          toolbarInputFields.push(
            <React.Fragment key={i}>
              <label>{columns[i].header}</label>
              <Input></Input>
            </React.Fragment>
          );
        }

        return toolbarInputFields;
      };

      return (
        <Flex p="md" gap="sm">
          <MRT_ToggleFiltersButton table={table} />
          <MRT_GlobalFilterTextInput table={table} />

          <form onSubmit={addDate}>
            {createInputFields()}
            <Button color="blue" variant="filled" type="submit">
              Добавить
            </Button>
          </form>
        </Flex>
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;

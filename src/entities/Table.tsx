import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ToggleFiltersButton,
  MRT_GlobalFilterTextInput,
} from 'mantine-react-table';

import { ActionIcon, Box, Button, Flex } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type Person = {

    firstName: string;
    lastName: string;
    address: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
// const data: Person[] = [
//   {
//     name: {
//       firstName: 'Zachary',
//       lastName: 'Davis',
//     },
//     address: '261 Battle Ford',
//   },
//   {
//     name: {
//       firstName: 'Robert',
//       lastName: 'Smith',
//     },
//     address: '566 Brakus Inlet',
//   },
//   {
//     name: {
//       firstName: 'Kevin',
//       lastName: 'Yan',
//     },
//     address: '7777 Kuhic Knoll',
//   },
// ];

// отключение дополнительной фигни в столбцах

const Table = () => {
  //should be memoized or stable

    const [data, setData] = useState<Person[]>([
        {
          
            firstName: 'Zachary',
            lastName: 'Davis',
         
          address: '261 Battle Ford',
        },
        {
          
            firstName: 'Robert',
            lastName: 'Smith',
          
          address: '566 Brakus Inlet',
        },
        {
         
            firstName: 'Kevin',
            lastName: 'Yan',
         
          address: '7777 Kuhic Knoll',
        },
      ]);



    
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName', //access nested data with dot notation
        header: 'First Name',
        enableColumnActions: false,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableColumnActions: false,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        enableColumnActions: false,
      },
    ],
    [],
  );




  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = async ({
    row,
    table,
    values,
  }) => {
    
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    data[row.index] = values;
    //send/receive api updates here
    setData([...data]);
    table.setEditingRow(null); //exit editing mode
  };


    // Отключение верхней панели--------------------------------------------
    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableHiding: false,
        enableRowActions: true,
        positionActionsColumn: 'last',
        enableEditing: true,
        initialState: { showColumnFilters: false, showGlobalFilter: true },
        
        mantineSearchTextInputProps: {placeholder: 'Поиск'},
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
                onClick={() => {
                  data.splice(row.index, 1); //assuming simple data table
                  setData([...data]);
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Box>
          ),

          renderTopToolbar: ({ table }) => {
            const addDate = () => {
              table.getSelectedRowModel().flatRows.map((row) => {
                alert('deactivating ' + row.getValue('name'));
              });
            };
      
            return (
              <Flex p="md" justify="space-between">
                <Flex gap="xs">
                  {/* import MRT sub-components */}
                  
                  <MRT_ToggleFiltersButton table={table} />
                  <MRT_GlobalFilterTextInput table={table} />

                </Flex>
                <Flex sx={{ gap: '8px' }}>
                  <Button
                    color="red"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleDeactivate}
                    variant="filled"
                  >
                    Deactivate
                  </Button>
                </Flex>
              </Flex>
            );
          },
      });




  return <MantineReactTable 
  table={table}
  />;
};

export default Table;
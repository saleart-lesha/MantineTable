import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MRT_Row, MRT_TableInstance } from 'mantine-react-table';
import { CRUDtypes, UnionTypes } from '../pages/MainPage';

interface IRowActions<T extends UnionTypes> {
  removeRow: CRUDtypes;
  table: MRT_TableInstance<T>;
  row: MRT_Row<T>;
}

export const RowActions = <T extends UnionTypes>({ removeRow, table, row }: IRowActions<T>) => {
  return (
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
        onClick={async () => {
          await removeRow(row.original.id).unwrap();
        }}
      >
        <IconTrash />
      </ActionIcon>
    </Box>
  );
};

import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MRT_Row, MRT_TableInstance } from 'mantine-react-table';
import { IGames } from '../redux/Games/IGames';

interface IRowActions {
  removePerson: any;
  table: MRT_TableInstance<IGames>;
  row: MRT_Row<IGames>;
}

export const RowActions = ({ removePerson, table, row }: IRowActions) => {
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
          await removePerson(row.original.id).unwrap();
        }}
      >
        <IconTrash />
      </ActionIcon>
    </Box>
  );
};

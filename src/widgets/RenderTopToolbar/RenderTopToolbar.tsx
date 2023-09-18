import { Button, Flex } from '@mantine/core';
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_TableInstance,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { addTableRow, createInputFields } from '../../features';
import { IPerson } from '../../redux';
import styles from './style.module.css';

interface IRenderTopToolbar {
  table: MRT_TableInstance<IPerson>;
  addPerson: any;
  columns: MRT_ColumnDef<IPerson>[];
}

export const RenderTopToolbar = ({
  table,
  addPerson,
  columns,
}: IRenderTopToolbar) => {
  return (
    <Flex p="md" gap="sm">
      <MRT_ToggleFiltersButton table={table} />
      <MRT_GlobalFilterTextInput table={table} />
      <form onSubmit={(e: any) => addTableRow(e, addPerson)}>
        <div className={styles.section}>
          {createInputFields(columns)}
          <Button color="blue" variant="filled" type="submit">
            Добавить
          </Button>
        </div>
      </form>
    </Flex>
  );
};

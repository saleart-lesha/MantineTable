import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_TableInstance,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { addTableRow, createInputFields } from '../../features';
import styles from './style.module.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Flex } from '@mantine/core';
import { IGames } from '../../redux/Games/IGames';

interface IRenderTopToolbar {
  table: MRT_TableInstance<IGames>;
  addPerson: any;
  columns: MRT_ColumnDef<IGames>[];
}

export const RenderTopToolbar = ({
  table,
  addPerson,
  columns,
}: IRenderTopToolbar) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex p="md" gap="sm">
      <MRT_ToggleFiltersButton table={table} />
      <MRT_GlobalFilterTextInput table={table} />
        <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
      <form onSubmit={(e: any) => addTableRow(e, addPerson, columns)}>
        <div className={styles.section}>
          {createInputFields(columns)}
        </div>
        <Button color="blue" variant="filled" type="submit">Добавить запись</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Добавить запись</Button>
      </Group>
    </>   
    </Flex>
  );
};

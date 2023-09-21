import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_TableInstance,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { addTableRow, createInputFields } from '../../features';
import { IPerson } from '../../redux';
import styles from './style.module.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Flex, Input, TextInput } from '@mantine/core';

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
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex p="md" gap="sm">
      <MRT_ToggleFiltersButton table={table} />
      <MRT_GlobalFilterTextInput table={table} />
        <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
      <form onSubmit={(e: any) => addTableRow(e, addPerson)}>
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

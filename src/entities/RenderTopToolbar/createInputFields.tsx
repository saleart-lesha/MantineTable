import { Input, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import React from 'react';
import { UnionTypes } from '../../pages/MainPage';

export const createInputFields = <T extends UnionTypes>(columns: MRT_ColumnDef<T>[]) => {
  const toolbarInputFields = [];

  for (let i = 0; i < columns!.length; i++) {
    toolbarInputFields.push(
      <React.Fragment key={i}>
        <Text>{columns[i].header}</Text>
        <Input required placeholder={columns[i].header}></Input>
      </React.Fragment>
    );
  }

  return toolbarInputFields;
};

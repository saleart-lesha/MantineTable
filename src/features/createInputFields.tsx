import { Input } from '@mantine/core';
import React from 'react';

export const createInputFields = (columns: any) => {
  const toolbarInputFields = [];

  for (let i = 0; i < columns!.length; i++) {
    toolbarInputFields.push(
      <React.Fragment key={i}>
        <Input required placeholder={columns[i].header}></Input>
      </React.Fragment>
    );
  }

  return toolbarInputFields;
};

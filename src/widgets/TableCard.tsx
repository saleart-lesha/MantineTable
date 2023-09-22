import { ReactNode } from "react";
import Table from "../entities/Table";
import { MRT_ColumnDef } from "mantine-react-table";
import { IPerson } from "../redux";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query/react";
import { IGames } from "../redux/Games/IGames";


export interface TableCardProps {
  Data: IPerson[] | IGames[];
  addRow: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Persons", any, "personsApi">> |
  MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Games", any, "gamesApi">>; 
  removeRow: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Persons", any, "personsApi">> |
  MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Games", any, "gamesApi">>; 
  editingRow: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Persons", any, "personsApi">> |
  MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Games", any, "gamesApi">>; 
  columns: MRT_ColumnDef<IPerson>[] | MRT_ColumnDef<IGames>[];
  tableState: any;
  title: ReactNode;
}

export default function TableCard({Data, addRow, removeRow, editingRow, columns, title, tableState} : TableCardProps) {



    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>{title}</h3>
          <Table data = {Data}
                 addRow = {addRow}
                 removeRow = {removeRow}
                 editingRow = {editingRow}
                 columns = {columns}
                 tableState = {tableState}
          />
      </div>
    );
  }
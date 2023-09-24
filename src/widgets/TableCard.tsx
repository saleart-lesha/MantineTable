import { ReactNode } from "react";
import Table from "../entities/Table";
import { MRT_ColumnDef } from "mantine-react-table";
import { CRUDtypes, UnionTypes } from "../pages/MainPage";

export interface TableCardProps <T extends UnionTypes> {
  data: T[];
  addRow: CRUDtypes; 
  removeRow: CRUDtypes; 
  editingRow: CRUDtypes; 
  columns: MRT_ColumnDef<T>[];
  title: ReactNode;
  tableState: any;
  onSortingChange : any;
  onGlobalFilterChange : any;
  onPaginationChange: any;
}

export default function TableCard<T extends UnionTypes>({data, addRow, removeRow, editingRow, columns, title, tableState, onSortingChange, onGlobalFilterChange, onPaginationChange} : TableCardProps<T>) {

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>{title}</h3>
          <Table data = {data}
                 addRow = {addRow}
                 removeRow = {removeRow}
                 editingRow = {editingRow}
                 columns = {columns}
                 tableState = {tableState}
                 onSortingChange = {onSortingChange}
                 onGlobalFilterChange = {onGlobalFilterChange}
                 onPaginationChange = {onPaginationChange}
                 title = {title}
          />
      </div>
    );
  }
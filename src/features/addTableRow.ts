import { MRT_ColumnDef } from "mantine-react-table";
import { UnionTypes } from "../pages/MainPage";

type Key = string | number | symbol

export const addTableRow = async <T extends UnionTypes>(event: any, addPerson: any, columns: MRT_ColumnDef<T>[]) => {
  event.preventDefault();
  const obj: {[key: Key]: string} = {
  }
  
  for (let i = 0; i < columns.length; i++)
  {
    const key: Key = columns[i]!.accessorKey!;
    obj[key] = event.target[i].value;   
  }
  await addPerson(obj).unwrap();
};

import { MRT_ColumnDef } from "mantine-react-table";
import { IGames } from "../redux/Games/IGames";

export const addTableRow = async (event: any, addPerson: any, columns: MRT_ColumnDef<IGames>[]) => {
  event.preventDefault();
  const obj: {[key: string]: any} = {
  }
  
  for (let i = 0; i < columns.length; i++)
  {
    const key: string = columns[i]!.accessorKey!;
    obj[key] = event.target[i].value;   
  }
  await addPerson(obj).unwrap();
};

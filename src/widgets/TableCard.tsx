import HeaderTable from "../entities/HeaderTable";
import Table from "./Table";

export default function TableCard() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HeaderTable />
        <Table />
      </div>
    );
  }
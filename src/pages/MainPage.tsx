import Table from "../entities/Table";

function MainPage() {
  return (
    <div>
        <h3>Название таблицы</h3> {/* сделать пропсы */}
        {/* скорее всего из entities подтянуть саму таблицу */}
        <Table />
    </div>
  );
}

export default MainPage;
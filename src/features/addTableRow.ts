export const addTableRow = async (event: any, addPerson: any) => {
  event.preventDefault();
  const newRecord: any = {
    firstName: event.target[0].value,
    lastName: event.target[1].value,
    address: event.target[2].value,
  };
  await addPerson(newRecord).unwrap();
};

export interface Employee {
  id: number;
  areaId: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
}

export const employeeEmpty: Employee = {
  id: 0,
  areaId: 0,
  name: "",
  paternalSurname: "",
  maternalSurname: "",
}
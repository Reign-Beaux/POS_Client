export interface User {
  id: number;
  employeeId: number;
  roleId: number;
  username: string;
  password: string;
  email: string;
}

export const userEmpty: User = {
  id: 0,
  employeeId: 0,
  roleId: 0,
  username: "",
  password: "",
  email: ""
}
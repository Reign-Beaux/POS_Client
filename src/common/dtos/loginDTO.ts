export interface LoginDTO {
  username: string;
  password: string;
}

export const loginDTOEmpty: LoginDTO = {
  username: "",
  password: "",
}
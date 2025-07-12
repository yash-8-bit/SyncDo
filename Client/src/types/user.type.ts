export type authtype = "login" | "register";

export interface UserAuthType {
  name?: string;
  username: string;
  password: string;
}

export interface User {
  name: string;
  username: string;
}

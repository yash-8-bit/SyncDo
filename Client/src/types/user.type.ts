export type authtype = "login" | "register";

// login or register interface
export interface UserAuthType {
  name?: string;
  username: string;
  password: string;
}

// user interface
export interface User {
  name: string;
  username: string;
}

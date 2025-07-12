import type { UserAuthType } from "../types/user.type";
import Call from "./setting";

const login = async ({ username, password }: UserAuthType) => {
  let response = await Call.post("/userauth/login", { username, password });
  return response.data;
};

const register = async ({ name, username, password }: UserAuthType) => {
  let response = await Call.post("/userauth/register", {
    name,
    username,
    password,
  });
  return response.data;
};

export { login, register };

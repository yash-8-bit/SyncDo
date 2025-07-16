import type { UserAuthType } from "../types/user.type";
import Call from "./setting";

// this is a POST request to login a user  
const login = async ({ username, password }: UserAuthType) => {
  let response = await Call.post("/userauth/login", { username, password });
  return response.data;
};


// this is a POST request to register a user 
const register = async ({ name, username, password }: UserAuthType) => {
  let response = await Call.post("/userauth/register", {
    name,
    username,
    password,
  });
  return response.data;
};

export { login, register };

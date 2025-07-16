import ls from "../utils/ls";
import Call from "./setting";

const token = ls.get();


// config setup for Authorization
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// this is a GET request to fetch user details like name and username
const accountDetails = async () => {
  let response = await Call.get("/user/details", config);
  return response.data;
};

// this is a PUT request to smart assign task that have minimum no of active task  
const accountDelete = async () => {
  let response = await Call.delete("/user/delete", config);
  return response.data;
};

export { accountDelete, accountDetails };

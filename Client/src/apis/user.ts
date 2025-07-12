import ls from "../utils/ls";
import Call from "./setting";

const token = ls.get();
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const accountDetails = async () => {
  let response = await Call.get("/user/details", config);
  return response.data;
};

const accountDelete = async () => {
  let response = await Call.delete("/user/delete", config);
  return response.data;
};

export { accountDelete, accountDetails };

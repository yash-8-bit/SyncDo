import ls from "../utils/ls";
import Call from "./setting";

const token = ls.get();

// config setup for Authorization
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// this is a GET request to fetch latest 20 logs
const getLogs = async () => {
  let response = await Call.get("/logs/get", config);
  return response.data;
};

export { getLogs };

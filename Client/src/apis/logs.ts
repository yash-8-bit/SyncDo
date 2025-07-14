import ls from "../utils/ls";
import Call from "./setting";

const token = ls.get();
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getLogs = async () => {
  let response = await Call.get("/logs/get", config);
  return response.data;
};

export { getLogs };

import axios from "axios";

const Call = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default Call;

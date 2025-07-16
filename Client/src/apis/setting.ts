import axios from "axios";

// setup baseurl for writing only endpoint not whole url
const Call = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default Call;

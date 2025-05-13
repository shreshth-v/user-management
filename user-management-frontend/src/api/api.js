import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default apiClient;

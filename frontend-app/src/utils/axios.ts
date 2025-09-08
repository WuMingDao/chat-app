import axios from "axios";

export const AppRestfulApi = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:3001/v1" : "/v1",
  withCredentials: true,
});

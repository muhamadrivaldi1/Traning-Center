import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/Traning-Center/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

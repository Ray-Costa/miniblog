import axios from "axios";

export const api = axios.create({
  baseURL: "https://news-api.lublot.dev/api",
  timeout: 7000
});

export const internalApi = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 7000
});

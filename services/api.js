import axios from "axios";

export const api = axios.create({
  baseURL: "https://news-api.lublot.dev/api/posts",
  timeout: 7000,
});

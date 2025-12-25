import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchArticles = () => api.get("/articles");
export const fetchLatestArticle = () => api.get("/articles/latest");

export default api;


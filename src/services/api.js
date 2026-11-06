import axios from "axios";

// Instancia configurada com a base da API (definida no arquivo .env)
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

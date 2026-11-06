import api from "./api";

// Busca a lista de utilizadores na API
export async function listarUtilizadores() {
  const resposta = await api.get("/users");
  return resposta.data;
}

// Simula a criacao de um utilizador (POST com payload JSON)
export async function criarUtilizador(payload) {
  const resposta = await api.post("/users", payload);
  return resposta.data;
}

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { serializarUsuario, desserializarUsuario } from "../utils/sessao";

const CHAVE_USUARIO = "@INF204:usuario";

// 1. Criacao do objeto de Contexto
// (valor padrao null para que o useAuth detecte uso fora do Provider)
export const AuthContext = createContext(null);

// 2. O componente Provider que ira envelopar a aplicacao
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = Visitante
  const [carregando, setCarregando] = useState(true);

  // Desafio extra (Persistencia de Sessao): ao abrir o app, le o disco
  useEffect(() => {
    async function carregarSessao() {
      try {
        const texto = await AsyncStorage.getItem(CHAVE_USUARIO);
        const usuarioSalvo = desserializarUsuario(texto);
        if (usuarioSalvo) {
          setUsuario(usuarioSalvo);
        }
      } catch (erro) {
        console.error("Erro ao ler sessao", erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarSessao();
  }, []);

  // Simulacao de um Login
  async function signIn(email, senha) {
    // Aqui aconteceria uma chamada de API (axios.post)
    const respostaAPI = { id: "123", nome: "Turma INF204", email: email };
    setUsuario(respostaAPI);
    try {
      await AsyncStorage.setItem(CHAVE_USUARIO, serializarUsuario(respostaAPI));
    } catch (erro) {
      console.error("Erro ao salvar sessao", erro);
    }
  }

  // Simulacao de um Logout
  async function signOut() {
    setUsuario(null);
    try {
      await AsyncStorage.removeItem(CHAVE_USUARIO);
    } catch (erro) {
      console.error("Erro ao remover sessao", erro);
    }
  }

  return (
    // Injetamos as propriedades e metodos no "canal" global
    // A conversao booleana (!!usuario) indica se ha alguem logado
    <AuthContext.Provider value={{ logado: !!usuario, usuario, carregando, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

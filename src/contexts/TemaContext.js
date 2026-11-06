import React, { createContext, useState } from "react";

import { alternarTema } from "../utils/sessao";

// Desafio extra (Multiplos Contextos): dominio separado para o tema,
// um dado de baixa mutacao, ideal para a Context API.
export const TemaContext = createContext(null);

export const CORES = {
  claro: { fundo: "#FFFFFF", texto: "#14325A" },
  escuro: { fundo: "#121212", texto: "#E3EAF5" },
};

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro"); // "claro" ou "escuro"

  function trocarTema() {
    setTema((atual) => alternarTema(atual));
  }

  return (
    <TemaContext.Provider value={{ tema, cores: CORES[tema], trocarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

import React from "react";
import { ThemeProvider } from "./src/contexts/TemaContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import Rotas from "./src/routes";

export default function App() {
  return (
    // O Provider no topo garante disponibilidade global e resolve o Prop Drilling.
    // Providers aninhados: o tema envolve a autenticacao.
    <ThemeProvider>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </ThemeProvider>
  );
}

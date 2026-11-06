import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import ListaUtilizadores from "./src/screens/ListaUtilizadores";
import NovoUtilizador from "./src/screens/NovoUtilizador";

export default function App() {
  const [tela, setTela] = useState("lista");

  return (
    <>
      <StatusBar style="dark" />
      {tela === "lista" ? (
        <ListaUtilizadores onNovo={() => setTela("novo")} />
      ) : (
        <NovoUtilizador onVoltar={() => setTela("lista")} />
      )}
    </>
  );
}

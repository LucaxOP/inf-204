import React from "react";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";

import { iniciarBanco } from "./src/database/iniciarBanco";
import TelaTarefas from "./src/screens/TelaTarefas";

export default function App() {
  return (
    // Cria ou abre o arquivo "app-database.db" e executa as migracoes em onInit
    <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
      <StatusBar style="auto" />
      <TelaTarefas />
    </SQLiteProvider>
  );
}

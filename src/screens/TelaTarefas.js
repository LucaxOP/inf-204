import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import {
  carregarTema,
  salvarTema,
  carregarPerfil,
  salvarPerfil,
  removerPerfil,
} from "../storage/preferencias";
import {
  normalizarDescricao,
  proximoStatus,
  alternarTema,
  contarPendentes,
} from "../utils/tarefas";

const CORES = {
  claro: { fundo: "#F5F5F5", cartao: "#FFFFFF", texto: "#14325A", secundario: "#666666" },
  escuro: { fundo: "#121212", cartao: "#1E1E1E", texto: "#E3EAF5", secundario: "#A0A0A0" },
};

export default function TelaTarefas() {
  // Instancia unica do banco fornecida pelo SQLiteProvider
  const db = useSQLiteContext();

  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [tema, setTema] = useState("claro");
  const [perfil, setPerfil] = useState(null);
  const [nome, setNome] = useState("");

  const cores = CORES[tema];

  // SELECT
  const carregarTarefas = useCallback(async () => {
    try {
      const resultados = await db.getAllAsync("SELECT * FROM tarefas ORDER BY id DESC;");
      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados", erro);
    }
  }, [db]);

  useEffect(() => {
    carregarTarefas();
    // Preferencias guardadas no AsyncStorage sobrevivem ao fechar o app
    carregarTema().then(setTema);
    carregarPerfil().then(setPerfil);
  }, [carregarTarefas]);

  // INSERT com parametros (protecao contra SQL Injection)
  const adicionarNovaTarefa = async () => {
    const descricao = normalizarDescricao(texto);
    if (!descricao) {
      Alert.alert("Atencao", "Digite a descricao da tarefa.");
      return;
    }
    try {
      const resultado = await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [descricao, 0] // 0 para false no SQLite
      );
      console.log("Inserido com ID:", resultado.lastInsertRowId);
      setTexto("");
      carregarTarefas();
    } catch (erro) {
      console.error("Erro no insert", erro);
    }
  };

  // UPDATE
  const alternarStatusTarefa = async (id, statusAtual) => {
    await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?;", [
      proximoStatus(statusAtual),
      id,
    ]);
    carregarTarefas();
  };

  // DELETE
  const apagarTarefa = async (id) => {
    const rs = await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
    console.log("Linhas alteradas:", rs.changes);
    carregarTarefas();
  };

  const trocarTema = async () => {
    const novo = alternarTema(tema);
    setTema(novo);
    await salvarTema(novo);
  };

  const salvarNome = async () => {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    const novoPerfil = { nome: nomeLimpo, desde: new Date().toISOString() };
    await salvarPerfil(novoPerfil);
    setPerfil(novoPerfil);
    setNome("");
  };

  const sair = async () => {
    await removerPerfil();
    setPerfil(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <View style={styles.cabecalho}>
        <Text style={[styles.titulo, { color: cores.texto }]}>Minhas Tarefas</Text>
        <TouchableOpacity style={styles.botaoTema} onPress={trocarTema}>
          <Text style={styles.textoBotao}>{tema === "claro" ? "Modo escuro" : "Modo claro"}</Text>
        </TouchableOpacity>
      </View>

      {/* Perfil salvo no AsyncStorage como JSON */}
      <View style={[styles.cartao, { backgroundColor: cores.cartao }]}>
        {perfil ? (
          <View style={styles.linha}>
            <Text style={[styles.descricao, styles.flex, { color: cores.texto }]}>
              Olá, {perfil.nome}!
            </Text>
            <TouchableOpacity onPress={sair}>
              <Text style={styles.apagar}>Sair</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.linha}>
            <TextInput
              style={[styles.input, styles.flex]}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.botao} onPress={salvarNome}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.linha}>
        <TextInput
          style={[styles.input, styles.flex]}
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova tarefa"
          placeholderTextColor="#999"
          onSubmitEditing={adicionarNovaTarefa}
        />
        <TouchableOpacity style={styles.botao} onPress={adicionarNovaTarefa}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.resumo, { color: cores.secundario }]}>
        {contarPendentes(tarefas)} pendente(s) de {tarefas.length}
      </Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ color: cores.secundario }}>Nenhuma tarefa salva.</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.cartao, styles.linha, { backgroundColor: cores.cartao }]}>
            <TouchableOpacity
              style={styles.flex}
              onPress={() => alternarStatusTarefa(item.id, item.concluida)}
            >
              <Text
                style={[
                  styles.descricao,
                  { color: cores.texto },
                  item.concluida === 1 && styles.concluida,
                ]}
              >
                {item.concluida === 1 ? "✓ " : "○ "}
                {item.descricao}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => apagarTarefa(item.id)}>
              <Text style={styles.apagar}>Apagar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: { fontSize: 24, fontWeight: "bold" },
  linha: { flexDirection: "row", alignItems: "center", gap: 10 },
  flex: { flex: 1 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    color: "#000",
  },
  botao: { backgroundColor: "#14325A", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 8 },
  botaoTema: { backgroundColor: "#3A6EA5", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  resumo: { marginVertical: 12 },
  cartao: { padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  descricao: { fontSize: 16 },
  concluida: { textDecorationLine: "line-through", opacity: 0.6 },
  apagar: { color: "#C62828", fontWeight: "bold" },
});

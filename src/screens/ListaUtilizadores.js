import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { listarUtilizadores } from "../services/usuariosService";

export default function ListaUtilizadores({ onNovo }) {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarDados = useCallback(async () => {
    try {
      // Os dados devolvidos ficam na propriedade "data" do Axios
      const dados = await listarUtilizadores();
      setUtilizadores(dados);
      setErro(null);
    } catch (e) {
      console.error("Erro ao buscar dados:", e.message);
      setErro("Nao foi possivel carregar os utilizadores.");
    } finally {
      // Oculta os indicadores, independentemente de erro ou sucesso
      setLoading(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    buscarDados();
  }, [buscarDados]); // Executa uma unica vez na montagem

  // Desafio extra: pull-to-refresh volta a chamar a API
  const aoPuxar = () => {
    setAtualizando(true);
    buscarDados();
  };

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Lista de Utilizadores</Text>
        <TouchableOpacity style={styles.botao} onPress={onNovo}>
          <Text style={styles.textoBotao}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={utilizadores}
        keyExtractor={(item) => item.id.toString()}
        refreshing={atualizando}
        onRefresh={aoPuxar}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50, paddingHorizontal: 20 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  cabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#14325A" },
  botao: { backgroundColor: "#14325A", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  erro: { color: "#C62828", marginBottom: 10 },
  cartao: { backgroundColor: "#FFF", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  nome: { fontSize: 18, fontWeight: "bold" },
  email: { color: "#666", marginTop: 5 },
});

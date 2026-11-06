import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { criarUtilizador } from "../services/usuariosService";
import { validarUtilizador, montarPayload } from "../utils/validacao";

export default function NovoUtilizador({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Desafio extra: submissao de formulario com api.post()
  const enviar = async () => {
    const erro = validarUtilizador({ nome, email });
    if (erro) {
      Alert.alert("Dados invalidos", erro);
      return;
    }

    setEnviando(true);
    try {
      const criado = await criarUtilizador(montarPayload({ nome, email }));
      Alert.alert("Sucesso", `Utilizador criado com ID ${criado.id}.`);
      setNome("");
      setEmail("");
    } catch (e) {
      Alert.alert("Erro", `Falha ao criar utilizador: ${e.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Utilizador</Text>

      <Text style={styles.rotulo}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome completo" />

      <Text style={styles.rotulo}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botao} onPress={enviar} disabled={enviando}>
        {enviando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>Enviar</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.voltar} onPress={onVoltar}>
        <Text style={styles.textoVoltar}>Voltar para a lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50, paddingHorizontal: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#14325A" },
  rotulo: { fontWeight: "bold", marginBottom: 5 },
  input: { backgroundColor: "#FFF", borderRadius: 8, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: "#DDD" },
  botao: { backgroundColor: "#14325A", padding: 14, borderRadius: 8, alignItems: "center" },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  voltar: { marginTop: 15, alignItems: "center" },
  textoVoltar: { color: "#14325A" },
});

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button, ActivityIndicator } from "react-native";

import { useAuth } from "../hooks/useAuth";
import { useTema } from "../hooks/useTema";

const Stack = createNativeStackNavigator();

// --- TELAS SIMULADAS ---
function TelaLogin() {
  const { signIn } = useAuth(); // Usando o nosso hook customizado!
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Área Restrita</Text>
      <Button title="Entrar no Sistema" onPress={() => signIn("teste@email.com", "123")} />
    </View>
  );
}

function TelaDashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, cores, trocarTema } = useTema();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        backgroundColor: cores.fundo, // cor de fundo dinamica pelo TemaContext
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 8, color: cores.texto }}>
        Bem-vindo, {usuario?.nome}
      </Text>
      <Text style={{ color: cores.texto }}>{usuario?.email}</Text>
      <Button
        title={tema === "claro" ? "Ativar tema escuro" : "Ativar tema claro"}
        onPress={trocarTema}
      />
      <Button title="Sair da Conta" color="red" onPress={signOut} />
    </View>
  );
}

// --- ROTEADOR PRINCIPAL ---
export default function Rotas() {
  const { logado, carregando } = useAuth(); // Escuta ativamente o estado global

  // Enquanto le a sessao salva no disco, evita mostrar o Login por engano
  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Renderizacao Condicional de Rotas baseada no estado Global */}
        {logado ? (
          <Stack.Screen name="Dashboard" component={TelaDashboard} />
        ) : (
          <Stack.Screen name="Login" component={TelaLogin} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

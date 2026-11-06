import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_TEMA = "@MeuApp:Tema";
const CHAVE_PERFIL = "@MeuApp:Perfil";

// --- Strings simples ---
export async function salvarTema(tema) {
  try {
    await AsyncStorage.setItem(CHAVE_TEMA, tema);
  } catch (erro) {
    console.error("Erro ao salvar tema", erro);
  }
}

export async function carregarTema() {
  try {
    const valorSalvo = await AsyncStorage.getItem(CHAVE_TEMA);
    return valorSalvo !== null ? valorSalvo : "claro"; // tema claro padrao
  } catch (erro) {
    console.error("Erro ao ler tema", erro);
    return "claro";
  }
}

// --- Objetos: serializacao com JSON.stringify / JSON.parse ---
export async function salvarPerfil(perfil) {
  try {
    await AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
  } catch (erro) {
    console.error("Erro ao salvar perfil", erro);
  }
}

export async function carregarPerfil() {
  try {
    const texto = await AsyncStorage.getItem(CHAVE_PERFIL);
    return texto ? JSON.parse(texto) : null;
  } catch (erro) {
    console.error("Erro ao ler perfil", erro);
    return null;
  }
}

// --- Remocao de uma chave especifica (mantem o tema intacto) ---
export async function removerPerfil() {
  try {
    await AsyncStorage.removeItem(CHAVE_PERFIL);
  } catch (erro) {
    console.error("Erro ao remover perfil", erro);
  }
}

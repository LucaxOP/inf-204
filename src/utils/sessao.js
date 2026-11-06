// Funcoes puras usadas pelos contextos (testaveis sem React)

// Converte o usuario em string para gravar no AsyncStorage
function serializarUsuario(usuario) {
  return JSON.stringify(usuario);
}

// Le a string salva; devolve null se estiver vazia ou corrompida
function desserializarUsuario(texto) {
  if (!texto) return null;
  try {
    const usuario = JSON.parse(texto);
    return usuario && typeof usuario === "object" && usuario.id ? usuario : null;
  } catch {
    return null;
  }
}

function alternarTema(temaAtual) {
  return temaAtual === "escuro" ? "claro" : "escuro";
}

module.exports = { serializarUsuario, desserializarUsuario, alternarTema };

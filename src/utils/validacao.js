const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valida os campos do formulario e devolve uma mensagem de erro ou null
function validarUtilizador({ nome, email }) {
  if (!nome || !nome.trim()) {
    return "Informe o nome.";
  }
  if (!email || !REGEX_EMAIL.test(email.trim())) {
    return "Informe um email valido.";
  }
  return null;
}

// Monta o corpo (payload) enviado para a API
function montarPayload({ nome, email }) {
  return { name: nome.trim(), email: email.trim().toLowerCase() };
}

module.exports = { validarUtilizador, montarPayload };

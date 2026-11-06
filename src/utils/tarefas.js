// Funcoes puras usadas pela tela de tarefas (testaveis sem o banco)

function normalizarDescricao(texto) {
  return (texto || "").trim().replace(/\s+/g, " ");
}

// No SQLite booleanos sao inteiros: 0 = pendente, 1 = concluida
function proximoStatus(statusAtual) {
  return statusAtual === 1 ? 0 : 1;
}

function alternarTema(temaAtual) {
  return temaAtual === "escuro" ? "claro" : "escuro";
}

function contarPendentes(tarefas) {
  return tarefas.filter((t) => t.concluida === 0).length;
}

module.exports = { normalizarDescricao, proximoStatus, alternarTema, contarPendentes };

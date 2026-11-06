const test = require("node:test");
const assert = require("node:assert/strict");

const { serializarUsuario, desserializarUsuario, alternarTema } = require("./sessao");

test("usuario salvo pode ser recuperado do armazenamento", () => {
  const usuario = { id: "123", nome: "Turma INF204", email: "teste@email.com" };
  assert.deepEqual(desserializarUsuario(serializarUsuario(usuario)), usuario);
});

test("desserializarUsuario devolve null sem sessao salva", () => {
  assert.equal(desserializarUsuario(null), null);
});

test("desserializarUsuario ignora conteudo corrompido", () => {
  assert.equal(desserializarUsuario("{quebrado"), null);
  assert.equal(desserializarUsuario("{}"), null);
});

test("alternarTema troca entre claro e escuro", () => {
  assert.equal(alternarTema("claro"), "escuro");
  assert.equal(alternarTema("escuro"), "claro");
});

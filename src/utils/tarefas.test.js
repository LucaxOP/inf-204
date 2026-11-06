const test = require("node:test");
const assert = require("node:assert/strict");

const { normalizarDescricao, proximoStatus, alternarTema, contarPendentes } = require("./tarefas");

test("normalizarDescricao remove espacos extras", () => {
  assert.equal(normalizarDescricao("  Estudar   SQLite  "), "Estudar SQLite");
  assert.equal(normalizarDescricao(undefined), "");
});

test("proximoStatus alterna entre 0 e 1", () => {
  assert.equal(proximoStatus(0), 1);
  assert.equal(proximoStatus(1), 0);
});

test("alternarTema troca claro e escuro", () => {
  assert.equal(alternarTema("claro"), "escuro");
  assert.equal(alternarTema("escuro"), "claro");
});

test("contarPendentes conta apenas tarefas nao concluidas", () => {
  assert.equal(contarPendentes([{ concluida: 0 }, { concluida: 1 }, { concluida: 0 }]), 2);
});

const test = require("node:test");
const assert = require("node:assert/strict");

const { validarUtilizador, montarPayload } = require("./validacao");

test("validarUtilizador aceita nome e email validos", () => {
  assert.equal(validarUtilizador({ nome: "Lucas", email: "lucas@email.com" }), null);
});

test("validarUtilizador exige o nome", () => {
  assert.equal(validarUtilizador({ nome: "  ", email: "a@b.com" }), "Informe o nome.");
});

test("validarUtilizador rejeita email invalido", () => {
  assert.equal(validarUtilizador({ nome: "Lucas", email: "lucas" }), "Informe um email valido.");
});

test("montarPayload normaliza os campos para o formato da API", () => {
  assert.deepEqual(montarPayload({ nome: " Lucas ", email: " Lucas@Email.com " }), {
    name: "Lucas",
    email: "lucas@email.com",
  });
});

const db = require("../database/db");
const { HttpError } = require("../utils/errors");

async function list() {
  return db.all("SELECT * FROM pacientes ORDER BY id DESC");
}

async function getById(id) {
  return db.get("SELECT * FROM pacientes WHERE id = ?", [id]);
}

async function assertExists(id) {
  const paciente = await getById(id);
  if (!paciente) {
    throw new HttpError(404, "paciente nao encontrado");
  }
  return paciente;
}

async function create(payload) {
  const result = await db.run(
    "INSERT INTO pacientes (nome, idade, condicao, observacoes) VALUES (?, ?, ?, ?)",
    [payload.nome, payload.idade ?? null, payload.condicao ?? null, payload.observacoes ?? null]
  );

  return getById(result.id);
}

async function update(id, payload) {
  const existing = await getById(id);
  if (!existing) {
    return null;
  }

  const updated = {
    nome: payload.nome ?? existing.nome,
    idade: payload.idade ?? existing.idade,
    condicao: payload.condicao ?? existing.condicao,
    observacoes: payload.observacoes ?? existing.observacoes,
  };

  await db.run(
    "UPDATE pacientes SET nome = ?, idade = ?, condicao = ?, observacoes = ? WHERE id = ?",
    [updated.nome, updated.idade, updated.condicao, updated.observacoes, id]
  );

  return getById(id);
}

async function remove(id) {
  const result = await db.run("DELETE FROM pacientes WHERE id = ?", [id]);
  return result.changes > 0;
}

module.exports = {
  list,
  getById,
  assertExists,
  create,
  update,
  remove,
};

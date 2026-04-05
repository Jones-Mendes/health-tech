const db = require("../database/db");

async function list() {
  return db.all("SELECT * FROM rotinas ORDER BY id DESC");
}

async function listByPaciente(pacienteId) {
  return db.all("SELECT * FROM rotinas WHERE paciente_id = ? ORDER BY id DESC", [pacienteId]);
}

async function getById(id) {
  return db.get("SELECT * FROM rotinas WHERE id = ?", [id]);
}

async function create(payload) {
  const result = await db.run(
    "INSERT INTO rotinas (paciente_id, descricao, periodo) VALUES (?, ?, ?)",
    [payload.paciente_id, payload.descricao, payload.periodo ?? null]
  );

  return getById(result.id);
}

async function update(id, payload) {
  const existing = await getById(id);
  if (!existing) {
    return null;
  }

  const updated = {
    paciente_id: payload.paciente_id ?? existing.paciente_id,
    descricao: payload.descricao ?? existing.descricao,
    periodo: payload.periodo ?? existing.periodo,
  };

  await db.run(
    "UPDATE rotinas SET paciente_id = ?, descricao = ?, periodo = ? WHERE id = ?",
    [updated.paciente_id, updated.descricao, updated.periodo, id]
  );

  return getById(id);
}

async function remove(id) {
  const result = await db.run("DELETE FROM rotinas WHERE id = ?", [id]);
  return result.changes > 0;
}

module.exports = {
  list,
  listByPaciente,
  getById,
  create,
  update,
  remove,
};

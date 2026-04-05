const db = require("../database/db");

async function list() {
  return db.all("SELECT * FROM evolucoes ORDER BY id DESC");
}

async function listByPaciente(pacienteId) {
  return db.all(
    "SELECT * FROM evolucoes WHERE paciente_id = ? ORDER BY data_registro DESC",
    [pacienteId]
  );
}

async function getById(id) {
  return db.get("SELECT * FROM evolucoes WHERE id = ?", [id]);
}

async function create(payload) {
  const result = await db.run(
    "INSERT INTO evolucoes (paciente_id, data_registro, descricao) VALUES (?, ?, ?)",
    [payload.paciente_id, payload.data_registro, payload.descricao]
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
    data_registro: payload.data_registro ?? existing.data_registro,
    descricao: payload.descricao ?? existing.descricao,
  };

  await db.run(
    "UPDATE evolucoes SET paciente_id = ?, data_registro = ?, descricao = ? WHERE id = ?",
    [updated.paciente_id, updated.data_registro, updated.descricao, id]
  );

  return getById(id);
}

async function remove(id) {
  const result = await db.run("DELETE FROM evolucoes WHERE id = ?", [id]);
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

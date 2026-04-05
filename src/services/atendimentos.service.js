const db = require("../database/db");

async function list() {
  return db.all("SELECT * FROM atendimentos ORDER BY id DESC");
}

async function listByPaciente(pacienteId) {
  return db.all(
    "SELECT * FROM atendimentos WHERE paciente_id = ? ORDER BY data_atendimento DESC",
    [pacienteId]
  );
}

async function getById(id) {
  return db.get("SELECT * FROM atendimentos WHERE id = ?", [id]);
}

async function create(payload) {
  const result = await db.run(
    "INSERT INTO atendimentos (paciente_id, data_atendimento, observacoes, humor) VALUES (?, ?, ?, ?)",
    [payload.paciente_id, payload.data_atendimento, payload.observacoes ?? null, payload.humor ?? null]
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
    data_atendimento: payload.data_atendimento ?? existing.data_atendimento,
    observacoes: payload.observacoes ?? existing.observacoes,
    humor: payload.humor ?? existing.humor,
  };

  await db.run(
    "UPDATE atendimentos SET paciente_id = ?, data_atendimento = ?, observacoes = ?, humor = ? WHERE id = ?",
    [
      updated.paciente_id,
      updated.data_atendimento,
      updated.observacoes,
      updated.humor,
      id,
    ]
  );

  return getById(id);
}

async function remove(id) {
  const result = await db.run("DELETE FROM atendimentos WHERE id = ?", [id]);
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

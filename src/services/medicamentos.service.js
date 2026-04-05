const db = require("../database/db");

async function list() {
  return db.all("SELECT * FROM medicamentos ORDER BY id DESC");
}

async function listByPaciente(pacienteId) {
  return db.all(
    "SELECT * FROM medicamentos WHERE paciente_id = ? ORDER BY id DESC",
    [pacienteId]
  );
}

async function getById(id) {
  return db.get("SELECT * FROM medicamentos WHERE id = ?", [id]);
}

async function create(payload) {
  const result = await db.run(
    "INSERT INTO medicamentos (paciente_id, nome, dosagem, horario) VALUES (?, ?, ?, ?)",
    [payload.paciente_id, payload.nome, payload.dosagem ?? null, payload.horario ?? null]
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
    nome: payload.nome ?? existing.nome,
    dosagem: payload.dosagem ?? existing.dosagem,
    horario: payload.horario ?? existing.horario,
  };

  await db.run(
    "UPDATE medicamentos SET paciente_id = ?, nome = ?, dosagem = ?, horario = ? WHERE id = ?",
    [updated.paciente_id, updated.nome, updated.dosagem, updated.horario, id]
  );

  return getById(id);
}

async function remove(id) {
  const result = await db.run("DELETE FROM medicamentos WHERE id = ?", [id]);
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

const medicamentosService = require("../services/medicamentos.service");
const pacientesService = require("../services/pacientes.service");
const { success, created } = require("../utils/response");
const { HttpError } = require("../utils/errors");
const { parseId, requireId, requireString, optionalString } = require("../utils/validators");

function validatePayload(payload, { requireAll = false } = {}) {
  const { paciente_id, nome, dosagem, horario } = payload;

  if (requireAll) {
    if (!parseId(paciente_id)) {
      throw new HttpError(400, "paciente_id e obrigatorio");
    }
    requireString(nome, "nome");
  }

  if (paciente_id !== undefined && paciente_id !== null && !parseId(paciente_id)) {
    throw new HttpError(400, "paciente_id invalido");
  }

  optionalString(nome, "nome");
  optionalString(dosagem, "dosagem");
  optionalString(horario, "horario");

  return { paciente_id, nome, dosagem, horario };
}

async function list(req, res, next) {
  try {
    const medicamentos = await medicamentosService.list();
    return success(res, medicamentos);
  } catch (err) {
    return next(err);
  }
}

async function listByPaciente(req, res, next) {
  try {
    const pacienteId = requireId(req.params.id);
    await pacientesService.assertExists(pacienteId);
    const medicamentos = await medicamentosService.listByPaciente(pacienteId);
    return success(res, medicamentos);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const medicamento = await medicamentosService.getById(id);
    if (!medicamento) {
      throw new HttpError(404, "medicamento nao encontrado");
    }
    return success(res, medicamento);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const payload = validatePayload(req.body, { requireAll: true });
    await pacientesService.assertExists(payload.paciente_id);
    const medicamento = await medicamentosService.create(payload);
    return created(res, medicamento, "medicamento criado");
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const payload = validatePayload(req.body);

    if (
      payload.paciente_id === undefined &&
      payload.nome === undefined &&
      payload.dosagem === undefined &&
      payload.horario === undefined
    ) {
      throw new HttpError(400, "nenhum campo para atualizar");
    }

    if (payload.paciente_id) {
      await pacientesService.assertExists(payload.paciente_id);
    }

    const medicamento = await medicamentosService.update(id, payload);
    if (!medicamento) {
      throw new HttpError(404, "medicamento nao encontrado");
    }
    return success(res, medicamento, "medicamento atualizado");
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const removed = await medicamentosService.remove(id);
    if (!removed) {
      throw new HttpError(404, "medicamento nao encontrado");
    }
    return success(res, { id }, "medicamento removido");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  list,
  listByPaciente,
  getById,
  create,
  update,
  remove,
};

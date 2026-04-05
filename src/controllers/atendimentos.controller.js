const atendimentosService = require("../services/atendimentos.service");
const pacientesService = require("../services/pacientes.service");
const { success, created } = require("../utils/response");
const { HttpError } = require("../utils/errors");
const { parseId, requireId, requireString, optionalString } = require("../utils/validators");

function validatePayload(payload, { requireAll = false } = {}) {
  const { paciente_id, data_atendimento, observacoes, humor } = payload;

  if (requireAll) {
    if (!parseId(paciente_id)) {
      throw new HttpError(400, "paciente_id e obrigatorio");
    }
    requireString(data_atendimento, "data_atendimento");
  }

  if (paciente_id !== undefined && paciente_id !== null && !parseId(paciente_id)) {
    throw new HttpError(400, "paciente_id invalido");
  }

  optionalString(data_atendimento, "data_atendimento");
  optionalString(observacoes, "observacoes");
  optionalString(humor, "humor");

  return { paciente_id, data_atendimento, observacoes, humor };
}

async function list(req, res, next) {
  try {
    const atendimentos = await atendimentosService.list();
    return success(res, atendimentos);
  } catch (err) {
    return next(err);
  }
}

async function listByPaciente(req, res, next) {
  try {
    const pacienteId = requireId(req.params.id);
    await pacientesService.assertExists(pacienteId);
    const atendimentos = await atendimentosService.listByPaciente(pacienteId);
    return success(res, atendimentos);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const atendimento = await atendimentosService.getById(id);
    if (!atendimento) {
      throw new HttpError(404, "atendimento nao encontrado");
    }
    return success(res, atendimento);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const payload = validatePayload(req.body, { requireAll: true });
    await pacientesService.assertExists(payload.paciente_id);
    const atendimento = await atendimentosService.create(payload);
    return created(res, atendimento, "atendimento criado");
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
      payload.data_atendimento === undefined &&
      payload.observacoes === undefined &&
      payload.humor === undefined
    ) {
      throw new HttpError(400, "nenhum campo para atualizar");
    }

    if (payload.paciente_id) {
      await pacientesService.assertExists(payload.paciente_id);
    }

    const atendimento = await atendimentosService.update(id, payload);
    if (!atendimento) {
      throw new HttpError(404, "atendimento nao encontrado");
    }
    return success(res, atendimento, "atendimento atualizado");
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const removed = await atendimentosService.remove(id);
    if (!removed) {
      throw new HttpError(404, "atendimento nao encontrado");
    }
    return success(res, { id }, "atendimento removido");
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

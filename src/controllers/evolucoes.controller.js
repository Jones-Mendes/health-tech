const evolucoesService = require("../services/evolucoes.service");
const pacientesService = require("../services/pacientes.service");
const { success, created } = require("../utils/response");
const { HttpError } = require("../utils/errors");
const { parseId, requireId, requireString, optionalString } = require("../utils/validators");

function validatePayload(payload, { requireAll = false } = {}) {
  const { paciente_id, data_registro, descricao } = payload;

  if (requireAll) {
    if (!parseId(paciente_id)) {
      throw new HttpError(400, "paciente_id e obrigatorio");
    }
    requireString(data_registro, "data_registro");
    requireString(descricao, "descricao");
  }

  if (paciente_id !== undefined && paciente_id !== null && !parseId(paciente_id)) {
    throw new HttpError(400, "paciente_id invalido");
  }

  optionalString(data_registro, "data_registro");
  optionalString(descricao, "descricao");

  return { paciente_id, data_registro, descricao };
}

async function list(req, res, next) {
  try {
    const evolucoes = await evolucoesService.list();
    return success(res, evolucoes);
  } catch (err) {
    return next(err);
  }
}

async function listByPaciente(req, res, next) {
  try {
    const pacienteId = requireId(req.params.id);
    await pacientesService.assertExists(pacienteId);
    const evolucoes = await evolucoesService.listByPaciente(pacienteId);
    return success(res, evolucoes);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const evolucao = await evolucoesService.getById(id);
    if (!evolucao) {
      throw new HttpError(404, "evolucao nao encontrada");
    }
    return success(res, evolucao);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const payload = validatePayload(req.body, { requireAll: true });
    await pacientesService.assertExists(payload.paciente_id);
    const evolucao = await evolucoesService.create(payload);
    return created(res, evolucao, "evolucao criada");
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
      payload.data_registro === undefined &&
      payload.descricao === undefined
    ) {
      throw new HttpError(400, "nenhum campo para atualizar");
    }

    if (payload.paciente_id) {
      await pacientesService.assertExists(payload.paciente_id);
    }

    const evolucao = await evolucoesService.update(id, payload);
    if (!evolucao) {
      throw new HttpError(404, "evolucao nao encontrada");
    }
    return success(res, evolucao, "evolucao atualizada");
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const removed = await evolucoesService.remove(id);
    if (!removed) {
      throw new HttpError(404, "evolucao nao encontrada");
    }
    return success(res, { id }, "evolucao removida");
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

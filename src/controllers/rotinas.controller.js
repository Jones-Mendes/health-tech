const rotinasService = require("../services/rotinas.service");
const pacientesService = require("../services/pacientes.service");
const { success, created } = require("../utils/response");
const { HttpError } = require("../utils/errors");
const { parseId, requireId, requireString, optionalString } = require("../utils/validators");

const PERIODOS = new Set(["manha", "tarde", "noite"]);

function validatePayload(payload, { requireAll = false } = {}) {
  const { paciente_id, descricao, periodo } = payload;

  if (requireAll) {
    if (!parseId(paciente_id)) {
      throw new HttpError(400, "paciente_id e obrigatorio");
    }
    requireString(descricao, "descricao");
  }

  if (paciente_id !== undefined && paciente_id !== null && !parseId(paciente_id)) {
    throw new HttpError(400, "paciente_id invalido");
  }

  optionalString(descricao, "descricao");

  if (periodo !== undefined && periodo !== null) {
    if (typeof periodo !== "string" || !PERIODOS.has(periodo)) {
      throw new HttpError(400, "periodo invalido");
    }
  }

  return { paciente_id, descricao, periodo };
}

async function list(req, res, next) {
  try {
    const rotinas = await rotinasService.list();
    return success(res, rotinas);
  } catch (err) {
    return next(err);
  }
}

async function listByPaciente(req, res, next) {
  try {
    const pacienteId = requireId(req.params.id);
    await pacientesService.assertExists(pacienteId);
    const rotinas = await rotinasService.listByPaciente(pacienteId);
    return success(res, rotinas);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const rotina = await rotinasService.getById(id);
    if (!rotina) {
      throw new HttpError(404, "rotina nao encontrada");
    }
    return success(res, rotina);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const payload = validatePayload(req.body, { requireAll: true });
    await pacientesService.assertExists(payload.paciente_id);
    const rotina = await rotinasService.create(payload);
    return created(res, rotina, "rotina criada");
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
      payload.descricao === undefined &&
      payload.periodo === undefined
    ) {
      throw new HttpError(400, "nenhum campo para atualizar");
    }

    if (payload.paciente_id) {
      await pacientesService.assertExists(payload.paciente_id);
    }

    const rotina = await rotinasService.update(id, payload);
    if (!rotina) {
      throw new HttpError(404, "rotina nao encontrada");
    }
    return success(res, rotina, "rotina atualizada");
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const removed = await rotinasService.remove(id);
    if (!removed) {
      throw new HttpError(404, "rotina nao encontrada");
    }
    return success(res, { id }, "rotina removida");
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

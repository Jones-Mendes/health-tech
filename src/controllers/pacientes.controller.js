const pacientesService = require("../services/pacientes.service");
const { success, created } = require("../utils/response");
const { HttpError } = require("../utils/errors");
const { requireId, requireString, optionalInt, optionalString } = require("../utils/validators");

function validatePayload(payload, { requireNome = false } = {}) {
  const { nome, idade, condicao, observacoes } = payload;

  if (requireNome) {
    requireString(nome, "nome");
  } else {
    optionalString(nome, "nome");
  }

  optionalInt(idade, "idade");
  optionalString(condicao, "condicao");
  optionalString(observacoes, "observacoes");

  return { nome, idade, condicao, observacoes };
}

async function list(req, res, next) {
  try {
    const pacientes = await pacientesService.list();
    return success(res, pacientes);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const paciente = await pacientesService.assertExists(id);
    return success(res, paciente);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const payload = validatePayload(req.body, { requireNome: true });
    const paciente = await pacientesService.create(payload);
    return created(res, paciente, "paciente criado");
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const payload = validatePayload(req.body);

    if (
      payload.nome === undefined &&
      payload.idade === undefined &&
      payload.condicao === undefined &&
      payload.observacoes === undefined
    ) {
      throw new HttpError(400, "nenhum campo para atualizar");
    }

    const paciente = await pacientesService.update(id, payload);
    if (!paciente) {
      throw new HttpError(404, "paciente nao encontrado");
    }

    return success(res, paciente, "paciente atualizado");
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = requireId(req.params.id);
    const removed = await pacientesService.remove(id);
    if (!removed) {
      throw new HttpError(404, "paciente nao encontrado");
    }
    return success(res, { id }, "paciente removido");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};

const { HttpError } = require("./errors");

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function requireId(value, field = "id") {
  const id = parseId(value);
  if (!id) {
    throw new HttpError(400, `${field} invalido`);
  }
  return id;
}

function requireString(value, field) {
  if (!value || typeof value !== "string") {
    throw new HttpError(400, `${field} e obrigatorio`);
  }
  return value;
}

function optionalString(value, field) {
  if (value !== undefined && value !== null && typeof value !== "string") {
    throw new HttpError(400, `${field} deve ser texto`);
  }
  return value;
}

function optionalInt(value, field) {
  if (value !== undefined && value !== null && !Number.isInteger(Number(value))) {
    throw new HttpError(400, `${field} deve ser inteiro`);
  }
  return value;
}

module.exports = {
  parseId,
  requireId,
  requireString,
  optionalString,
  optionalInt,
};

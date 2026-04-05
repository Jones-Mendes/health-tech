function success(res, data, message = null) {
  return res.json({ success: true, message, data });
}

function created(res, data, message = null) {
  return res.status(201).json({ success: true, message, data });
}

function failure(res, status, message, details = null) {
  return res.status(status).json({ success: false, message, details });
}

module.exports = {
  success,
  created,
  failure,
};

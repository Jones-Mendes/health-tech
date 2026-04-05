const express = require("express");
const rotinasController = require("../controllers/rotinas.controller");

const router = express.Router();

router.get("/", rotinasController.list);
router.post("/", rotinasController.create);
router.get("/:id", rotinasController.getById);
router.put("/:id", rotinasController.update);
router.delete("/:id", rotinasController.remove);

module.exports = router;

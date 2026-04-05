const express = require("express");
const pacientesController = require("../controllers/pacientes.controller");
const atendimentosController = require("../controllers/atendimentos.controller");
const rotinasController = require("../controllers/rotinas.controller");
const medicamentosController = require("../controllers/medicamentos.controller");
const evolucoesController = require("../controllers/evolucoes.controller");

const router = express.Router();

router.get("/", pacientesController.list);
router.post("/", pacientesController.create);
router.get("/:id", pacientesController.getById);
router.put("/:id", pacientesController.update);
router.delete("/:id", pacientesController.remove);

router.get("/:id/atendimentos", atendimentosController.listByPaciente);
router.get("/:id/rotinas", rotinasController.listByPaciente);
router.get("/:id/medicamentos", medicamentosController.listByPaciente);
router.get("/:id/evolucoes", evolucoesController.listByPaciente);

module.exports = router;

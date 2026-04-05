const express = require("express");

const pacientesRoutes = require("./pacientes.routes");
const atendimentosRoutes = require("./atendimentos.routes");
const rotinasRoutes = require("./rotinas.routes");
const medicamentosRoutes = require("./medicamentos.routes");
const evolucoesRoutes = require("./evolucoes.routes");

const router = express.Router();

router.use("/pacientes", pacientesRoutes);
router.use("/atendimentos", atendimentosRoutes);
router.use("/rotinas", rotinasRoutes);
router.use("/medicamentos", medicamentosRoutes);
router.use("/evolucoes", evolucoesRoutes);

module.exports = router;

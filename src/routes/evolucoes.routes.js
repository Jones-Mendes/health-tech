const express = require("express");
const evolucoesController = require("../controllers/evolucoes.controller");

const router = express.Router();

router.get("/", evolucoesController.list);
router.post("/", evolucoesController.create);
router.get("/:id", evolucoesController.getById);
router.put("/:id", evolucoesController.update);
router.delete("/:id", evolucoesController.remove);

module.exports = router;

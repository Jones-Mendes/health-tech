const express = require("express");
const atendimentosController = require("../controllers/atendimentos.controller");

const router = express.Router();

router.get("/", atendimentosController.list);
router.post("/", atendimentosController.create);
router.get("/:id", atendimentosController.getById);
router.put("/:id", atendimentosController.update);
router.delete("/:id", atendimentosController.remove);

module.exports = router;

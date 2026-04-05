const express = require("express");
const medicamentosController = require("../controllers/medicamentos.controller");

const router = express.Router();

router.get("/", medicamentosController.list);
router.post("/", medicamentosController.create);
router.get("/:id", medicamentosController.getById);
router.put("/:id", medicamentosController.update);
router.delete("/:id", medicamentosController.remove);

module.exports = router;

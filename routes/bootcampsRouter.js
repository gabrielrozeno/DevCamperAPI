const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, msg: "Busca todos os bootcamps" });
});

router.get("/:id", (req, res) => {
  res.json({ success: true, msg: `Busca bootcamp por ID: ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.json({ success: true, msg: "Cria um bootcamp" });
});

router.put("/:id", (req, res) => {
  res.json({
    success: true,
    msg: `Atualiza bootcamp pelo ID: ${req.params.id}`,
  });
});

router.delete("/:id", (req, res) => {
  res.json({ success: true, msg: `Deleta bootcamp pelo ID ${req.params.id}` });
});

module.exports = router; // Exportando Router

const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.json(db.getMenu());
});

router.get("/:id", (req, res) => {
  const item = db.getMenuItem(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

module.exports = router;

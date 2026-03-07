const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const user = db.login(username, password);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  res.json(user);
});

router.get("/balance/:username", (req, res) => {
  const balance = db.getBalance(req.params.username);
  if (balance === null) return res.status(404).json({ error: "User not found" });
  res.json({ balance });
});

module.exports = router;

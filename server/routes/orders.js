const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a new order
router.post("/", (req, res) => {
  const { studentName, items, username } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Items array is required" });
  }

  const resolvedItems = items.map((item) => {
    const menuItem = db.getMenuItem(item.menuItemId);
    if (!menuItem) throw new Error(`Menu item ${item.menuItemId} not found`);
    return {
      menuItemId: item.menuItemId,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity || 1,
    };
  });

  // Deduct balance if logged in
  if (username) {
    const total = resolvedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newBalance = db.deductBalance(username, total);
    if (newBalance === null) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
  }

  const order = db.createOrder(resolvedItems, studentName, username);

  const io = req.app.get("io");
  if (io) {
    io.emit("new-order", order);
    io.emit("stats-update", db.getStats());
  }

  res.status(201).json(order);
});

// Get all orders (kitchen view — include pickup codes so staff can label trays)
router.get("/", (req, res) => {
  const orders = db.getOrders();
  res.json(orders);
});

// Get order by display number
router.get("/number/:orderNumber", (req, res) => {
  const order = db.getOrderByNumber(req.params.orderNumber);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Get order by UUID
router.get("/:id", (req, res) => {
  const order = db.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Update order status (manual 2-step: pending → preparing → ready → picked-up)
// Auto-assigns next plate number when marking ready
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "preparing", "ready", "picked-up"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const current = db.getOrderById(req.params.id);
  if (!current) return res.status(404).json({ error: "Order not found" });

  const io = req.app.get("io");

  // Auto-assign plate number when marking as ready
  if (status === "ready" && !current.plateNumber) {
    db.assignNextPlate(req.params.id);
  }

  const order = db.updateOrderStatus(req.params.id, status);
  if (io) {
    io.emit("order-updated", order);
    io.emit("stats-update", db.getStats());
  }

  res.json(order);
});

// Verify pickup code (kitchen scans/enters code to confirm pickup)
router.post("/:id/verify", (req, res) => {
  const { pickupCode } = req.body;
  const order = db.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.pickupCode !== pickupCode) {
    return res.status(403).json({ error: "Invalid pickup code" });
  }

  const updated = db.updateOrderStatus(req.params.id, "picked-up");

  const io = req.app.get("io");
  if (io) {
    io.emit("order-updated", updated);
    io.emit("stats-update", db.getStats());
  }

  res.json({ verified: true, order: updated });
});

module.exports = router;

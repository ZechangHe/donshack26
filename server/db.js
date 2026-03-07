const { v4: uuidv4 } = require("uuid");

// ---- Pre-set Student Accounts (demo) ----
const students = new Map([
  ["zechang", { username: "zechang", password: "1234", name: "Zechang He", balance: 1000 }],
  ["gabriel", { username: "gabriel", password: "1234", name: "Gabriel Zubovsky", balance: 1000 }],
]);

function login(username, password) {
  const student = students.get(username.toLowerCase());
  if (!student || student.password !== password) return null;
  return { username: student.username, name: student.name, balance: student.balance };
}

function getBalance(username) {
  const student = students.get(username.toLowerCase());
  return student ? student.balance : null;
}

function deductBalance(username, amount) {
  const student = students.get(username.toLowerCase());
  if (!student || student.balance < amount) return null;
  student.balance -= amount;
  return student.balance;
}

// ---- Menu Items (seed data) ----
const menuItems = [
  { id: "1", name: "Grilled Chicken Wrap", description: "Grilled chicken, lettuce, tomato, ranch dressing", price: 8.99, category: "Mains", image: "\ud83c\udf2f", available: true },
  { id: "2", name: "Veggie Buddha Bowl", description: "Quinoa, roasted vegetables, tahini dressing", price: 9.49, category: "Mains", image: "\ud83e\udd57", available: true },
  { id: "3", name: "Margherita Pizza Slice", description: "Fresh mozzarella, basil, tomato sauce", price: 4.99, category: "Mains", image: "\ud83c\udf55", available: true },
  { id: "4", name: "Caesar Salad", description: "Romaine, parmesan, croutons, caesar dressing", price: 6.99, category: "Sides", image: "\ud83e\udd6c", available: true },
  { id: "5", name: "French Fries", description: "Crispy golden fries with ketchup", price: 3.49, category: "Sides", image: "\ud83c\udf5f", available: true },
  { id: "6", name: "Chocolate Brownie", description: "Rich chocolate brownie with walnuts", price: 3.99, category: "Desserts", image: "\ud83c\udf6b", available: true },
  { id: "7", name: "Fresh Fruit Cup", description: "Seasonal mixed fruits", price: 4.49, category: "Desserts", image: "\ud83c\udf53", available: true },
  { id: "8", name: "Iced Lemonade", description: "Freshly squeezed lemonade with ice", price: 2.99, category: "Drinks", image: "\ud83c\udf4b", available: true },
  { id: "9", name: "Cold Brew Coffee", description: "Smooth cold brew, served over ice", price: 3.99, category: "Drinks", image: "\u2615", available: true },
  { id: "10", name: "Berry Smoothie", description: "Blueberry, strawberry, banana, yogurt", price: 5.49, category: "Drinks", image: "\ud83e\uded0", available: true },
];

// ---- Reusable Plate Slots (1–50) ----
// Each plate number = a physical slot on the pickup counter
// When picked up → slot frees up → system reuses it for new orders
const TOTAL_PLATES = 50;
const usedPlates = new Set();

function assignNextPlate(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;
  // Find the lowest available plate number
  for (let i = 1; i <= TOTAL_PLATES; i++) {
    if (!usedPlates.has(i)) {
      usedPlates.add(i);
      order.plateNumber = i;
      return order;
    }
  }
  // All 50 slots full (very unlikely) — assign without tracking
  order.plateNumber = null;
  return order;
}

function releasePlate(plateNumber) {
  usedPlates.delete(plateNumber);
}

// ---- Orders ----
const orders = [];
let totalOrdersCount = 0;

function generatePickupCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getMenu() {
  return menuItems.filter((item) => item.available);
}

function getMenuItem(id) {
  return menuItems.find((item) => item.id === id);
}

function createOrder(items, studentName, username) {
  totalOrdersCount++;
  const order = {
    id: uuidv4(),
    orderNumber: totalOrdersCount,
    studentName: studentName || "Anonymous",
    username: username || null,
    pickupCode: generatePickupCode(),
    items,
    status: "pending",
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

function getOrders() {
  return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getOrderById(id) {
  return orders.find((o) => o.id === id);
}

function getOrderByNumber(orderNumber) {
  return orders.find((o) => o.orderNumber === Number(orderNumber));
}

function updateOrderStatus(id, status) {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  // Release plate slot when order is picked up
  if (status === "picked-up" && order.plateNumber) {
    releasePlate(order.plateNumber);
  }
  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
}

function getStats() {
  const papersSaved = totalOrdersCount * 2;
  const activeOrders = orders.filter((o) => o.status !== "picked-up").length;
  return {
    totalOrders: totalOrdersCount,
    papersSaved,
    treesEquivalent: (papersSaved / 8333).toFixed(4),
    activeOrders,
  };
}

function resetOrders() {
  orders.length = 0;
  totalOrdersCount = 0;
  usedPlates.clear();
  for (const [, student] of students) {
    student.balance = 1000;
  }
}

module.exports = {
  login,
  getBalance,
  deductBalance,
  getMenu,
  getMenuItem,
  createOrder,
  getOrders,
  getOrderById,
  getOrderByNumber,
  updateOrderStatus,
  getStats,
  assignNextPlate,
  resetOrders,
};

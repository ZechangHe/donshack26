const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const statsRoutes = require("./routes/stats");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Make io accessible in route handlers
app.set("io", io);

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "GreenBite" });
});
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`GreenBite server running on port ${PORT}`);
});

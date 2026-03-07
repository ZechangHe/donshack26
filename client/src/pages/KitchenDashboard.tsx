import { useEffect, useState, useRef } from "react";
import type { Order } from "../types";
import { useSocket } from "../hooks/useSocket";
import OrderCard from "../components/OrderCard";

// Simple beep sound using Web Audio API
function playNewOrderSound() {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 880;
    oscillator.type = "sine";
    gain.gain.value = 0.3;
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch {
    // Audio not available — silently ignore
  }
}

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const socketRef = useSocket();
  const isInitialLoad = useRef(true);
  // Force re-render every 30s to update overdue highlighting
  const [, setTick] = useState(0);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        isInitialLoad.current = false;
      });
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    function handleNew(order: Order) {
      setOrders((prev) => [order, ...prev]);
      if (!isInitialLoad.current) {
        playNewOrderSound();
      }
    }

    function handleUpdate(updated: Order) {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    }

    function handleOrdersReset() {
      setOrders([]);
    }

    socket.on("new-order", handleNew);
    socket.on("order-updated", handleUpdate);
    socket.on("orders-reset", handleOrdersReset);

    return () => {
      socket.off("new-order", handleNew);
      socket.off("order-updated", handleUpdate);
      socket.off("orders-reset", handleOrdersReset);
    };
  }, [socketRef]);

  // Tick every 30 seconds for overdue highlighting
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  async function handleReset() {
    if (!window.confirm("Reset all orders and balances? This cannot be undone.")) return;
    await fetch("/api/orders/reset", { method: "DELETE" });
    setOrders([]);
  }

  async function handleUpdateStatus(orderId: string, status: Order["status"]) {
    await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  const pending = orders.filter((o) => o.status === "pending");
  const preparing = orders.filter((o) => o.status === "preparing");
  const ready = orders.filter((o) => o.status === "ready");

  return (
    <div className="kitchen-dashboard">
      <div className="kitchen-header">
        <h1>Kitchen Dashboard</h1>
        <button className="btn-reset" onClick={handleReset}>Reset All</button>
      </div>
      <div className="kitchen-columns">
        <div className="kitchen-column">
          <h2>Pending ({pending.length})</h2>
          {pending.map((o) => (
            <OrderCard key={o.id} order={o} onUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
        <div className="kitchen-column">
          <h2>Preparing ({preparing.length})</h2>
          {preparing.map((o) => (
            <OrderCard key={o.id} order={o} onUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
        <div className="kitchen-column">
          <h2>Ready ({ready.length})</h2>
          {ready.map((o) => (
            <OrderCard key={o.id} order={o} onUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
      </div>
    </div>
  );
}

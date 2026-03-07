import { useEffect, useState } from "react";
import type { Order } from "../types";
import { useSocket } from "../hooks/useSocket";
import OrderCard from "../components/OrderCard";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const socketRef = useSocket();

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    function handleNew(order: Order) {
      setOrders((prev) => [order, ...prev]);
    }

    function handleUpdate(updated: Order) {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    }

    socket.on("new-order", handleNew);
    socket.on("order-updated", handleUpdate);

    return () => {
      socket.off("new-order", handleNew);
      socket.off("order-updated", handleUpdate);
    };
  }, [socketRef]);

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
      <h1>Kitchen Dashboard</h1>
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

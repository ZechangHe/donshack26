import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Order } from "../types";
import { useSocket } from "../hooks/useSocket";
import StatusBadge from "../components/StatusBadge";

const STEPS = ["pending", "preparing", "ready", "picked-up"] as const;

function getStepIndex(status: string): number {
  return STEPS.indexOf(status as (typeof STEPS)[number]);
}

export default function OrderStatusPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const socketRef = useSocket();

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then(setOrder);
  }, [orderId]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    function handleUpdate(updated: Order) {
      if (updated.id === orderId) {
        setOrder(updated);
      }
    }

    socket.on("order-updated", handleUpdate);
    return () => {
      socket.off("order-updated", handleUpdate);
    };
  }, [socketRef, orderId]);

  if (!order) return <div className="loading">Loading order...</div>;

  return (
    <div className="order-status-page">
      <h1>Order #{order.orderNumber}</h1>
      <div className="order-status-card">
        <StatusBadge status={order.status} />
        <div className="status-timeline">
          {STEPS.map((step) => (
            <div
              key={step}
              className={`timeline-step ${getStepIndex(order.status) >= getStepIndex(step) ? "active" : ""}`}
            >
              {step}
            </div>
          ))}
        </div>
        {order.pickupCode && (
          <div className="pickup-code-box">
            <p className="pickup-code-label">Your Pickup Code</p>
            <p className="pickup-code">{order.pickupCode}</p>
            <p className="pickup-code-hint">Show this code when picking up your order</p>
          </div>
        )}
        {order.plateNumber && (
          <div className="plate-number-box">
            <p className="plate-number-label">Your Plate Number</p>
            <p className="plate-number-big">#{order.plateNumber}</p>
            <p className="plate-number-hint">Find the tray with this number</p>
          </div>
        )}
        <h3>{order.studentName}</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.menuItemId}>
              {item.quantity}x {item.name} — ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h2>Total: ${order.total.toFixed(2)}</h2>
      </div>
    </div>
  );
}

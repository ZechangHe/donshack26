import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Order } from "../types";
import { useSocket } from "../hooks/useSocket";
import StatusBadge from "../components/StatusBadge";

const STEPS = ["pending", "preparing", "ready", "picked-up"] as const;

function getStepIndex(status: string): number {
  return STEPS.indexOf(status as (typeof STEPS)[number]);
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useSocket();

  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem("greenbite-orders") || "[]");
    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(
      ids.map((id) =>
        fetch(`/api/orders/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      setOrders(results.filter((o): o is Order => o !== null));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    function handleUpdate(updated: Order) {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    }

    socket.on("order-updated", handleUpdate);
    return () => {
      socket.off("order-updated", handleUpdate);
    };
  }, [socketRef]);

  // Sort: active orders first, picked-up last
  const sorted = [...orders].sort((a, b) => {
    const aPickedUp = a.status === "picked-up" ? 1 : 0;
    const bPickedUp = b.status === "picked-up" ? 1 : 0;
    if (aPickedUp !== bPickedUp) return aPickedUp - bPickedUp;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>No orders yet. <Link to="/menu">Go order some food!</Link></p>
        </div>
      ) : (
        <div className="my-orders-list">
          {sorted.map((order) => (
            <div
              key={order.id}
              className={`my-order-card ${order.status === "picked-up" ? "picked-up" : ""}`}
            >
              <div className="my-order-header">
                <h3>Order #{order.orderNumber}</h3>
                <StatusBadge status={order.status} />
              </div>
              <p className="my-order-name">{order.studentName}</p>

              <div className="my-order-items">
                {order.items.map((item) => (
                  <div key={item.menuItemId} className="my-order-item-row">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="my-order-total">Total: ${order.total.toFixed(2)}</div>

              {order.pickupCode && (
                <div className="my-order-pickup">
                  <div className="my-order-pickup-label">YOUR PICKUP CODE</div>
                  <div className="my-order-pickup-code">{order.pickupCode}</div>
                  <div className="my-order-pickup-hint">Show this when picking up</div>
                </div>
              )}

              {order.plateNumber && (
                <div className="my-order-plate">
                  <span className="my-order-plate-label">Plate</span>
                  <span className="my-order-plate-num">#{order.plateNumber}</span>
                  <span className="my-order-plate-hint">Find this tray at the counter</span>
                </div>
              )}

              <div className="my-order-timeline">
                {STEPS.map((step) => (
                  <div
                    key={step}
                    className={`timeline-step ${getStepIndex(order.status) >= getStepIndex(step) ? "active" : ""}`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

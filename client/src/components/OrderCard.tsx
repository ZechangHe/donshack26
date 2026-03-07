import { useState } from "react";
import type { Order } from "../types";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
  onVerifyPickup: (orderId: string, code: string) => Promise<boolean>;
}

const NEXT_STATUS: Record<string, Order["status"] | null> = {
  pending: "preparing",
  preparing: "ready",
  ready: null, // "ready" → needs pickup code verification
  "picked-up": null,
};

export default function OrderCard({ order, onUpdateStatus, onVerifyPickup }: Props) {
  const next = NEXT_STATUS[order.status];
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  async function handleVerify() {
    if (!code.trim()) return;
    setVerifying(true);
    setError("");
    const success = await onVerifyPickup(order.id, code.trim().toUpperCase());
    if (!success) {
      setError("Invalid code");
    }
    setVerifying(false);
  }

  return (
    <div className={`order-card status-${order.status}`}>
      <div className="order-card-header">
        <h3>Order #{order.orderNumber}</h3>
        <StatusBadge status={order.status} />
      </div>
      <p className="order-card-name">{order.studentName}</p>
      <ul className="order-card-items">
        {order.items.map((item) => (
          <li key={item.menuItemId}>
            {item.quantity}x {item.name}
          </li>
        ))}
      </ul>
      <div className="order-card-footer">
        <span className="order-card-total">${order.total.toFixed(2)}</span>
        {next && (
          <button className="btn btn-primary" onClick={() => onUpdateStatus(order.id, next)}>
            Mark as {next}
          </button>
        )}
        {order.status === "ready" && (
          <div className="verify-pickup">
            <input
              type="text"
              placeholder="Pickup code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="verify-input"
              maxLength={6}
            />
            <button className="btn btn-primary" onClick={handleVerify} disabled={verifying}>
              {verifying ? "..." : "Verify"}
            </button>
            {error && <span className="verify-error">{error}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

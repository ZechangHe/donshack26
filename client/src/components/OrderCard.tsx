import type { Order } from "../types";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
}

const NEXT_STATUS: Record<string, Order["status"] | null> = {
  pending: "ready",       // server auto-transitions through "preparing" + auto-assigns plate
  preparing: "ready",     // in case order is mid-transition
  ready: "picked-up",
  "picked-up": null,
};

export default function OrderCard({ order, onUpdateStatus }: Props) {
  const next = NEXT_STATUS[order.status];

  // Highlight if pending for more than 3 minutes
  const ageMs = Date.now() - new Date(order.createdAt).getTime();
  const isOverdue = order.status === "pending" && ageMs > 3 * 60 * 1000;

  return (
    <div className={`order-card status-${order.status}${isOverdue ? " overdue" : ""}`}>
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
      {order.pickupCode && (
        <div className="order-card-pickup-code">
          <span className="pickup-label">Pickup Code:</span>
          <span className="pickup-value">{order.pickupCode}</span>
        </div>
      )}
      {order.plateNumber && (
        <div className="order-card-plate">
          <span className="plate-icon">🔢</span>
          <span className="plate-number">Plate #{order.plateNumber}</span>
        </div>
      )}
      <div className="order-card-footer">
        <span className="order-card-total">${order.total.toFixed(2)}</span>
        {next && (
          <button className="btn btn-primary" onClick={() => onUpdateStatus(order.id, next)}>
            Mark as {next}
          </button>
        )}
      </div>
    </div>
  );
}

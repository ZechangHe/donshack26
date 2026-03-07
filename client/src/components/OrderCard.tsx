import type { Order } from "../types";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
}

const NEXT_STATUS: Record<string, Order["status"] | null> = {
  pending: "preparing",
  preparing: "ready",
  ready: "picked-up",
  "picked-up": null,
};

export default function OrderCard({ order, onUpdateStatus }: Props) {
  const next = NEXT_STATUS[order.status];

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
      </div>
    </div>
  );
}

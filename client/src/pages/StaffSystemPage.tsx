import { useEffect, useState, useRef } from "react";
import type { Order } from "../types";
import { useSocket } from "../hooks/useSocket";
import StatusBadge from "../components/StatusBadge";

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
    // Audio not available
  }
}

export default function StaffSystemPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStaff, setSelectedStaff] = useState(1);
  const [staffCount, setStaffCount] = useState(2);
  const [expandedPlate, setExpandedPlate] = useState<number | null>(null);
  const socketRef = useSocket();
  const isInitialLoad = useRef(true);

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
      if (!isInitialLoad.current) playNewOrderSound();
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

  async function handleUpdateStatus(orderId: string, status: Order["status"], assignedStaff?: number) {
    const body: Record<string, unknown> = { status };
    if (assignedStaff != null) body.assignedStaff = assignedStaff;

    await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  function getStaffPlates(staffNum: number): number[] {
    return orders
      .filter((o) => o.assignedStaff === staffNum && o.status === "ready" && o.plateNumber)
      .map((o) => o.plateNumber!)
      .sort((a, b) => a - b);
  }

  function getStaffActivePlates(staffNum: number): number[] {
    return orders
      .filter(
        (o) =>
          o.assignedStaff === staffNum &&
          (o.status === "preparing" || o.status === "ready") &&
          o.plateNumber
      )
      .map((o) => o.plateNumber!)
      .sort((a, b) => a - b);
  }

  const pending = orders.filter((o) => o.status === "pending");
  const myPreparing = orders.filter((o) => o.status === "preparing" && o.assignedStaff === selectedStaff);
  const myReady = orders.filter((o) => o.status === "ready" && o.assignedStaff === selectedStaff);

  // All ready orders grouped by staff for pickup section
  const allReady = orders.filter((o) => o.status === "ready");
  const readyByStaff = new Map<number, Order[]>();
  for (const o of allReady) {
    const staff = o.assignedStaff ?? 0;
    if (!readyByStaff.has(staff)) readyByStaff.set(staff, []);
    readyByStaff.get(staff)!.push(o);
  }

  return (
    <div className="staff-system">
      <h1>Staff System</h1>

      {/* Section 1: Staff Selection Bar */}
      <div className="staff-bar">
        {Array.from({ length: staffCount }, (_, i) => i + 1).map((num) => {
          const plates = getStaffActivePlates(num);
          return (
            <button
              key={num}
              className={`staff-btn${selectedStaff === num ? " staff-btn-active" : ""}`}
              onClick={() => setSelectedStaff(num)}
            >
              Staff {num}
              {plates.length > 0 && (
                <span className="staff-btn-plates">
                  ({plates.map((p) => `#${p}`).join(", ")})
                </span>
              )}
            </button>
          );
        })}
        {staffCount < 5 && (
          <button className="staff-btn staff-btn-add" onClick={() => setStaffCount((c) => c + 1)}>
            + Add Staff
          </button>
        )}
      </div>

      {/* Section 2: 3-Column Board */}
      <div className="staff-board">
        <div className="kitchen-column">
          <h2>Pending ({pending.length})</h2>
          {pending.map((o) => (
            <StaffOrderCard
              key={o.id}
              order={o}
              onAction={() => handleUpdateStatus(o.id, "preparing", selectedStaff)}
              actionLabel="Start Preparing"
            />
          ))}
        </div>
        <div className="kitchen-column">
          <h2>My Preparing ({myPreparing.length})</h2>
          {myPreparing.map((o) => (
            <StaffOrderCard
              key={o.id}
              order={o}
              onAction={() => handleUpdateStatus(o.id, "ready")}
              actionLabel="Mark as Ready"
            />
          ))}
        </div>
        <div className="kitchen-column">
          <h2>My Ready ({myReady.length})</h2>
          {myReady.map((o) => (
            <StaffOrderCard
              key={o.id}
              order={o}
              onAction={() => handleUpdateStatus(o.id, "picked-up")}
              actionLabel="Mark as Picked Up"
              showLargePlate
            />
          ))}
        </div>
      </div>

      {/* Section 3: Quick Pickup Lookup */}
      <div className="staff-pickup-section">
        <h2>Quick Pickup Lookup</h2>
        {readyByStaff.size === 0 && <p className="staff-pickup-empty">No orders ready for pickup.</p>}
        {Array.from(readyByStaff.entries())
          .sort(([a], [b]) => a - b)
          .map(([staffNum, staffOrders]) => (
            <div key={staffNum} className="staff-pickup-group">
              <h3>{staffNum === 0 ? "Unassigned" : `Staff ${staffNum}`}</h3>
              <div className="staff-pickup-chips">
                {staffOrders
                  .sort((a, b) => (a.plateNumber ?? 0) - (b.plateNumber ?? 0))
                  .map((o) => (
                    <div key={o.id} className="staff-plate-chip-wrapper">
                      <button
                        className={`staff-plate-chip${expandedPlate === o.plateNumber ? " expanded" : ""}`}
                        onClick={() =>
                          setExpandedPlate(expandedPlate === o.plateNumber ? null : o.plateNumber ?? null)
                        }
                      >
                        Plate #{o.plateNumber}
                      </button>
                      {expandedPlate === o.plateNumber && (
                        <div className="staff-plate-expanded">
                          <p className="staff-plate-student">{o.studentName}</p>
                          <p className="staff-plate-code">
                            Pickup Code: <strong>{o.pickupCode}</strong>
                          </p>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleUpdateStatus(o.id, "picked-up");
                              setExpandedPlate(null);
                            }}
                          >
                            Confirm Picked Up
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function StaffOrderCard({
  order,
  onAction,
  actionLabel,
  showLargePlate,
}: {
  order: Order;
  onAction: () => void;
  actionLabel: string;
  showLargePlate?: boolean;
}) {
  return (
    <div className={`order-card status-${order.status}`}>
      <div className="order-card-header">
        <h3>Order #{order.orderNumber}</h3>
        <StatusBadge status={order.status} />
      </div>
      <p className="order-card-name">{order.studentName}</p>
      {order.assignedStaff && (
        <span className="staff-badge">Staff {order.assignedStaff}</span>
      )}
      <ul className="order-card-items">
        {order.items.map((item) => (
          <li key={item.menuItemId}>
            {item.quantity}x {item.name}
          </li>
        ))}
      </ul>
      {showLargePlate && order.plateNumber && (
        <div className="staff-plate-large">Plate #{order.plateNumber}</div>
      )}
      {!showLargePlate && order.plateNumber && (
        <div className="order-card-plate">
          <span className="plate-number">Plate #{order.plateNumber}</span>
        </div>
      )}
      <div className="order-card-footer">
        <span className="order-card-total">${order.total.toFixed(2)}</span>
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

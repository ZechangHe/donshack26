import type { Order } from "../types";

export default function StatusBadge({ status }: { status: Order["status"] }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

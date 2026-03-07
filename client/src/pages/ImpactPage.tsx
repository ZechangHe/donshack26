import { useEffect, useState } from "react";
import type { Stats } from "../types";
import { useSocket } from "../hooks/useSocket";

export default function ImpactPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const socketRef = useSocket();

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on("stats-update", setStats);
    return () => {
      socket.off("stats-update", setStats);
    };
  }, [socketRef]);

  if (!stats) return <div className="loading">Loading stats...</div>;

  return (
    <div className="impact-page">
      <h1>Environmental Impact</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-emoji">📋</span>
          <h2>{stats.totalOrders}</h2>
          <p>Digital Orders</p>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">📄</span>
          <h2>{stats.papersSaved}</h2>
          <p>Papers Saved</p>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">🌳</span>
          <h2>{stats.treesEquivalent}</h2>
          <p>Trees Equivalent</p>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">🔥</span>
          <h2>{stats.activeOrders}</h2>
          <p>Active Orders</p>
        </div>
      </div>
      <div className="impact-message">
        <h2>Going paperless, one order at a time</h2>
        <p>
          Every order placed through GreenBite saves at least 2 sheets of paper
          — one for the order ticket and one for the receipt. Together, we are
          making campus dining more sustainable.
        </p>
      </div>
    </div>
  );
}

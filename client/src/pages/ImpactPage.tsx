import { useEffect, useState } from "react";
import type { Stats } from "../types";
import { useSocket } from "../hooks/useSocket";

const iconProps = { width: 48, height: 48, viewBox: "0 0 48 48", fill: "none", stroke: "#6ee7b7", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconDigitalOrders() {
  return (
    <svg {...iconProps}>
      {/* Clipboard */}
      <rect x="10" y="8" width="28" height="36" rx="3" />
      <path d="M18 8 L18 4 L30 4 L30 8" strokeWidth="2" />
      {/* Checkmark lines */}
      <path d="M16 18 L18 20 L22 16" strokeWidth="2" />
      <line x1="26" y1="18" x2="34" y2="18" strokeWidth="2" />
      <path d="M16 26 L18 28 L22 24" strokeWidth="2" />
      <line x1="26" y1="26" x2="34" y2="26" strokeWidth="2" />
      <path d="M16 34 L18 36 L22 32" strokeWidth="2" />
      <line x1="26" y1="34" x2="34" y2="34" strokeWidth="2" />
    </svg>
  );
}

function IconPapersSaved() {
  return (
    <svg {...iconProps}>
      {/* Paper */}
      <path d="M10 6 L30 6 L34 12 L34 42 L10 42 Z" />
      <path d="M30 6 L30 12 L34 12" strokeWidth="2" />
      {/* Lines */}
      <line x1="14" y1="20" x2="30" y2="20" strokeWidth="1.5" />
      <line x1="14" y1="26" x2="30" y2="26" strokeWidth="1.5" />
      {/* Leaf overlay */}
      <path d="M34 28 Q42 22 44 14 Q36 18 34 28" fill="none" stroke="#6ee7b7" strokeWidth="2" />
      <path d="M38 22 L40 18" strokeWidth="1.5" />
    </svg>
  );
}

function IconTreesEquiv() {
  return (
    <svg {...iconProps}>
      {/* Tree trunk */}
      <rect x="21" y="32" width="6" height="12" rx="1" stroke="#92400e" fill="#92400e" />
      {/* Tree canopy layers */}
      <path d="M24 4 L34 18 L28 18 L36 28 L30 28 L38 36 L10 36 L18 28 L12 28 L20 18 L14 18 Z" />
    </svg>
  );
}

function IconActiveOrders() {
  return (
    <svg {...iconProps}>
      {/* Flame */}
      <path d="M24 4 Q32 16 32 26 Q32 38 24 42 Q16 38 16 26 Q16 16 24 4 Z" />
      <path d="M24 20 Q28 26 28 32 Q28 38 24 42 Q20 38 20 32 Q20 26 24 20 Z" stroke="#fbbf24" strokeWidth="2" />
      {/* Inner flame */}
      <path d="M24 28 Q26 32 26 36 Q26 40 24 42 Q22 40 22 36 Q22 32 24 28 Z" stroke="#f87171" strokeWidth="1.5" />
    </svg>
  );
}

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
          <span className="stat-emoji"><IconDigitalOrders /></span>
          <h2>{stats.totalOrders}</h2>
          <p>Digital Orders</p>
        </div>
        <div className="stat-card">
          <span className="stat-emoji"><IconPapersSaved /></span>
          <h2>{stats.papersSaved}</h2>
          <p>Papers Saved</p>
        </div>
        <div className="stat-card">
          <span className="stat-emoji"><IconTreesEquiv /></span>
          <h2>{stats.treesEquivalent}</h2>
          <p>Trees Equivalent</p>
        </div>
        <div className="stat-card">
          <span className="stat-emoji"><IconActiveOrders /></span>
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

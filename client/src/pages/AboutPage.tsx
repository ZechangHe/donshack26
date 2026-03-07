import { useState, type ReactNode } from "react";

type Tab = "student" | "kitchen";

/* ── Custom SVG Problem Icons ── */
const iconProps = { width: 48, height: 48, viewBox: "0 0 48 48", fill: "none", stroke: "#6ee7b7", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconEnvironment() {
  return (
    <svg {...iconProps}>
      {/* Globe */}
      <circle cx="24" cy="24" r="16" />
      <ellipse cx="24" cy="24" rx="8" ry="16" />
      <line x1="8" y1="24" x2="40" y2="24" />
      {/* Thermometer rising */}
      <line x1="38" y1="8" x2="38" y2="20" stroke="#f87171" strokeWidth="3" />
      <circle cx="38" cy="22" r="3" fill="#f87171" stroke="#f87171" />
      <path d="M35 8 L38 4 L41 8" stroke="#f87171" strokeWidth="2" />
    </svg>
  );
}

function IconPaperWaste() {
  return (
    <svg {...iconProps}>
      {/* Tree stump */}
      <path d="M18 38 L18 28 Q18 24 22 24 L26 24 Q30 24 30 28 L30 38" fill="#92400e" stroke="#92400e" />
      <ellipse cx="24" cy="24" rx="8" ry="3" fill="#92400e" stroke="#92400e" />
      {/* Paper sheets flying away */}
      <rect x="6" y="6" width="10" height="13" rx="1" stroke="#6ee7b7" strokeWidth="2" transform="rotate(-15 11 12)" />
      <line x1="8" y1="10" x2="14" y2="9" stroke="#6ee7b7" strokeWidth="1.5" transform="rotate(-15 11 12)" />
      <line x1="8" y1="13" x2="14" y2="12" stroke="#6ee7b7" strokeWidth="1.5" transform="rotate(-15 11 12)" />
      <rect x="32" y="4" width="10" height="13" rx="1" stroke="#6ee7b7" strokeWidth="2" transform="rotate(20 37 10)" />
      <line x1="34" y1="8" x2="40" y2="8" stroke="#6ee7b7" strokeWidth="1.5" transform="rotate(20 37 10)" />
      <line x1="34" y1="11" x2="40" y2="11" stroke="#6ee7b7" strokeWidth="1.5" transform="rotate(20 37 10)" />
    </svg>
  );
}

function IconDoubleQueue() {
  return (
    <svg {...iconProps}>
      {/* Queue line 1 - at kiosk */}
      <circle cx="8" cy="10" r="3" />
      <circle cx="8" cy="22" r="3" />
      <circle cx="8" cy="34" r="3" />
      {/* Queue line 2 - at counter */}
      <circle cx="28" cy="10" r="3" />
      <circle cx="28" cy="22" r="3" />
      <circle cx="28" cy="34" r="3" />
      {/* Arrow between queues */}
      <path d="M14 22 L22 22" />
      <path d="M19 18 L23 22 L19 26" />
      {/* Kiosk & counter */}
      <rect x="34" y="6" width="8" height="32" rx="2" strokeWidth="2" />
      <line x1="34" y1="14" x2="42" y2="14" strokeWidth="1.5" />
      {/* Clock showing time wasted */}
      <circle cx="38" cy="10" r="2.5" stroke="#f87171" strokeWidth="1.5" />
      <path d="M38 8.5 L38 10 L39.5 10" stroke="#f87171" strokeWidth="1.5" />
    </svg>
  );
}

function IconOrderTheft() {
  return (
    <svg {...iconProps}>
      {/* Tray */}
      <path d="M8 28 Q8 24 12 24 L36 24 Q40 24 40 28" strokeWidth="2.5" />
      <line x1="6" y1="28" x2="42" y2="28" strokeWidth="2.5" />
      {/* Burger on tray */}
      <ellipse cx="24" cy="22" rx="8" ry="3" stroke="#fbbf24" strokeWidth="2" />
      <path d="M16 20 Q16 14 24 14 Q32 14 32 20" stroke="#fbbf24" strokeWidth="2" />
      {/* Sneaky hand reaching */}
      <path d="M40 12 Q44 14 42 18 L38 20" stroke="#f87171" strokeWidth="2.5" />
      <path d="M42 12 L44 10" stroke="#f87171" strokeWidth="2" />
      <path d="M43 14 L46 13" stroke="#f87171" strokeWidth="2" />
      {/* Question mark */}
      <text x="10" y="18" fontSize="14" fontWeight="bold" fill="#f87171" stroke="none">?</text>
    </svg>
  );
}

function IconKitchenChaos() {
  return (
    <svg {...iconProps}>
      {/* Frying pan */}
      <circle cx="20" cy="24" r="12" strokeWidth="2.5" />
      <line x1="32" y1="24" x2="44" y2="24" strokeWidth="3" />
      {/* Fire/steam */}
      <path d="M14 16 Q12 10 16 8 Q14 12 18 10" stroke="#f87171" strokeWidth="2" fill="none" />
      <path d="M20 14 Q18 8 22 6 Q20 10 24 8" stroke="#fbbf24" strokeWidth="2" fill="none" />
      <path d="M26 16 Q24 10 28 8 Q26 12 30 10" stroke="#f87171" strokeWidth="2" fill="none" />
      {/* Paper tickets flying */}
      <rect x="36" y="6" width="6" height="8" rx="1" stroke="#6ee7b7" strokeWidth="1.5" transform="rotate(25 39 10)" />
      <rect x="38" y="34" width="6" height="8" rx="1" stroke="#6ee7b7" strokeWidth="1.5" transform="rotate(-15 41 38)" />
    </svg>
  );
}

function IconZeroVisibility() {
  return (
    <svg {...iconProps}>
      {/* Eye shape */}
      <path d="M6 24 Q24 8 42 24 Q24 40 6 24 Z" strokeWidth="2.5" />
      {/* Pupil */}
      <circle cx="24" cy="24" r="6" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="2" fill="#6ee7b7" stroke="none" />
      {/* Slash through - blocked */}
      <line x1="10" y1="10" x2="38" y2="38" stroke="#f87171" strokeWidth="3" />
      {/* Question marks */}
      <text x="4" y="14" fontSize="10" fontWeight="bold" fill="#f87171" stroke="none">?</text>
      <text x="38" y="42" fontSize="10" fontWeight="bold" fill="#f87171" stroke="none">?</text>
    </svg>
  );
}

function IconTrayConfusion() {
  return (
    <svg {...iconProps}>
      {/* Tray 1 */}
      <rect x="4" y="14" width="16" height="4" rx="2" strokeWidth="2" />
      <path d="M6 14 L6 10 L18 10 L18 14" strokeWidth="1.5" />
      {/* Tray 2 */}
      <rect x="28" y="14" width="16" height="4" rx="2" strokeWidth="2" />
      <path d="M30 14 L30 10 L42 10 L42 14" strokeWidth="1.5" />
      {/* Tray 3 */}
      <rect x="16" y="32" width="16" height="4" rx="2" strokeWidth="2" />
      <path d="M18 32 L18 28 L30 28 L30 32" strokeWidth="1.5" />
      {/* Confusion arrows crossing */}
      <path d="M12 18 Q8 25 20 28" stroke="#f87171" strokeWidth="2" />
      <path d="M36 18 Q40 25 28 28" stroke="#f87171" strokeWidth="2" />
      {/* Big question mark */}
      <text x="19" y="26" fontSize="14" fontWeight="bold" fill="#fbbf24" stroke="none">?</text>
    </svg>
  );
}

export default function AboutPage() {
  const [tab, setTab] = useState<Tab>("student");

  return (
    <div className="about-page">
      <h1>How GreenBite Works</h1>
      <p className="about-subtitle">Zero paper. Reusable plate markers. Real-time updates.</p>

      <div className="problems-hero">
        <h2>The Real Problems We Solve</h2>
        <p className="problems-hero-desc">
          School cafeterias still run on paper slips, manual queues, and guesswork.
          GreenBite fixes all of that — digitally.
        </p>
        <div className="problems-list">
          <ProblemItem
            icon={<IconEnvironment />}
            title="Environmental Impact at Scale"
            desc="A cafeteria serving 500 students/day wastes ~1,000 sheets daily. That's 5,000/week, 20,000/month."
            stat="100% paperless operation"
          />
          <ProblemItem
            icon={<IconPaperWaste />}
            title="Paper Waste"
            desc="Every order prints 2+ sheets — receipts, order slips, queue tickets. Multiply by hundreds of students daily."
            stat="~2 sheets saved per order"
          />
          <ProblemItem
            icon={<IconDoubleQueue />}
            title="Double Queuing"
            desc="Students line up at kiosk machines to place orders, then line up again at the counter to pick up food. Two separate queues per meal — easily 10–15 min wasted during rush hour."
            stat="Order from your phone, skip the kiosk line completely"
          />
          <ProblemItem
            icon={<IconOrderTheft />}
            title="Order Theft / Mix-ups"
            desc="Open pickup counters let anyone grab the wrong tray. No verification = lost food and frustrated students."
            stat="3-way visual verification per order"
          />
          <ProblemItem
            icon={<IconKitchenChaos />}
            title="Kitchen Chaos"
            desc="Staff juggles paper tickets, shouts across the kitchen, and has no overview of pending orders."
            stat="Real-time 3-column dashboard"
          />
          <ProblemItem
            icon={<IconZeroVisibility />}
            title="Zero Visibility for Students"
            desc="Once you order, you have no idea if it's being made, almost ready, or forgotten. You just wait and hope."
            stat="Live status pushed via Socket.io"
          />
          <ProblemItem
            icon={<IconTrayConfusion />}
            title="Tray Identification Chaos"
            desc="Which tray is whose? Staff relies on memory or shouting names. Errors multiply during rush hour."
            stat="Auto-assigned reusable plate markers (1–50)"
          />
        </div>
      </div>

      <div className="flow-tabs">
        <button
          className={`flow-tab ${tab === "student" ? "active" : ""}`}
          onClick={() => setTab("student")}
        >
          🎓 Student Flow
        </button>
        <button
          className={`flow-tab ${tab === "kitchen" ? "active" : ""}`}
          onClick={() => setTab("kitchen")}
        >
          👨‍🍳 Kitchen Staff Flow
        </button>
      </div>

      {tab === "student" ? <StudentFlow /> : <KitchenFlow />}

      <div className="about-pain-points">
        <h2>Pain Points & Solutions</h2>
        <div className="pain-grid">
          <PainCard
            icon="📄"
            pain="Paper waste"
            solution="Fully digital ordering — zero paper per order. Each order saves 2 sheets."
          />
          <PainCard
            icon="🔒"
            pain="Order theft"
            solution="Unique 6-character pickup code per order. Staff visually verifies before handoff."
          />
          <PainCard
            icon="🔢"
            pain="Tray identification"
            solution="Reusable plate markers (1–50) auto-assigned. Freed up when picked up."
          />
          <PainCard
            icon="🔔"
            pain="Missed orders"
            solution="Sound alert on new orders. Overdue orders (3+ min) flash yellow."
          />
          <PainCard
            icon="⚡"
            pain="No real-time updates"
            solution="Socket.io pushes status changes instantly. No page refresh needed."
          />
          <PainCard
            icon="🧍"
            pain="Double queuing"
            solution="Order on phone, only come once to pick up. No ordering queue."
          />
        </div>
      </div>
    </div>
  );
}

function ProblemItem({ icon, title, desc, stat }: { icon: ReactNode; title: string; desc: string; stat: string }) {
  return (
    <div className="problem-item">
      <span className="problem-item-icon">{icon}</span>
      <div className="problem-item-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="problem-item-stat">
          <span className="checkmark">✅</span> {stat}
        </div>
      </div>
    </div>
  );
}

function PainCard({ icon, pain, solution }: { icon: string; pain: string; solution: string }) {
  return (
    <div className="pain-card">
      <span className="pain-icon">{icon}</span>
      <h3>{pain}</h3>
      <p>{solution}</p>
    </div>
  );
}

function StudentFlow() {
  return (
    <div className="flow-container">
      <FlowStep
        number={1}
        icon="📱"
        title="Browse Menu"
        description="Open GreenBite on your phone. Filter by category: Mains, Sides, Desserts, Drinks. Tap 'Add to Cart' for items you want."
        color="green"
      />
      <FlowArrow />
      <FlowStep
        number={2}
        icon="🛒"
        title="Review Cart & Place Order"
        description="Adjust quantities, enter your name, tap 'Place Order'. System generates your order number and a unique 6-character pickup code."
        color="green"
      />
      <FlowArrow />
      <FlowStep
        number={3}
        icon="📊"
        title="Track Order in Real-Time"
        description="Auto-redirected to status page. See live progress: pending → preparing → ready → picked-up. Your pickup code is displayed prominently."
        color="blue"
      />
      <FlowArrow />
      <FlowStep
        number={4}
        icon="⏳"
        title="Wait for 'Ready' Status"
        description="Phone updates automatically via Socket.io — no refresh needed. When ready, you'll also see your assigned plate number."
        color="blue"
      />
      <FlowArrow />
      <FlowStep
        number={5}
        icon="🏪"
        title="Pick Up Your Food"
        description="Go to the pickup counter. Find your tray at the plate number slot. Show your pickup code to staff. They verify visually — code match + plate match = yours!"
        color="emerald"
      />
      <FlowArrow />
      <FlowStep
        number={6}
        icon="🎉"
        title="Done! Zero Paper Used"
        description="Staff marks your order as picked-up. The plate marker returns to the available pool for reuse. No receipts, no paper, just food!"
        color="emerald"
      />
    </div>
  );
}

function KitchenFlow() {
  return (
    <div className="flow-container">
      <FlowStep
        number={1}
        icon="🖥️"
        title="Kitchen Dashboard"
        description="Large screen showing 3 columns: Pending | Preparing | Ready. New orders auto-appear with a beep sound. Screen faces staff only."
        color="orange"
      />
      <FlowArrow />
      <FlowStep
        number={2}
        icon="🔔"
        title="New Order Arrives"
        description="Order appears in 'Pending' column with student name, items, and total. Sound notification plays. Orders pending 3+ minutes flash yellow as a reminder."
        color="orange"
      />
      <FlowArrow />
      <FlowStep
        number={3}
        icon="☝️"
        title="Click 'Mark as Ready'"
        subtitle="(1st click)"
        description="When food is done, one click does everything: auto-transitions pending → preparing → ready, auto-assigns the lowest available plate number."
        color="blue"
      />
      <FlowArrow />
      <FlowStep
        number={4}
        icon="📌"
        title="Place Plate Marker on Tray"
        description="Screen shows assigned plate number (e.g. #3). Place the matching physical marker next to the tray. Put tray at slot #3 on the pickup counter."
        color="blue"
      />
      <FlowArrow />
      <div className="flow-verify-box">
        <h3>👀 Student Arrives — Visual 3-Way Check</h3>
        <div className="verify-three-way">
          <div className="verify-item">
            <div className="verify-label">Student Phone</div>
            <div className="verify-code">🔑 AX7K2M</div>
            <div className="verify-code">🔢 #3</div>
          </div>
          <div className="verify-equals">=?</div>
          <div className="verify-item">
            <div className="verify-label">Kitchen Screen</div>
            <div className="verify-code">🔑 AX7K2M</div>
            <div className="verify-code">🔢 #3</div>
          </div>
          <div className="verify-equals">=?</div>
          <div className="verify-item">
            <div className="verify-label">Pickup Counter</div>
            <div className="verify-code">🍔 Slot #3</div>
          </div>
        </div>
        <p className="verify-result">✅ All match → hand over the food!</p>
      </div>
      <FlowArrow />
      <FlowStep
        number={5}
        icon="☝️"
        title="Click 'Mark as Picked Up'"
        subtitle="(2nd click)"
        description="Order disappears from Ready column. Plate slot #3 is freed and returns to the available pool — ready for the next order. ♻️"
        color="emerald"
      />

      <div className="flow-summary">
        <h3>📋 Staff Action Summary</h3>
        <div className="summary-items">
          <div className="summary-item">
            <span className="summary-num">1</span>
            <span>Food done → click <strong>"Mark as ready"</strong> → place plate marker</span>
          </div>
          <div className="summary-item">
            <span className="summary-num">2</span>
            <span>Student arrives → visual check → click <strong>"Mark as picked-up"</strong></span>
          </div>
        </div>
        <p className="summary-footer">Only 2 clicks per order · Zero paper 🌱 · Reusable markers ♻️ · Real-time ⚡</p>
      </div>
    </div>
  );
}

function FlowStep({
  number,
  icon,
  title,
  subtitle,
  description,
  color,
}: {
  number: number;
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  color: "green" | "blue" | "orange" | "emerald";
}) {
  return (
    <div className={`flow-step flow-step-${color}`}>
      <div className="flow-step-number">{number}</div>
      <div className="flow-step-icon">{icon}</div>
      <div className="flow-step-content">
        <h3>
          {title}
          {subtitle && <span className="flow-step-subtitle">{subtitle}</span>}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flow-arrow">
      <svg width="24" height="32" viewBox="0 0 24 32">
        <path d="M12 0 L12 24 M4 18 L12 28 L20 18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

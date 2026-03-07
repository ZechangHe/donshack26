import { useState } from "react";

type Tab = "student" | "kitchen";

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
            icon="🌍"
            title="Environmental Impact at Scale"
            desc="A cafeteria serving 500 students/day wastes ~1,000 sheets daily. That's 5,000/week, 20,000/month."
            stat="100% paperless operation"
          />
          <ProblemItem
            icon="📄"
            title="Paper Waste"
            desc="Every order prints 2+ sheets — receipts, order slips, queue tickets. Multiply by hundreds of students daily."
            stat="~2 sheets saved per order"
          />
          <ProblemItem
            icon="🧍‍♂️"
            title="Double Queuing"
            desc="Students line up at kiosk machines to place orders, then line up again at the counter to pick up food. Two separate queues per meal — easily 10–15 min wasted during rush hour."
            stat="Order from your phone, skip the kiosk line completely"
          />
          <ProblemItem
            icon="🔓"
            title="Order Theft / Mix-ups"
            desc="Open pickup counters let anyone grab the wrong tray. No verification = lost food and frustrated students."
            stat="3-way visual verification per order"
          />
          <ProblemItem
            icon="😵"
            title="Kitchen Chaos"
            desc="Staff juggles paper tickets, shouts across the kitchen, and has no overview of pending orders."
            stat="Real-time 3-column dashboard"
          />
          <ProblemItem
            icon="📵"
            title="Zero Visibility for Students"
            desc="Once you order, you have no idea if it's being made, almost ready, or forgotten. You just wait and hope."
            stat="Live status pushed via Socket.io"
          />
          <ProblemItem
            icon="🏷️"
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

function ProblemItem({ icon, title, desc, stat }: { icon: string; title: string; desc: string; stat: string }) {
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

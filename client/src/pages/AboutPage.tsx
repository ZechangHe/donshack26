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

/* ── FlowStep SVG Icons ── */

function IconBrowseMenu() {
  return (
    <svg {...iconProps}>
      {/* Phone */}
      <rect x="14" y="4" width="20" height="40" rx="4" />
      <line x1="14" y1="10" x2="34" y2="10" strokeWidth="1.5" />
      <line x1="14" y1="36" x2="34" y2="36" strokeWidth="1.5" />
      {/* Menu lines */}
      <line x1="18" y1="16" x2="30" y2="16" strokeWidth="2" />
      <line x1="18" y1="22" x2="30" y2="22" strokeWidth="2" />
      <line x1="18" y1="28" x2="30" y2="28" strokeWidth="2" />
      {/* Dots beside lines */}
      <circle cx="32" cy="16" r="1" fill="#fbbf24" stroke="none" />
      <circle cx="32" cy="22" r="1" fill="#fbbf24" stroke="none" />
      <circle cx="32" cy="28" r="1" fill="#fbbf24" stroke="none" />
    </svg>
  );
}

function IconReviewCart() {
  return (
    <svg {...iconProps}>
      {/* Cart */}
      <path d="M6 10 L12 10 L18 34" />
      <path d="M12 16 L40 16 L36 30 L18 30" />
      {/* Wheels */}
      <circle cx="22" cy="38" r="3" />
      <circle cx="34" cy="38" r="3" />
      {/* Food item in cart */}
      <rect x="18" y="20" width="14" height="6" rx="2" stroke="#fbbf24" strokeWidth="2" />
    </svg>
  );
}

function IconTrackOrder() {
  return (
    <svg {...iconProps}>
      {/* Timeline */}
      <line x1="8" y1="24" x2="40" y2="24" strokeWidth="2" />
      {/* Completed steps */}
      <circle cx="8" cy="24" r="4" fill="#6ee7b7" stroke="#6ee7b7" />
      <circle cx="19" cy="24" r="4" fill="#6ee7b7" stroke="#6ee7b7" />
      {/* Current step */}
      <circle cx="30" cy="24" r="4" />
      <circle cx="30" cy="24" r="2" fill="#fbbf24" stroke="none" />
      {/* Future step */}
      <circle cx="40" cy="24" r="4" />
      {/* Check marks */}
      <path d="M6 24 L8 26 L11 21" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M17 24 L19 26 L22 21" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  );
}

function IconWaitReady() {
  return (
    <svg {...iconProps}>
      {/* Clock */}
      <circle cx="20" cy="24" r="14" />
      <path d="M20 14 L20 24 L28 28" strokeWidth="2.5" />
      {/* Notification bell */}
      <path d="M36 10 Q36 4 40 4 Q44 4 44 10 L44 18 L36 18 Z" stroke="#fbbf24" strokeWidth="2" />
      <line x1="36" y1="18" x2="44" y2="18" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="40" cy="21" r="1.5" fill="#fbbf24" stroke="none" />
    </svg>
  );
}

function IconPickUp() {
  return (
    <svg {...iconProps}>
      {/* Counter surface */}
      <line x1="4" y1="28" x2="44" y2="28" strokeWidth="3" />
      {/* Tray on counter */}
      <path d="M12 28 L12 22 L32 22 L32 28" strokeWidth="2" />
      <rect x="10" y="18" width="24" height="4" rx="2" />
      {/* Hand reaching */}
      <path d="M36 14 Q40 10 42 14 L42 22 L36 22" stroke="#fbbf24" strokeWidth="2.5" />
      <line x1="42" y1="14" x2="44" y2="12" stroke="#fbbf24" strokeWidth="2" />
      {/* Food on tray */}
      <circle cx="22" cy="16" r="3" stroke="#fbbf24" strokeWidth="1.5" />
    </svg>
  );
}

function IconDoneZeroPaper() {
  return (
    <svg {...iconProps}>
      {/* Leaf */}
      <path d="M24 40 L24 24 Q16 18 10 22 Q6 12 16 8 Q24 4 30 10 Q36 16 30 24 Q28 28 24 24" fill="none" />
      <path d="M18 18 L24 24" strokeWidth="1.5" />
      {/* Confetti dots */}
      <circle cx="8" cy="8" r="2" fill="#fbbf24" stroke="none" />
      <circle cx="40" cy="6" r="2" fill="#f87171" stroke="none" />
      <circle cx="6" cy="32" r="1.5" fill="#6ee7b7" stroke="none" />
      <circle cx="42" cy="16" r="1.5" fill="#fbbf24" stroke="none" />
      {/* Sparkle lines */}
      <path d="M36 30 L40 28" strokeWidth="2" />
      <path d="M38 34 L42 34" strokeWidth="2" />
    </svg>
  );
}

function IconKitchenScreen() {
  return (
    <svg {...iconProps}>
      {/* Monitor */}
      <rect x="4" y="6" width="40" height="28" rx="3" />
      {/* Stand */}
      <line x1="24" y1="34" x2="24" y2="40" strokeWidth="2.5" />
      <line x1="16" y1="40" x2="32" y2="40" strokeWidth="2.5" />
      {/* Three columns */}
      <line x1="18" y1="12" x2="18" y2="28" strokeWidth="1.5" />
      <line x1="30" y1="12" x2="30" y2="28" strokeWidth="1.5" />
      {/* Column content dots */}
      <rect x="8" y="14" width="6" height="3" rx="1" stroke="#fbbf24" strokeWidth="1.5" />
      <rect x="8" y="20" width="6" height="3" rx="1" stroke="#fbbf24" strokeWidth="1.5" />
      <rect x="22" y="14" width="6" height="3" rx="1" stroke="#6ee7b7" strokeWidth="1.5" />
      <rect x="34" y="14" width="6" height="3" rx="1" stroke="#6ee7b7" strokeWidth="1.5" />
    </svg>
  );
}

function IconNewOrder() {
  return (
    <svg {...iconProps}>
      {/* Bell */}
      <path d="M18 8 Q18 2 24 2 Q30 2 30 8 L32 20 L16 20 Z" />
      <line x1="14" y1="20" x2="34" y2="20" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="2" fill="#6ee7b7" stroke="none" />
      {/* Order card */}
      <rect x="30" y="26" width="14" height="18" rx="2" stroke="#fbbf24" strokeWidth="2" />
      <line x1="33" y1="31" x2="41" y2="31" stroke="#fbbf24" strokeWidth="1.5" />
      <line x1="33" y1="35" x2="41" y2="35" stroke="#fbbf24" strokeWidth="1.5" />
      <line x1="33" y1="39" x2="38" y2="39" stroke="#fbbf24" strokeWidth="1.5" />
    </svg>
  );
}

function IconClickButton() {
  return (
    <svg {...iconProps}>
      {/* Button */}
      <rect x="8" y="28" width="32" height="12" rx="6" />
      {/* Finger pointing down */}
      <path d="M24 6 L24 22" strokeWidth="4" />
      <circle cx="24" cy="6" r="4" />
      {/* Click ripples */}
      <path d="M14 26 Q14 22 18 22" stroke="#fbbf24" strokeWidth="1.5" />
      <path d="M34 26 Q34 22 30 22" stroke="#fbbf24" strokeWidth="1.5" />
    </svg>
  );
}

function IconPlateMarker() {
  return (
    <svg {...iconProps}>
      {/* Plate */}
      <ellipse cx="24" cy="32" rx="18" ry="8" />
      <ellipse cx="24" cy="32" rx="12" ry="5" strokeWidth="1.5" />
      {/* Number marker flag */}
      <line x1="24" y1="8" x2="24" y2="28" strokeWidth="2.5" />
      <rect x="24" y="6" width="14" height="10" rx="2" fill="none" stroke="#fbbf24" strokeWidth="2" />
      {/* Number on flag */}
      <text x="28" y="14" fontSize="8" fontWeight="bold" fill="#fbbf24" stroke="none">3</text>
    </svg>
  );
}

function IconDuplicateWork() {
  return (
    <svg {...iconProps}>
      {/* Cook 1 */}
      <circle cx="12" cy="10" r="4" />
      <path d="M12 14 L12 28" strokeWidth="2.5" />
      <path d="M6 20 L12 16 L18 20" strokeWidth="2" />
      {/* Cook 2 */}
      <circle cx="36" cy="10" r="4" />
      <path d="M36 14 L36 28" strokeWidth="2.5" />
      <path d="M30 20 L36 16 L42 20" strokeWidth="2" />
      {/* Same food item (both making it!) */}
      <circle cx="12" cy="36" r="6" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="36" cy="36" r="6" stroke="#fbbf24" strokeWidth="2" />
      {/* Conflict X */}
      <path d="M20 30 L28 38" stroke="#f87171" strokeWidth="3" />
      <path d="M28 30 L20 38" stroke="#f87171" strokeWidth="3" />
    </svg>
  );
}

/* ── PainCard SVG Icons ── */

function IconPainPaper() {
  return (
    <svg {...iconProps}>
      {/* Paper sheet */}
      <path d="M12 4 L32 4 L36 10 L36 44 L12 44 Z" />
      <path d="M32 4 L32 10 L36 10" strokeWidth="2" />
      {/* Lines on paper */}
      <line x1="16" y1="18" x2="32" y2="18" strokeWidth="1.5" />
      <line x1="16" y1="24" x2="32" y2="24" strokeWidth="1.5" />
      <line x1="16" y1="30" x2="28" y2="30" strokeWidth="1.5" />
      {/* X mark */}
      <path d="M30 32 L42 44" stroke="#f87171" strokeWidth="3" />
      <path d="M42 32 L30 44" stroke="#f87171" strokeWidth="3" />
    </svg>
  );
}

function IconPainTheft() {
  return (
    <svg {...iconProps}>
      {/* Shield */}
      <path d="M24 4 L38 12 L38 26 Q38 40 24 44 Q10 40 10 26 L10 12 Z" />
      {/* Lock */}
      <rect x="18" y="22" width="12" height="10" rx="2" stroke="#fbbf24" strokeWidth="2" />
      <path d="M20 22 L20 18 Q20 12 24 12 Q28 12 28 18 L28 22" stroke="#fbbf24" strokeWidth="2" />
      {/* Keyhole */}
      <circle cx="24" cy="27" r="2" fill="#fbbf24" stroke="none" />
    </svg>
  );
}

function IconPainTray() {
  return (
    <svg {...iconProps}>
      {/* Number display */}
      <rect x="8" y="8" width="32" height="32" rx="4" />
      {/* Hash/number sign */}
      <line x1="18" y1="14" x2="16" y2="36" strokeWidth="3" />
      <line x1="32" y1="14" x2="30" y2="36" strokeWidth="3" />
      <line x1="12" y1="20" x2="36" y2="20" strokeWidth="3" />
      <line x1="12" y1="30" x2="36" y2="30" strokeWidth="3" />
    </svg>
  );
}

function IconPainMissed() {
  return (
    <svg {...iconProps}>
      {/* Bell */}
      <path d="M16 10 Q16 2 24 2 Q32 2 32 10 L34 24 L14 24 Z" />
      <line x1="12" y1="24" x2="36" y2="24" strokeWidth="2.5" />
      <circle cx="24" cy="28" r="2" fill="#6ee7b7" stroke="none" />
      {/* Exclamation mark */}
      <line x1="40" y1="8" x2="40" y2="24" stroke="#f87171" strokeWidth="3" />
      <circle cx="40" cy="30" r="2" fill="#f87171" stroke="none" />
    </svg>
  );
}

function IconPainNoRealtime() {
  return (
    <svg {...iconProps}>
      {/* Lightning bolt */}
      <path d="M22 4 L14 24 L22 24 L18 44 L36 20 L26 20 L32 4 Z" fill="none" />
      {/* Refresh arrow */}
      <path d="M38 14 Q44 20 40 28" stroke="#fbbf24" strokeWidth="2" />
      <path d="M36 12 L38 14 L42 12" stroke="#fbbf24" strokeWidth="2" />
      {/* X slash */}
      <line x1="4" y1="4" x2="12" y2="12" stroke="#f87171" strokeWidth="2.5" />
      <line x1="12" y1="4" x2="4" y2="12" stroke="#f87171" strokeWidth="2.5" />
    </svg>
  );
}

function IconPainDoubleQueue() {
  return (
    <svg {...iconProps}>
      {/* Person */}
      <circle cx="14" cy="10" r="5" />
      <path d="M14 15 L14 30" strokeWidth="2.5" />
      <path d="M14 30 L8 40" strokeWidth="2.5" />
      <path d="M14 30 L20 40" strokeWidth="2.5" />
      <path d="M6 22 L14 18 L22 22" strokeWidth="2.5" />
      {/* Queue lines */}
      <line x1="30" y1="12" x2="44" y2="12" strokeWidth="2" />
      <line x1="30" y1="20" x2="44" y2="20" strokeWidth="2" />
      <line x1="30" y1="28" x2="44" y2="28" strokeWidth="2" />
      {/* Dots representing people in queue */}
      <circle cx="28" cy="12" r="2" fill="#f87171" stroke="none" />
      <circle cx="28" cy="20" r="2" fill="#f87171" stroke="none" />
      <circle cx="28" cy="28" r="2" fill="#f87171" stroke="none" />
    </svg>
  );
}

export default function AboutPage() {
  const [tab, setTab] = useState<Tab>("student");

  return (
    <div className="landing-page">
      {/* ── Section 1: Hero ── */}
      <section className="landing-hero">
        <h1 className="landing-hero-title">Zero Paper. Zero Queues.<br />Just Food.</h1>
        <p className="landing-hero-sub">
          GreenBite is a paperless cafeteria ordering system that eliminates waste, speeds up service, and gives students real-time order tracking.
        </p>
        <div className="landing-hero-ctas">
          <a href="/menu" className="landing-btn landing-btn-primary">Try the Menu →</a>
          <a href="/kitchen" className="landing-btn landing-btn-outline">See Kitchen View →</a>
        </div>
        <div className="landing-phone-mockup">
          <div className="landing-phone-frame">
            <div className="landing-phone-notch" />
            <div className="landing-phone-screen">
              <div className="landing-mock-header">
                <span className="landing-mock-brand">GreenBite</span>
                <span className="landing-mock-cart">Cart (2)</span>
              </div>
              <div className="landing-mock-cards">
                <div className="landing-mock-card">
                  <span className="landing-mock-emoji">🍔</span>
                  <div>
                    <div className="landing-mock-name">Classic Burger</div>
                    <div className="landing-mock-price">$5.50</div>
                  </div>
                </div>
                <div className="landing-mock-card">
                  <span className="landing-mock-emoji">🥗</span>
                  <div>
                    <div className="landing-mock-name">Garden Salad</div>
                    <div className="landing-mock-price">$4.00</div>
                  </div>
                </div>
                <div className="landing-mock-card">
                  <span className="landing-mock-emoji">🍕</span>
                  <div>
                    <div className="landing-mock-name">Margherita Pizza</div>
                    <div className="landing-mock-price">$6.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Impact Numbers ── */}
      <section className="landing-stats">
        <div className="landing-stats-grid">
          <div className="landing-stat">
            <div className="landing-stat-num">1,000+</div>
            <div className="landing-stat-label">sheets saved / day</div>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <div className="landing-stat-num">0</div>
            <div className="landing-stat-label">paper per order</div>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <div className="landing-stat-num">50%</div>
            <div className="landing-stat-label">faster pickup</div>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <div className="landing-stat-num">100%</div>
            <div className="landing-stat-label">digital</div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Problems We Solve ── */}
      <section className="landing-section">
        <h2 className="landing-section-title">The Real Problems We Solve</h2>
        <p className="landing-section-sub">School cafeterias still run on paper slips, manual queues, and guesswork.</p>
        <div className="landing-problems-grid">
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
            icon={<IconDuplicateWork />}
            title="Duplicate Work Between Cooks"
            desc="Two cooks see the same order and both start making it. No way to 'claim' an order — wasted food, wasted time."
            stat="Claim-to-cook: tap 'Start Preparing' to reserve"
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
      </section>

      {/* ── Section 4: How It Works ── */}
      <section className="landing-section landing-section-gray">
        <h2 className="landing-section-title">How It Works</h2>
        <div className="landing-tabs">
          <button
            className={`landing-tab ${tab === "student" ? "landing-tab-active" : ""}`}
            onClick={() => setTab("student")}
          >
            Student Flow
          </button>
          <button
            className={`landing-tab ${tab === "kitchen" ? "landing-tab-active" : ""}`}
            onClick={() => setTab("kitchen")}
          >
            Kitchen Staff Flow
          </button>
        </div>
        {tab === "student" ? <StudentFlow /> : <KitchenFlow />}
      </section>

      {/* ── Section 5: Pain Points & Solutions ── */}
      <section className="landing-section">
        <h2 className="landing-section-title">Pain Points & Solutions</h2>
        <div className="landing-pain-grid">
          <PainCard
            icon={<IconPainPaper />}
            pain="Paper waste"
            solution="Fully digital ordering — zero paper per order. Each order saves 2 sheets."
          />
          <PainCard
            icon={<IconPainTheft />}
            pain="Order theft"
            solution="Unique 6-character pickup code per order. Staff visually verifies before handoff."
          />
          <PainCard
            icon={<IconPainTray />}
            pain="Tray identification"
            solution="Reusable plate markers (1–50) auto-assigned. Freed up when picked up."
          />
          <PainCard
            icon={<IconPainMissed />}
            pain="Missed orders"
            solution="Sound alert on new orders. Overdue orders (3+ min) flash yellow."
          />
          <PainCard
            icon={<IconPainNoRealtime />}
            pain="No real-time updates"
            solution="Socket.io pushes status changes instantly. No page refresh needed."
          />
          <PainCard
            icon={<IconPainDoubleQueue />}
            pain="Double queuing"
            solution="Order on phone, only come once to pick up. No ordering queue."
          />
          <PainCard
            icon={<IconDuplicateWork />}
            pain="Duplicate cook work"
            solution="'Start Preparing' button claims the order. Other staff see it's taken — no wasted food."
          />
        </div>
      </section>

      {/* ── Section 6: Tech Stack ── */}
      <section className="landing-section landing-section-gray">
        <h2 className="landing-section-title">Built for Speed & Sustainability</h2>
        <div className="landing-tech-grid">
          <div className="landing-tech-card">
            <div className="landing-tech-icon">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4 L14 24 L22 24 L18 44 L36 20 L26 20 L32 4 Z" />
              </svg>
            </div>
            <h3>Real-time</h3>
            <p>Socket.io for instant order updates — no page refresh needed.</p>
          </div>
          <div className="landing-tech-card">
            <div className="landing-tech-icon">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="14" y="4" width="20" height="40" rx="4" />
                <line x1="14" y1="10" x2="34" y2="10" strokeWidth="1.5" />
                <line x1="14" y1="36" x2="34" y2="36" strokeWidth="1.5" />
                <circle cx="24" cy="40" r="1.5" />
              </svg>
            </div>
            <h3>Mobile-first</h3>
            <p>Responsive design — works on any phone, tablet, or laptop browser.</p>
          </div>
          <div className="landing-tech-card">
            <div className="landing-tech-icon">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 40 L24 24 Q16 18 10 22 Q6 12 16 8 Q24 4 30 10 Q36 16 30 24 Q28 28 24 24" />
                <path d="M18 18 L24 24" strokeWidth="1.5" />
              </svg>
            </div>
            <h3>Zero waste</h3>
            <p>No paper, no plastic markers — fully reusable system from order to pickup.</p>
          </div>
        </div>
      </section>

      {/* ── Section 7: CTA Footer ── */}
      <section className="landing-cta-footer">
        <h2>Ready to go paperless?</h2>
        <p>Try GreenBite now — no account needed.</p>
        <a href="/menu" className="landing-btn landing-btn-white">Start Ordering →</a>
      </section>
    </div>
  );
}

function ProblemItem({ icon, title, desc, stat }: { icon: ReactNode; title: string; desc: string; stat: string }) {
  return (
    <div className="landing-problem-card">
      <span className="landing-problem-icon">{icon}</span>
      <div className="landing-problem-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="landing-problem-stat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#059669"/><path d="M5 8 L7 10 L11 6" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>{stat}</span>
        </div>
      </div>
    </div>
  );
}

function PainCard({ icon, pain, solution }: { icon: ReactNode; pain: string; solution: string }) {
  return (
    <div className="landing-pain-card">
      <span className="landing-pain-icon">{icon}</span>
      <h3>{pain}</h3>
      <p>{solution}</p>
    </div>
  );
}

function StudentFlow() {
  return (
    <div className="landing-flow">
      <FlowStep number={1} icon={<IconBrowseMenu />} title="Browse Menu" description="Open GreenBite on your phone. Filter by category: Mains, Sides, Desserts, Drinks. Tap 'Add to Cart' for items you want." color="green" />
      <FlowStep number={2} icon={<IconReviewCart />} title="Review Cart & Place Order" description="Adjust quantities, enter your name, tap 'Place Order'. System generates your order number and a unique 6-character pickup code." color="green" />
      <FlowStep number={3} icon={<IconTrackOrder />} title="Track Order in Real-Time" description="Auto-redirected to status page. See live progress: pending → preparing → ready → picked-up. Your pickup code is displayed prominently." color="blue" />
      <FlowStep number={4} icon={<IconWaitReady />} title="Wait for 'Ready' Status" description="Phone updates automatically via Socket.io — no refresh needed. When ready, you'll also see your assigned plate number." color="blue" />
      <FlowStep number={5} icon={<IconPickUp />} title="Pick Up Your Food" description="Go to the pickup counter. Find your tray at the plate number slot. Show your pickup code to staff. They verify visually — code match + plate match = yours!" color="emerald" />
      <FlowStep number={6} icon={<IconDoneZeroPaper />} title="Done! Zero Paper Used" description="Staff marks your order as picked-up. The plate marker returns to the available pool for reuse. No receipts, no paper, just food!" color="emerald" />
    </div>
  );
}

function KitchenFlow() {
  return (
    <div className="landing-flow">
      <FlowStep number={1} icon={<IconKitchenScreen />} title="Kitchen Dashboard" description="Large screen showing 3 columns: Pending | Preparing | Ready. New orders auto-appear with a beep sound. Screen faces staff only." color="orange" />
      <FlowStep number={2} icon={<IconNewOrder />} title="New Order Arrives" description="Order appears in 'Pending' column with student name, items, and total. Sound notification plays. Orders pending 3+ minutes flash yellow as a reminder." color="orange" />
      <FlowStep number={3} icon={<IconClickButton />} title="Click 'Start Preparing'" subtitle="(1st click)" description="Tap 'Start Preparing' to claim the order. It moves from Pending to Preparing column. Other staff see it's taken — no two cooks make the same dish." color="blue" />
      <FlowStep number={4} icon={<IconPlateMarker />} title="Click 'Mark as Ready'" subtitle="(2nd click)" description="Food is done — tap 'Mark as Ready'. System auto-assigns the lowest available plate number (e.g. #3). Place the matching physical marker on the tray and put it at slot #3." color="blue" />
      <div className="landing-flow-step landing-flow-verify">
        <div className="landing-flow-number" style={{ background: "#059669" }}>5</div>
        <div className="landing-flow-body">
          <h3>Student Arrives — Visual 3-Way Check</h3>
          <div className="verify-three-way">
            <div className="verify-item">
              <div className="verify-label">Student Phone</div>
              <div className="verify-code">AX7K2M</div>
              <div className="verify-code">#3</div>
            </div>
            <div className="verify-equals">=</div>
            <div className="verify-item">
              <div className="verify-label">Kitchen Screen</div>
              <div className="verify-code">AX7K2M</div>
              <div className="verify-code">#3</div>
            </div>
            <div className="verify-equals">=</div>
            <div className="verify-item">
              <div className="verify-label">Pickup Counter</div>
              <div className="verify-code">Slot #3</div>
            </div>
          </div>
          <p className="verify-result">All match → hand over the food!</p>
        </div>
      </div>
      <FlowStep number={6} icon={<IconClickButton />} title="Click 'Mark as Picked Up'" subtitle="(3rd click)" description="Order disappears from Ready column. Plate slot #3 is freed and returns to the available pool — ready for the next order." color="emerald" />
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
  icon: ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  color: "green" | "blue" | "orange" | "emerald";
}) {
  const colors: Record<string, string> = { green: "#22c55e", blue: "#3b82f6", orange: "#f59e0b", emerald: "#10b981" };
  return (
    <div className="landing-flow-step">
      <div className="landing-flow-number" style={{ background: colors[color] }}>{number}</div>
      <div className="landing-flow-icon">{icon}</div>
      <div className="landing-flow-body">
        <h3>
          {title}
          {subtitle && <span className="landing-flow-subtitle">{subtitle}</span>}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

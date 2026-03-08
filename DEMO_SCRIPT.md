# GreenBite Demo Script — DonsHack26

**Team:** Zechang He & Gabriel Zubovsky
**Theme:** Environment
**Duration:** ~3–4 minutes

---

## Setup Before Demo

1. Open Chrome with **two windows side by side** on the projector screen
2. **Left window** = Student view (start on About page `/`)
3. **Right window** = Kitchen view (`/kitchen`)
4. Make sure kitchen dashboard is empty (click "Reset All" if needed)
5. Log out of any existing session

---

## Demo Flow

### PART 1 — The Problem (30 sec)

> **Screen:** Left window on About page (hero section visible)

**Say:**

> "Hi everyone, we're Zechang and Gabriel, and this is **GreenBite** — a paperless cafeteria ordering system.
>
> Here's the problem: a cafeteria serving 500 students a day wastes over **1,000 sheets of paper** — just on receipts, order tickets, and queue slips. That's **180,000 sheets a year** from one cafeteria — costing around **$5,000 a year** just in paper.
>
> Scale that to 100 campus cafeterias and you're looking at **half a million dollars** wasted on paper that goes straight to the trash.
>
> On top of that, students waste 10 to 15 minutes standing in two separate lines — one to order, one to pick up. Orders get stolen, trays get mixed up, and the kitchen is drowning in paper tickets.
>
> GreenBite fixes all of that."

---

### PART 2 — Student Flow: Live Demo (90 sec)

> **Screen:** Left window — About page

**Do:** Scroll down to the **"Traditional vs GreenBite"** comparison section

**Say:**

> "Here's what cafeterias look like today — students line up at kiosk machines, get a paper ticket, staff prints another copy, reads it to pack food and sometimes misses items, then yells your number. Two-plus sheets of paper go straight to the trash every single order.
>
> Now look at GreenBite — students order from their phone, the kitchen sees it instantly on screen, you get a digital pickup code, track your order in real-time, and pick up with a verified code. Zero paper, zero waste."

**Do:** Scroll down briefly past the "Problems We Solve" section (2–3 seconds, don't linger)

**Say:**

> "We solve 8 specific problems — you can explore them on our About page. But let me show you how it actually works."

---

> **Do:** Click **"Login"** in the navbar

**Say:**

> "Students log in with their school account. Each student has a meal balance — just like a real campus dining system."

> **Do:** Type username `zechang`, password `1234`, click Login

**Say:**

> "I'm logged in as Zechang. You can see my balance — $1,000 — right here in the navbar."

---

> **Do:** Click **"Menu"** in the navbar

**Say:**

> "Here's today's menu. Students can filter by category — Mains, Sides, Desserts, Drinks."

> **Do:** Click the **"Mains"** filter, then add **Grilled Chicken Wrap** to cart

> **Do:** Click **"Drinks"** filter, add **Iced Lemonade** to cart

**Say:**

> "I'll grab a chicken wrap and a lemonade."

---

> **Do:** Click **"Cart"** in the navbar (badge should show "2")

**Say:**

> "Here's my cart. Total is $11.98. I'm logged in, so my balance will be deducted automatically when I place the order."

> **Do:** Click **"Place Order"**

**Say:**

> "Order placed! Now watch two things..."

---

> **Screen:** Left window auto-navigated to **My Orders** page

**Say:**

> "First — I get a **6-character pickup code** and my order status is tracking live. No paper receipt needed.
>
> Second —"

> **Do:** Point to the **right window** (Kitchen Dashboard)

**Say:**

> "The kitchen got this order **instantly** — in real time. No paper ticket printed. Let's process it."

---

### PART 3 — Kitchen Flow: Live Demo (60 sec)

> **Screen:** Focus on Right window (Kitchen Dashboard)

**Say:**

> "This is the kitchen's view. Orders come in as cards in the **Pending** column. The kitchen heard a sound alert when this order arrived."

> **Do:** Click **"Start Preparing"** on the order card

**Say:**

> "A cook clicks 'Start Preparing' to **claim** this order. It moves to the Preparing column. This prevents two cooks from accidentally making the same thing."

> **Do:** Click **"Mark as Ready"** on the order card

**Say:**

> "When the food is done, they mark it as Ready. The system automatically assigns a **plate number** — that's a physical slot on the pickup counter. The student's phone updates instantly."

> **Do:** Point to Left window — show that the My Orders page now shows "ready" status and plate number

**Say:**

> "See? The student's screen updated in real time — they can see their plate number and pickup code. No more guessing, no more stolen orders."

---

> **Do:** Click **"Mark as Picked Up"** on the right window

**Say:**

> "When the student picks up their food, the kitchen verifies the pickup code, marks it as picked up, and the plate slot is freed for the next order. The whole cycle is **100% paperless**."

---

### PART 4 — Impact (20 sec)

> **Do:** On the left window, click **"Impact"** in the navbar

**Say:**

> "Every order we just placed saved 2 sheets of paper. Our Impact page tracks this in real time. Scale this to a real cafeteria — that's over 1,000 sheets and **$15 saved every single day**. Over a school year, one cafeteria saves around $5,000 just on paper."

---

### PART 5 — Wrap Up (20 sec)

**Say:**

> "GreenBite is built with **React**, **Node.js**, and **Socket.io** for real-time updates. Everything runs in the browser — no app download needed.
>
> We eliminate paper waste, cut wait times in half, prevent order theft, and give students real-time visibility into their food.
>
> Zero paper. Zero queues. Just food. Thank you!"

---

## Quick Reference

| Timing | Section | Screen Action |
|--------|---------|---------------|
| 0:00 | Problem | Left: About page hero |
| 0:30 | Comparison | Left: Scroll to Traditional vs GreenBite |
| 0:50 | Student Login | Left: Login page → Menu |
| 1:00 | Student Order | Left: Menu → Cart → Place Order |
| 1:30 | Order Placed | Left: My Orders (show code) → Point to Right |
| 2:00 | Kitchen Flow | Right: Pending → Preparing → Ready |
| 2:30 | Pickup | Right: Mark Picked Up → Left: status updated |
| 3:00 | Impact | Left: Impact page |
| 3:20 | Wrap Up | Speaking, no clicks |
| 3:40 | Done! | |

## Emergency Notes

- **If order doesn't appear on kitchen:** Refresh the kitchen page, Socket.io will reconnect
- **If balance error:** Click "Reset All" on kitchen dashboard — this resets all orders AND resets balances to $1,000
- **If something breaks:** The About page works offline and has all the content — you can present from there
- **Demo accounts:** zechang / 1234, gabriel / 1234

---

## Technical Deep Dive (Backup / Q&A Reference)

Use this section if judges ask about the tech, or just for learning.

### Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐
│   React + Vite   │ ◄─────► │  Node.js/Express │
│   (Frontend)     │   API   │   (Backend)      │
│   Port 5173      │         │   Port 5001      │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │      Socket.io            │
         │◄─────────────────────────►│
         │   (WebSocket, real-time)  │
         │                           │
                              ┌──────┴──────┐
                              │  In-Memory   │
                              │  Data Store  │
                              │  (Maps)      │
                              └─────────────┘
```

### Tech Stack

| Layer | Technology | Why We Chose It |
|-------|-----------|----------------|
| Frontend | React 18 + TypeScript | Component-based UI, type safety |
| Bundler | Vite | Fast HMR, instant dev server startup |
| Backend | Express 5 (Node.js) | Lightweight, easy REST API |
| Real-time | Socket.io | Bi-directional WebSocket — instant order updates without page refresh |
| State | React Context API | Simple global state (Auth, Cart) without Redux overhead |
| Persistence | localStorage | Client-side order history survives page refresh |
| Data Store | In-memory Maps | No database setup needed, fast reads, perfect for demo |
| Deployment | Render | Auto-deploy from GitHub on every push to main |

### Key Technical Decisions

**1. Why Socket.io instead of polling?**
- Polling = client asks server every X seconds "any updates?" → wasteful, delayed
- Socket.io = server pushes to client instantly when something changes → real-time
- Events we emit: `new-order`, `order-updated`, `orders-reset`, `stats-update`

**2. Why in-memory data instead of a database?**
- Hackathon scope: no need for persistence across server restarts
- Maps are O(1) lookup — faster than any DB query
- Reset button clears everything instantly for demo reruns
- Trade-off: data is lost on server restart (acceptable for demo)

**3. How does the plate number system work?**
```
Available pool: [1, 2, 3, ..., 50]
Order marked "ready" → assign lowest available number (e.g., #3)
Order marked "picked-up" → #3 returns to the pool
→ Reusable, no physical waste, auto-managed
```

**4. How does the 3-way verification work?**
```
Student phone shows:  Pickup Code AX7K2M + Plate #3
Kitchen screen shows: Pickup Code AX7K2M + Plate #3
Physical counter has:  Tray at Slot #3

Staff checks: all 3 match → hand over food
→ Prevents theft, eliminates mix-ups
```

**5. How does real-time update flow?**
```
1. Student clicks "Place Order"
   → POST /api/orders → server creates order
   → server emits socket "new-order" to ALL connected clients

2. Kitchen clicks "Start Preparing"
   → PATCH /api/orders/:id → server updates status
   → server emits "order-updated" to ALL clients
   → Student's My Orders page updates instantly (no refresh)

3. Same pattern for "Mark Ready" and "Mark Picked Up"
```

### File Structure

```
donshack26/
├── server/
│   ├── index.js          # Express + Socket.io setup, serves static build
│   ├── db.js             # In-memory data: orders Map, students Map, menu, plates
│   └── routes/
│       ├── orders.js     # CRUD for orders + status transitions + reset
│       ├── menu.js       # GET menu items
│       └── auth.js       # Login + balance check
│
├── client/src/
│   ├── main.tsx          # App entry, providers (Auth, Cart)
│   ├── App.tsx           # React Router routes
│   ├── index.css         # All styles (single file, ~1800 lines)
│   ├── context/
│   │   ├── AuthContext.tsx   # Login state + balance, persists in localStorage
│   │   └── CartContext.tsx   # Shopping cart state
│   ├── pages/
│   │   ├── AboutPage.tsx     # Landing page: problems, flows, comparison
│   │   ├── MenuPage.tsx      # Menu grid with category filters
│   │   ├── CartPage.tsx      # Cart review + confirm popup + checkout
│   │   ├── LoginPage.tsx     # Username/password form
│   │   ├── MyOrdersPage.tsx  # Order history with live status tracking
│   │   ├── KitchenDashboard.tsx  # 3-column board + reset button
│   │   ├── ImpactPage.tsx    # Environmental stats (papers saved, trees)
│   │   └── OrderConfirmation.tsx # Single order detail view
│   └── components/
│       ├── Navbar.tsx        # Nav links + user info + balance
│       └── OrderCard.tsx     # Kitchen order card with action buttons
```

### Concepts Gabriel Can Explore Further

- **WebSockets vs HTTP**: How Socket.io upgrades from HTTP long-polling to WebSocket
- **React Context vs Redux**: When simple Context is enough vs when you need Redux
- **REST API design**: How our routes follow REST conventions (GET, POST, PATCH, DELETE)
- **Component composition**: How we break UI into reusable pieces (FlowStep, ProblemItem, CompareStep)
- **CSS architecture**: Single-file approach vs CSS Modules vs Tailwind — trade-offs
- **Deployment pipeline**: GitHub → Render auto-deploy → static build served by Express

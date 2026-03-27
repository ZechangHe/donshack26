# GreenBite

A paperless cafeteria ordering system that eliminates paper waste, cuts wait times, and prevents order theft. 
Built for **DonsHack 2026** and inspired by challenges faced by students at the University of San Francisco cafeteria.

**Team:** Zechang He (development) & Gabriel Zubovsky (product design & presentation)

**Theme:** Enviromental Concerns

**Live Demo:** Deployed on [Render](https://render.com) with auto-deploy from GitHub

---

## The Problem

A cafeteria serving 500 students daily wastes over **1,000 sheets of paper** on receipts, order tickets, and queue slips — that's **180,000 sheets per year** from a single cafeteria. Students waste 10–15 minutes in two separate lines (ordering + pickup), orders get stolen, and kitchen staff spend time yelling order numbers instead of preparing food.

## The Solution

GreenBite replaces the entire paper-based cafeteria workflow with a real-time digital system:

- **Students** order from their phone anywhere on campus
- **Kitchen** receives orders instantly on a live dashboard
- **Pickup** is verified with a 6-character code and assigned plate number
- **Zero paper** at every step

---

## Features

| Feature | Description |
|---------|-------------|
| Mobile Ordering | Students browse the menu, add to cart, and place orders from anywhere |
| Real-Time Kitchen Dashboard | 3-column Kanban board (Pending → Preparing → Ready) with sound alerts |
| Pickup Code System | 6-character verification code prevents order theft |
| Plate Number Recycling | Slots 1–50 auto-assign and recycle when orders are picked up |
| Live Order Tracking | Students see order status updates in real time via WebSocket |
| Meal Balance | Each student has a deductible balance — like a real campus dining system |
| Impact Tracking | Tracks paper saved, trees preserved, and cost savings per order |
| Confirmation Step | Popup confirmation prevents accidental orders |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript |
| Bundler | Vite 7 |
| Backend | Express 5 (Node.js) |
| Real-Time | Socket.io (WebSocket) |
| State Management | React Context API |
| Data Store | In-memory Maps |
| Deployment | Render (auto-deploy from GitHub) |

---

## Architecture

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

---

## Project Structure

```
donshack26/
├── server/
│   ├── index.js              # Express + Socket.io setup
│   ├── db.js                 # In-memory data store (orders, students, menu, plates)
│   └── routes/
│       ├── orders.js         # Order CRUD + status transitions + reset
│       ├── menu.js           # GET menu items
│       └── auth.js           # Login + balance check
│
├── client/src/
│   ├── main.tsx              # App entry point with Auth & Cart providers
│   ├── App.tsx               # React Router routes
│   ├── index.css             # Global styles
│   ├── context/
│   │   ├── AuthContext.tsx    # Login state + balance management
│   │   └── CartContext.tsx    # Shopping cart state
│   ├── pages/
│   │   ├── AboutPage.tsx     # Landing page with problem/solution breakdown
│   │   ├── MenuPage.tsx      # Menu grid with category filters
│   │   ├── CartPage.tsx      # Cart review + confirmation popup
│   │   ├── LoginPage.tsx     # Login form
│   │   ├── MyOrdersPage.tsx  # Order history with live status tracking
│   │   ├── KitchenDashboard.tsx  # 3-column Kanban board for kitchen staff
│   │   ├── ImpactPage.tsx    # Environmental impact stats
│   │   └── OrderConfirmation.tsx # Single order detail view
│   └── components/
│       ├── Navbar.tsx        # Navigation + user info + balance display
│       └── OrderCard.tsx     # Kitchen order card with action buttons
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)

### Install

```bash
npm run install:all
```

### Run (Development)

```bash
npm run dev
```

This starts both the frontend (port 5173) and backend (port 5001) concurrently.

### Build & Start (Production)

```bash
npm run build
npm start
```

### Demo Accounts

| Username | Password | Balance |
|----------|----------|---------|
| zechang  | 1234     | $1,000  |
| gabriel  | 1234     | $1,000  |

---

## How It Works

1. **Student** logs in and browses the menu
2. **Student** adds items to cart and places an order
3. **Kitchen** receives the order instantly via WebSocket
4. **Kitchen** moves order through: Pending → Preparing → Ready
5. **Student** sees live status updates and gets a pickup code + plate number
6. **Student** picks up food — staff verifies the code, marks as picked up
7. **Plate slot** is recycled for the next order

Every order saves 2 sheets of paper. Scale to 500 orders/day = **1,000 sheets saved daily**.

---

## License

Built for DonsHack 2026.

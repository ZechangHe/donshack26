# GreenBite — Extra Credit Video Script

**Student:** Zechang He
**Duration:** ~6–7 minutes

---

## Script

Hi Professor, thanks for watching this. I'd like to share the app I built and presented at the DonsHack26 hackathon, and also some new ideas I came up with while preparing this video.

The hackathon theme was **Environment**, so the first thing I thought about was: how can I solve a real-world problem and actually help the environment? That's how I came up with **GreenBite** — a paperless cafeteria ordering system.

---

## Part 1 — The Problem (explain while on About page)

> **Screen:** Open the deployed app, About page

Here's what I noticed at our school cafeteria: every single order, they print **two pieces of paper** — one order ticket for the student, and one copy for the kitchen staff. That means **two sheets of paper wasted per order**. If they serve 500 students a day, that's 1,000 sheets a day — just thrown in the trash.

But it's not just the paper. The whole workflow is **chaos**. When the kitchen finishes preparing an order, a staff member has to stand at the counter and **yell the order number** — "Number 29!" Sometimes no one answers. The student might be in the restroom, or walking around somewhere, and they don't realize their order is ready.

So now you have a staff member just standing there, yelling, with no one responding. That person could be helping in the kitchen — it's busy, they **want** to help — but they're stuck at the counter doing nothing productive. I actually saw a staff member get really frustrated because someone didn't pick up their order for a long time. It was stressful for them.

And one more thing — why hasn't the cafeteria gone digital already? Because they **don't trust it**. Students could screenshot someone else's order, photoshop a confirmation, or reuse the same receipt. Paper feels safe to them.

So I thought: can I solve **all** of these problems — the paper waste, the yelling, the trust issue — in one app?

---

## Part 2 — The Hackathon App Demo (screen share the live app)

> **Screen:** Demo the full student + kitchen flow

Here's what I built for the hackathon. Let me walk through it.

**Student side:**

> **Do:** Login as zechang / 1234 → Menu → add items → Cart → Place Order → Confirm

Students order food from their phone. They can browse the menu, add items to the cart, and place an order. The balance is deducted automatically — like a real campus meal plan.

After placing the order, they get a **6-character pickup code** and can track the order status in **real-time** — no page refresh needed. This is built with Socket.io, so when the kitchen updates the status, the student's screen updates instantly.

Now, this is **not** like a restaurant where you scan a QR code at your table and a waiter brings food to you. This is a **school cafeteria** — there are no table numbers, no waiters. Students **walk up to the counter and pick up their own food**. That's a completely different problem to solve.

**Kitchen side:**

> **Do:** Switch to Kitchen Dashboard → Start Preparing → Mark Ready → Mark Picked Up

The kitchen has a dashboard with three columns: Pending, Preparing, and Ready. When a new order comes in, they hear a sound alert. The whole workflow is just **3 clicks**:

1. **Start Preparing** — claim the order so no two cooks make the same thing
2. **Mark as Ready** — the system auto-assigns a **plate number** (a physical slot on the pickup shelf, numbered 1 to 50). The student's phone updates instantly with their slot number.
3. **Mark as Picked Up** — verify the student's code and hand over the food. The slot is freed and recycled.

**The anti-fraud system:**

When a student comes to pick up, they show their phone with two things: their **plate number** and a **random 6-character code**. The staff checks both against the kitchen screen. This is a **double verification** — you can't fake it, you can't screenshot it, because the code is verified live against the system. This solves the trust problem that keeps cafeterias on paper.

So that's the hackathon version. It solves paper waste, eliminates yelling with real-time notifications, and prevents order theft with double verification.

---

## Part 3 — New Problems I Discovered (transition to new ideas)

> **Screen:** Can explain verbally, or open the Staff System page if built

Now here's the interesting part. While I was preparing this video and thinking deeper about how this would work in a real cafeteria, I discovered **more problems** that the hackathon version doesn't solve.

### Problem 1: Multiple Staff, One Screen

In our cafeteria, during rush hour, there are **2 to 3 staff members** working at the same time. But they're all looking at the same kitchen screen. So when Staff 1 finishes cooking, they have to scroll through 20 orders to find the one they just made. That's slow and confusing.

My solution: a **Staff Button** system. We add "Staff 1" and "Staff 2" buttons at the top of the screen. Each staff member clicks their own button, and the system **filters to show only their orders**. Now each person only sees what they're working on — clean and fast.

> **Do:** Open the Staff System page `/staff` and demo if built. If not built, explain verbally.

### Problem 2: Quick Pickup Lookup

When a student walks up and says "I'm number 9," how does the staff find that order quickly?

My idea: show the **plate numbers next to each staff button** on the home screen:

- Staff 1 — has orders: #4, #6, #9
- Staff 2 — has orders: #3, #5, #7, #8

The staff can instantly see that #9 belongs to Staff 1, click into it, verify the code, and hand over the food. No searching, no scrolling.

### Problem 3: Data Analytics from History

After an order is picked up, it goes into a **history log**. Over time, this data shows which items are most popular, what the peak hours are, and how much food to prepare. The cafeteria can use this to **optimize their menu and reduce food waste** even further — so the environmental impact goes beyond just paper.

---

## Part 4 — The Last Edge Case: What If All 50 Slots Are Full?

Now, there's one last problem I thought about. We have 50 pickup slots. What if all 50 are occupied and no one has picked up? A new order is ready, but there's nowhere to put it.

My solution has two parts:

**First — an overflow queue.** If all 50 slots are full, the order stays in "Ready" status but gets marked as **"Waiting for Slot."** The food stays behind the counter. As soon as a student picks up and frees a slot, the system **automatically assigns** that slot to the next waiting order and notifies the student. The system never stops — it just queues.

**Second — a timeout system.** If a student doesn't pick up within **15 minutes**, the system marks the order as "Unclaimed," frees the slot, and moves the food to a separate area. The student gets a notification: "Your order has timed out — please come to the counter directly." This prevents one forgotten order from blocking the entire system.

In practice, 50 slots is more than enough. But the overflow queue and timeout are there as a safety net — so the system **never gets stuck**.

---

## Part 5 — Wrap Up

> **Screen:** Back to About page or any page

So that's the full picture. What started as a hackathon project to save paper turned into a much deeper redesign of how a cafeteria operates:

- **Zero paper** — no more printed tickets
- **Zero yelling** — real-time notifications replace shouting
- **Zero theft** — double verification protects every order
- **Maximum efficiency** — staff button system keeps everyone productive
- **Data-driven** — order history helps optimize the menu and reduce waste
- **Never gets stuck** — overflow queue and timeout handle edge cases

### What I Learned

This hackathon taught me something I didn't expect. I went in thinking I was just building a piece of software. But what I actually learned is that solving even a **small, everyday problem** — like ordering food in a cafeteria — requires an incredible amount of thinking.

Every time I thought the design was complete, I'd walk through the entire workflow again and discover **another problem**. Multiple staff sharing one screen? That's a problem. Students not picking up on time? That's a problem. All 50 slots full? That's a problem. And for each one, I'd think through multiple solutions, compare trade-offs, and pick the best approach. Then I'd review the whole flow again — and find **yet another problem**.

It was like peeling an onion. Layer after layer. But honestly, I really enjoyed this process. It trained me to think like a **product designer**, not just a programmer. Writing code is only part of the job — the harder part is figuring out **what** to build and **why**.

I also want to be honest about one thing. At the hackathon, I noticed that many of the other projects — some of which placed higher than ours — were more concept-driven. Some were games, some were mostly AI API calls. I'm not saying those are bad ideas, but I personally don't think a game truly helps the environment, and I don't think calling an AI to generate something is the same as solving a real problem — in fact, all those API calls are burning energy and generating carbon.

I don't mean to say my project is better than theirs. We probably just had **different starting points**. They started from "what's cool to build," and I started from "what's broken that I can fix." I think both approaches are valid, but this experience showed me that I prefer starting from **real problems** — and I think that's the kind of engineering that makes a difference.

I think this is what the future of campus dining could look like — everything digital, easy, and efficient. Thanks for watching, Professor!

---

## Notes for Recording

- **Screen share** the deployed app at `https://greenbite-rm3g.onrender.com`
- **Part 1:** Stay on About page, talk over it
- **Part 2:** Full live demo — login → order → kitchen 3-click flow → pickup
- **Part 3:** Open Staff System page if built, otherwise explain verbally with hand gestures or a simple sketch
- **Part 4:** Explain verbally — this is a thought exercise, doesn't need to be built
- **Part 5:** Quick summary, keep it under 30 seconds
- Speak naturally — use this as a guide, don't read word for word
- Total target: **6–7 minutes**

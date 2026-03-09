# GreenBite — Extra Credit Video Script

**Student:** Zechang He
**Duration:** ~5–6 minutes

---

## Script

Hi Professor, thanks for watching this. I'd like to share the app I built for the hackathon.

The theme was **Environment**, so the first thing I thought about was: how can I solve a real-world problem and actually help the environment? That's how I came up with **GreenBite** — a paperless cafeteria ordering system.

### The Problem I Saw

Here's what I noticed at our school cafeteria: every single order, they print **two pieces of paper** — one order ticket for the student, and one copy for the kitchen staff. That means **two sheets of paper wasted per order**. If they serve 500 students a day, that's 1,000 sheets — just thrown in the trash.

But it's not just the paper. The whole workflow is **chaos**. When the kitchen finishes preparing an order, a staff member has to stand at the counter and **yell the order number** — "Number 29!" Sometimes no one answers. The student might be in the restroom, or walking around campus, and they don't realize their order is ready.

So now you have a staff member just standing there, yelling, with no one responding. That person could be helping in the kitchen — the kitchen is busy, they **want** to help — but they're stuck at the counter doing nothing productive. I actually saw a staff member get really frustrated last time because someone didn't pick up their order for a long time. They were stuck between wanting to go help with cooking and needing to stay at the counter. It was stressful for them.

### The Solution

With GreenBite, there's **no more yelling and no more paper**. Everything is digital, easy, and efficient.

I built a web app to demo this. Here's how it works:

**For students:**
- Order food online from their phone
- Track the order status in **real-time**
- When the order is ready, they receive a notification telling them exactly **which pickup slot** to go to

**For kitchen staff:**
- They just click **3 buttons** — they don't need to learn anything complicated
- Each button is a different color, so it's easy to remember:
  - **Start Preparing** — claim the order
  - **Mark as Ready** — food is done, place it at the assigned slot
  - **Mark as Picked Up** — student verified and took the food

### The Pickup System

Now, this is **not** like a restaurant where you scan a QR code at your table and a waiter brings food to you. This is a **school cafeteria** — there are no table numbers, no waiters. Students **walk up to the counter and pick up their own food**. That's a completely different problem to solve.

Here's the pickup flow I designed:

We have a **physical pickup shelf with 50 numbered slots** — think of it like a wall of cubbies, labeled 1 through 50. When the kitchen finishes an order and marks it "Ready," the system assigns the **lowest available slot number**. The staff puts the packed food into that slot. So if slot 1 is taken, the next order gets slot 2, and so on.

The student's phone tells them: "Your food is at **Slot #7**." They walk to the shelf, find slot 7, and grab their food. When the staff confirms pickup, that slot is freed up and recycled — so when order 51 comes in, it can go right back to slot 1. The 50 slots cycle forever.

### Anti-Fraud: Double Verification

But here's the key question: how do we make sure the right person picks up the right food? Anyone could walk up and grab from slot 7. That's why we have **double verification**.

When a student comes to pick up, they show their phone screen which displays:
1. A **plate number** (which slot their food is at)
2. A **randomly generated 6-character pickup code**

Both are random and unique to each order. The staff checks that both match what's on the kitchen screen. This is a **double verification** — it's basically impossible to fake. No one can steal someone else's order. No screenshots, no photoshop — the code is verified in real-time against the system.

### New Idea: Staff Assignment Button

While I was preparing this video, I thought of a new problem: what happens when **two staff members** are using the same kitchen screen at the same time?

For example, Staff 1 is preparing plate #4, and Staff 2 is preparing plate #7. When Staff 1 finishes, they need to find their specific order on the screen to click "Ready." But if there are 20 orders on screen, that's not easy.

Here's my solution: add a **Staff Button** system. If there are 2 staff working, we set up "Staff 1" and "Staff 2" buttons. Every time a staff member starts preparing an order, they first click their own staff button, then click "Start Preparing." Now the system knows which orders belong to which staff member, and they **only see their own orders**.

After they hit "Picked Up," the order disappears from their list and goes into **history** — and that history data can be used to analyze **which food items are most popular**, so the cafeteria can control how much food to prepare and **reduce food waste** even further.

### New Idea: Quick Plate Number Lookup

One more thing I thought of: when a student comes to pick up and says "I'm number 9," how does the staff find that order quickly on screen?

My idea is to show the **plate numbers next to each staff button** on the home screen. So it would look like:

- **Staff 1** — has orders: #4, #6, #9
- **Staff 2** — has orders: #3, #5, #7, #8

The staff can instantly see who has order #9, click into it, verify the pickup code, and hand over the food. Fast and simple.

### Edge Case: What If All 50 Slots Are Full?

Now here's an interesting problem I thought about: what if all 50 pickup slots are occupied and no one has picked up yet? A new order is ready, but there's nowhere to put it.

My solution is two things working together:

**First — an overflow queue.** If all 50 slots are full, the order stays in "Ready" status but gets marked as **"Waiting for Slot."** The food stays behind the counter. As soon as a student picks up and frees a slot, the system **automatically assigns** that slot to the next waiting order and notifies the student. So the system never stops — it just queues.

**Second — a timeout system.** If a student doesn't pick up their order within **15 minutes**, the system marks it as "Unclaimed," frees the slot, and moves the food to a separate unclaimed area. The student gets a notification saying: "Your order has timed out — please come to the counter directly." This prevents one forgotten order from blocking the whole system.

In practice, 50 slots is more than enough for most cafeterias. But the overflow queue and timeout system are there as a safety net — so the system **never gets stuck**, no matter how busy it gets.

### Wrap Up

So that's the whole workflow I designed. GreenBite makes the cafeteria **paperless, efficient, and fair**:
- **Zero paper** — no more printed tickets
- **Zero yelling** — notifications replace shouting
- **Zero theft** — double verification protects every order
- **Maximum efficiency** — every staff member stays productive
- **Data-driven** — order history helps optimize the menu and reduce waste

This is what I think the future of campus dining should look like — everything digital, easy, and efficient. Thanks for watching!

---

## Notes for Recording

- **Screen share** the live app while talking (same setup as hackathon demo — student view on left, kitchen view on right)
- **Demo the full flow**: login → order → kitchen processes → pickup
- For the "Staff Button" and "Quick Plate Lookup" ideas, you can just explain verbally since they're not built yet — this shows your **product thinking** beyond just coding
- Speak naturally — don't read word for word, use this as a guide
- Keep it under 6 minutes

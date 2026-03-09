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

Here's the pickup flow I designed:

We have **50 numbered slots** on the pickup counter — slot 1 through 50. When an order is marked "Ready," the system assigns the **lowest available slot number**. So if slot 1 is taken, the next order gets slot 2, and so on. When a student picks up from slot 1, that slot is freed up and recycled. So when order 51 comes in, it goes to slot 1 again. The 50 slots cycle forever — we never run out.

### Anti-Fraud: Double Verification

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

**And one more thing** — the number of slots doesn't have to be fixed at 50. We can make it **dynamic based on traffic data**. During low-traffic hours like early morning, maybe we only need 20 slots. During the lunch rush, we scale up to 50. The system can **analyze historical ordering patterns** and automatically recommend the right number of slots for each time period. The cafeteria manager can also adjust it manually. This way, the counter space is always optimized — not too many empty slots wasting space, and not too few causing overflow.

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItem";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleCheckout() {
    if (items.length === 0) return;
    setSubmitting(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: name || "Anonymous",
        items: items.map((i) => ({
          menuItemId: i.menuItem.id,
          quantity: i.quantity,
        })),
      }),
    });

    const order = await res.json();
    clearCart();
    // Persist order ID for "My Orders" page
    const saved: string[] = JSON.parse(localStorage.getItem("greenbite-orders") || "[]");
    saved.unshift(order.id);
    localStorage.setItem("greenbite-orders", JSON.stringify(saved));
    navigate("/my-orders");
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p className="empty-state">Your cart is empty. Go add some food!</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {items.map((item) => (
          <CartItemRow
            key={item.menuItem.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <button
          className="btn btn-primary btn-lg"
          onClick={handleCheckout}
          disabled={submitting}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
        <p className="paper-note">Paperless order — no receipt printed!</p>
      </div>
    </div>
  );
}

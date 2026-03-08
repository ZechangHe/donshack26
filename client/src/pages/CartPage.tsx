import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItemRow from "../components/CartItem";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const { user, refreshBalance } = useAuth();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const overLimit = totalItems > 10;

  async function handleCheckout() {
    if (items.length === 0) return;
    setSubmitting(true);
    setError("");

    if (!user) {
      setError("Please log in to place an order");
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: user?.name || name || "Anonymous",
        username: user?.username,
        items: items.map((i) => ({
          menuItemId: i.menuItem.id,
          quantity: i.quantity,
        })),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Order failed");
      setSubmitting(false);
      return;
    }

    const order = await res.json();
    clearCart();
    // Persist order ID for "My Orders" page
    const saved: string[] = JSON.parse(localStorage.getItem("greenbite-orders") || "[]");
    saved.unshift(order.id);
    localStorage.setItem("greenbite-orders", JSON.stringify(saved));
    // Refresh balance after successful order
    if (user) await refreshBalance();
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
        {user ? (
          <p style={{ marginBottom: "1rem", color: "#059669", fontWeight: 500 }}>
            Ordering as {user.name}
          </p>
        ) : (
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />
        )}
        {error && <p style={{ color: "#ef4444", marginBottom: "0.75rem" }}>{error}</p>}
        {!user && (
          <p className="cart-login-hint">
            <Link to="/login">Log in</Link> to place your order
          </p>
        )}
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowConfirm(true)}
          disabled={submitting || overLimit}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
        {overLimit && (
          <p style={{ color: "#ef4444", marginTop: "0.5rem", fontWeight: 500 }}>
            Maximum 10 items per order
          </p>
        )}
        <p className="paper-note">Paperless order — no receipt printed!</p>
      </div>

      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Your Order</h3>
            <p>
              You're ordering {totalItems} item{totalItems !== 1 ? "s" : ""} for ${totalPrice.toFixed(2)}.
              This will be deducted from your balance.
            </p>
            <div className="confirm-buttons">
              <button className="confirm-btn-cancel" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button
                className="confirm-btn-confirm"
                onClick={() => {
                  setShowConfirm(false);
                  handleCheckout();
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

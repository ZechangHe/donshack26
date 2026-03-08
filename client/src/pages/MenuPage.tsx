import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { MenuItem } from "../types";
import MenuItemCard from "../components/MenuItemCard";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const { addItem, totalItems } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then(setMenu);
  }, []);

  const categories = ["All", ...new Set(menu.map((i) => i.category))];
  const filtered = filter === "All" ? menu : menu.filter((i) => i.category === filter);

  return (
    <div className="menu-page">
      <h1>Today's Menu</h1>
      {user ? (
        <div className="menu-balance-banner">
          <span className="menu-balance-greeting">Welcome back, {user.name}</span>
          <div className="menu-balance-box">
            <span className="menu-balance-amount">${user.balance.toFixed(2)}</span>
            <span className="menu-balance-label">Available Balance</span>
          </div>
        </div>
      ) : (
        <p className="menu-login-hint">
          <Link to="/login">Log in</Link> to see your balance
        </p>
      )}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${filter === cat ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {filtered.map((item) => (
          <MenuItemCard key={item.id} item={item} onAdd={addItem} cartFull={totalItems >= 10} />
        ))}
      </div>
    </div>
  );
}

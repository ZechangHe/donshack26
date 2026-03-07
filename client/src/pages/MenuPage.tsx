import { useEffect, useState } from "react";
import type { MenuItem } from "../types";
import MenuItemCard from "../components/MenuItemCard";
import { useCart } from "../context/CartContext";

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const { addItem } = useCart();

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
          <MenuItemCard key={item.id} item={item} onAdd={addItem} />
        ))}
      </div>
    </div>
  );
}

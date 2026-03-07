import type { MenuItem } from "../types";

interface Props {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAdd }: Props) {
  return (
    <div className="menu-item-card">
      <span className="menu-item-emoji">{item.image}</span>
      <h3>{item.name}</h3>
      <p className="menu-item-desc">{item.description}</p>
      <div className="menu-item-footer">
        <span className="menu-item-price">${item.price.toFixed(2)}</span>
        <button onClick={() => onAdd(item)} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

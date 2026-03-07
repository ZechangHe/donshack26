import type { CartItem as CartItemType } from "../types";

interface Props {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({ item, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="cart-item">
      <span className="cart-item-emoji">{item.menuItem.image}</span>
      <div className="cart-item-info">
        <h4>{item.menuItem.name}</h4>
        <p>${item.menuItem.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-controls">
        <button onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}>+</button>
      </div>
      <button className="btn btn-danger" onClick={() => onRemove(item.menuItem.id)}>
        Remove
      </button>
    </div>
  );
}

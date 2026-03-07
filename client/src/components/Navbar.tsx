import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        GreenBite
      </Link>
      <div className="navbar-links">
        <Link to="/">Menu</Link>
        <Link to="/cart">
          Cart {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
        <Link to="/impact">Impact</Link>
        <Link to="/kitchen" className="kitchen-link">
          Kitchen
        </Link>
      </div>
    </nav>
  );
}

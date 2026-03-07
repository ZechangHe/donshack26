import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        GreenBite
      </Link>
      <div className="navbar-links">
        <Link to="/">About</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">
          Cart {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
        <Link to="/my-orders">Orders</Link>
        <Link to="/impact">Impact</Link>
        <Link to="/kitchen" className="kitchen-link">
          Kitchen
        </Link>
        {user ? (
          <span className="navbar-user">
            Hi {user.name.split(" ")[0]} | <span className="navbar-balance">${user.balance.toFixed(2)}</span>
            <button className="navbar-logout" onClick={() => { logout(); navigate("/"); }}>
              Logout
            </button>
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import './Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="nav">
      <h2 className="logo">🛍️ Clothing Store</h2>
      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/login" className="link">Login</Link>
        <Link to="/register" className="link">Register</Link>
        <Link to="/products" className="link">Products</Link>
        <Link to="/cart" className="link">
          🛒 Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

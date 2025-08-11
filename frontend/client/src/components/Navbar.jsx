import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="nav">
      <h2 className="logo">🛍️ Clothing Store</h2>
      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/login" className="link">Login</Link>
        <Link to="/register" className="link">Register</Link>
        <Link to="/products" className="link">Products</Link>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to 🛍️ Clothing Store</h1>
        <p>Your one-stop shop for trendy outfits</p>
        <Link to="/products" className="shop-btn">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

export default Home;

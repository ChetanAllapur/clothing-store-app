import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to 🛍️ Clothing Store</h1>
        <p>Trendy outfits, great prices, fast delivery.</p>
        <Link to="/products">
          <button className="shop-now">Shop Now</button>
        </Link>
      </header>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="products">
          <div className="product-card">Product 1</div>
          <div className="product-card">Product 2</div>
          <div className="product-card">Product 3</div>
        </div>
      </section>
    </div>
  );
}

export default Home;

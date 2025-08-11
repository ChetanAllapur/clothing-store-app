// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const API_URL = import.meta.env.VITE_API_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/products`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name === "AbortError") return; // fetch was cancelled
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
      })
      .finally(() => setLoading(false));

    // cleanup to avoid setting state on unmounted component
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="products-page">
        <h2>Loading products…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <h2>Failed to load products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="products-page">
        <h2>No products found</h2>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

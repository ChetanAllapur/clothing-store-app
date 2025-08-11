// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/products/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        if (err.name === "AbortError") return; // fetch was cancelled
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to fetch product details");
      })
      .finally(() => setLoading(false));

    // cleanup to avoid state updates after unmount
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details">
        <h2>Loading product details…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details">
        <h2>Failed to load product</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>
        <p>{product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;

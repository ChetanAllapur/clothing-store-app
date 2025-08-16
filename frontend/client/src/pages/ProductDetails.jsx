import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-2 rounded" />
      <p className="mb-2 font-semibold">₹{product.price}</p>
      <p className="mb-4">{product.description}</p>
      <button
        onClick={() => addToCart(product)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;

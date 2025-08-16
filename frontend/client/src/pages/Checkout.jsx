import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          items: cart.map(item => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: totalPrice
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      await res.json();
      setSubmitted(true);
      setCart([]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (cart.length === 0 && !submitted) return <p className="p-4">Your cart is empty.</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      {submitted ? (
        <p className="text-green-600 font-semibold">✅ Your order has been placed successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Shipping Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <h2 className="font-semibold">Total: ₹{totalPrice.toFixed(2)}</h2>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, value); // minimum 1
    updateQuantity(id, qty);
  };

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="border p-2 flex justify-between items-center mb-2 rounded">
              <div>
                <span className="font-semibold">{item.name} - ₹{item.price}</span>
                <div>
                  Qty:{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="w-16 ml-2 border rounded px-1"
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="mt-4 font-bold">Total: ₹{totalPrice.toFixed(2)}</h2>
          <button
            onClick={handleCheckout}
            className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;

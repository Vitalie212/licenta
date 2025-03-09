import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("PUBLISHABLE_KEY"); // 🔹 Înlocuiește cu cheia publică Stripe

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDirectPayment = async () => {
    setPaymentProcessing(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5258/api/Payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cart.reduce((total, item) => total + item.price * item.quantity, 0) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Eroare la procesarea plății.");
      }

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: data.clientSecret });
        if (error?.message) setError(error.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-center">🛒 Coșul Meu</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-32 object-cover rounded-md mx-auto"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                Fără imagine
              </div>
            )}
            <h3 className="mt-2 text-lg font-bold">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.description || "Descriere indisponibilă"}</p>
            <p className="mt-1 text-md font-semibold text-gray-700">
              {item.quantity} x {item.price} MDL
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              ❌ Elimină
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="text-center mt-6 flex flex-col gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            🗑️ Golește Coșul
          </button>

          <CheckoutButton />

          <button
            onClick={handleDirectPayment}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            disabled={paymentProcessing}
          >
            {paymentProcessing ? "Se procesează..." : "Plătește direct cu cardul"}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default CartPage;

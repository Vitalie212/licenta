import React from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/CartContext";

// 🔹 Inițializăm Stripe cu cheia publică
const stripePromise = loadStripe("PUBLISHABLE_KEY");

const CheckoutButton: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // 🔹 Verifică dacă utilizatorul are un card salvat
      const userId = localStorage.getItem("userId"); // Înlocuiește cu autentificarea reală
      if (!userId) {
        alert("Utilizator neautentificat. Conectează-te pentru a efectua plata.");
        return;
      }

      const cardCheckResponse = await fetch(`http://localhost:5258/api/Payments/has-saved-card/${userId}`);

      if (!cardCheckResponse.ok) {
        throw new Error(`Server error: ${cardCheckResponse.status}`);
      }

      const { hasSavedCard } = await cardCheckResponse.json();

      if (!hasSavedCard) {
        // 🔹 Dacă nu există un card salvat, redirecționează utilizatorul către pagina de plată
        navigate("/payment");
        return;
      }

      // 🔹 Dacă există un card salvat, procesăm direct plata
      const response = await fetch("http://localhost:5258/api/Payments/charge-saved-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: cart.reduce((total, item) => total + item.price * item.quantity, 0), // Totalul coșului
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const { message } = await response.json();
      alert(message);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("A apărut o problemă la procesarea plății.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      🛒 Plătește acum
    </button>
  );
};

export default CheckoutButton;

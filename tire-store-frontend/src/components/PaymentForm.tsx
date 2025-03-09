import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      // ✅ Creare token pentru card
      const { error, token } = await stripe.createToken(cardElement);
      if (error) {
        setErrorMessage(error.message || "Eroare la procesarea cardului");
        setLoading(false);
        return;
      }

      // ✅ Trimiterea tokenului la backend pentru salvare
      const response = await fetch("http://localhost:5258/api/Payments/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.id }),
      });

      if (!response.ok) throw new Error("Eroare la salvarea cardului");
      alert("Cardul a fost salvat cu succes!");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Introduceți detaliile cardului</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="card-input" />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Se procesează..." : "Salvează Cardul"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

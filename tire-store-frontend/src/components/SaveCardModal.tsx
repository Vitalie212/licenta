import React, { useState } from "react";

interface SaveCardModalProps {
  onClose: () => void; // ✅ Adăugăm onClose ca prop
}

const SaveCardModal: React.FC<SaveCardModalProps> = ({ onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSaveCard = async () => {
    setError(null);
    setLoading(true);

    try {
      const userEmail = localStorage.getItem("userEmail"); // Email-ul utilizatorului logat
      if (!userEmail) {
        setError("Trebuie să fii logat pentru a salva un card.");
        setLoading(false);
        return;
      }

      // ✅ Trimitem datele către backend
      const response = await fetch("http://localhost:5258/api/Payments/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          paymentMethodId: "pm_card_visa" // Înlocuiește cu o metodă reală din Stripe.js
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Eroare la salvarea cardului.");

      alert("Card salvat cu succes!");
      onClose(); // ✅ Închide modalul după salvare
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h2>Selectează un card</h2>
      <input type="text" placeholder="Număr card" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
      <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />

      {error && <p className="text-red-500">{error}</p>}

      <button onClick={handleSaveCard} disabled={loading} className="bg-green-500 text-white">
        {loading ? "Se salvează..." : "Salvează Cardul"}
      </button>

      <button onClick={onClose} className="bg-gray-500 text-white mt-2">Anulează</button>
    </div>
  );
};

export default SaveCardModal;

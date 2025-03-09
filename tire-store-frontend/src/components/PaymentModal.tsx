import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Card {
  id: string;
  last4: string;
  brand: string;
}

const PaymentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [newCard, setNewCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Trebuie să fii autentificat pentru a efectua o plată.");
      navigate("/login");
      return;
    }

    // ✅ Verifică cardurile salvate pentru utilizator
    fetch(`http://localhost:5258/api/Payments/get-saved-cards/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cards.length > 0) {
          setCards(data.cards);
          setSelectedCard(data.cards[0].id); // Selectează primul card implicit
        }
      })
      .catch((error) => console.error("Eroare la încărcarea cardurilor:", error));
  }, [navigate]);

  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
    const amount = 3000; // Exemplu de sumă, poți prelua din coș

    if (!userId) return;

    try {
      const response = await fetch("http://localhost:5258/api/Payments/charge-saved-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: userId, paymentMethodId: selectedCard, amount }),
      });

      if (!response.ok) throw new Error("Eroare la procesarea plății.");

      alert("Plată efectuată cu succes!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Eroare la plată. Încearcă din nou.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Selectează un card</h2>

        {cards.length > 0 && (
          <div>
            {cards.map((card) => (
              <label key={card.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="card"
                  value={card.id}
                  checked={selectedCard === card.id}
                  onChange={() => setSelectedCard(card.id)}
                  className="mr-2"
                />
                {card.brand.toUpperCase()} **** {card.last4}
              </label>
            ))}
          </div>
        )}

        <button
          className="text-blue-500 underline mt-2"
          onClick={() => setNewCard(!newCard)}
        >
          {newCard ? "Alege un card salvat" : "Adaugă un card nou"}
        </button>

        {newCard && (
          <div className="mt-4">
            <p>Introduceți datele cardului:</p>
            <input type="text" placeholder="Număr card" className="border p-2 w-full mt-2" />
            <input type="text" placeholder="MM/YY" className="border p-2 w-full mt-2" />
            <input type="text" placeholder="CVV" className="border p-2 w-full mt-2" />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 w-full">
              Salvează Cardul
            </button>
          </div>
        )}

        {!newCard && (
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
          >
            Plătește acum
          </button>
        )}

        <button
          onClick={onClose}
          className="text-gray-500 mt-4 block w-full text-center"
        >
          Anulează
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

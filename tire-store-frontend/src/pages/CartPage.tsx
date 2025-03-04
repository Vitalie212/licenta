import React from "react";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center">Coșul Meu</h2>

      {cart.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">Coșul tău este gol.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-contain mb-2" />
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-500">{item.quantity} x {item.price} MDL</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
              >
                Elimină
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={clearCart}
            className="bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition"
          >
            Golește Coșul
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

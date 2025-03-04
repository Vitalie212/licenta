import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 🛒 Definim tipul pentru un produs din coș
interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// 🔥 Definim tipul pentru context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// 📌 Creăm contextul
const CartContext = createContext<CartContextType | undefined>(undefined);

// 📌 Provider-ul pentru coș
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // 📌 Preia datele din localStorage la reîncărcare
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 📌 Actualizează localStorage când coșul se schimbă
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🛒 Adaugă produs în coș
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // ❌ Elimină produs din coș
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🔄 Golește coșul
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 📌 Custom hook pentru utilizarea contextului coșului
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart trebuie utilizat în interiorul unui CartProvider");
  }
  return context;
};

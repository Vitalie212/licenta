import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getToken } from "../services/authService"; // Funcție pentru a obține utilizatorul logat

// 🛒 Definim tipul pentru un produs din coș
interface CartItem {
  id: number;
  name: string;
  description: string;  // 🔹 Adăugăm descrierea produsului
  price: number;
  imageUrl: string;
  quantity: number;
}


// Definim tipul contextului pentru coș
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Creăm contextul
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const userToken = getToken(); // Obține utilizatorul logat

  useEffect(() => {
    // Preluăm coșul utilizatorului curent din localStorage
    if (userToken) {
      const storedCart = localStorage.getItem(`cart_${userToken}`);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [userToken]);

  useEffect(() => {
    // Salvăm coșul utilizatorului curent în localStorage
    if (userToken) {
      localStorage.setItem(`cart_${userToken}`, JSON.stringify(cart));
    }
  }, [cart, userToken]);

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

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart trebuie utilizat în interiorul unui CartProvider");
  }
  return context;
};

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  discount: number;
  quantity: number; // Track quantity for each item
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  fetchCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Mock server URL (adjust the port if your mock server is running elsewhere)
  const serverUrl = "http://localhost:3001/cart";

  // Fetch cart items from the server
  const fetchCart = async () => {
    try {
      const response = await fetch(serverUrl);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Add an item to the cart
  const addToCart = async (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Update quantity if the item already exists in the cart
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);

      try {
        await fetch(`${serverUrl}/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
        });
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      // Add the new item to the cart
      const newItem = { ...item, quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);

      try {
        await fetch(serverUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    try {
      await fetch(`${serverUrl}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Clear all items from the cart
  const clearCart = async () => {
    setCart([]);

    try {
      await fetch(serverUrl, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, fetchCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

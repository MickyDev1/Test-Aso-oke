"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase.client";
import type { Product } from "./products";

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "pending" | "completed" | "shipped";
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const getCartKey = (uid: string | null) => `cart:${uid ?? "guest"}`;
  const getOrdersKey = (uid: string | null) => `orders:${uid ?? "guest"}`;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const uid = user?.uid ?? null;
      setUserId(uid);

      const cartKey = getCartKey(uid);
      const ordersKey = getOrdersKey(uid);

      setCartItems([]);
      setOrders([]);

      const savedCart = localStorage.getItem(cartKey);
      const savedOrders = localStorage.getItem(ordersKey);

      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch {
          setCartItems([]);
        }
      }
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch {
          setOrders([]);
        }
      }
    });

    return () => unsub();
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    const cartKey = getCartKey(userId);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, userId]);

  // Save orders to localStorage
  useEffect(() => {
    const ordersKey = getOrdersKey(userId);
    localStorage.setItem(ordersKey, JSON.stringify(orders));
  }, [orders, userId]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: cartTotal,
      date: new Date().toLocaleDateString(),
      status: "pending",
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        placeOrder,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

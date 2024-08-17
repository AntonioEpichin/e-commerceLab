'use client';

import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function ClearCarrinho() {
  const { clearCart,cartItems } = useCart();

  useEffect(() => {
    clearCart();
  }, [cartItems]);

  return (
    null
    );
}
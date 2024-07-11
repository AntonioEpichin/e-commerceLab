"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/context/CartContext";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


export default function Home() {
  const { total } = useCart(); // Access the total from the CartContext

  return (
    <Elements
    stripe={stripePromise}
    options={{
      mode: "payment",
      amount: convertToSubcurrency(total),
      currency: "brl",
    }}
  >
    <CheckoutPage amount={total} />
  </Elements>
  );
}

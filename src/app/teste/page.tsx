import { useEffect, useState } from "react";
import db from "@/lib/db";
import { auth } from "auth";

export default async function Teste() {
  const session = await auth();

  if (!session) {
    // Handle unauthenticated user, possibly redirect to login
    return <p>You need to log in to place an order.</p>;
  }

  console.log(`start + ${session.user.name}`);

  try {
    // Creating an order for the logged-in user
    const createOrder = await db.order.create({
      data: {
        total: 19.20, // You would calculate the total based on the items
        userId: session.user.id,
        items: {
          create: [
            // Example of creating an order item
            {
              examId: "clzqc70bi0000zmkjwb653tki", // Replace with actual exam ID
              quantity: 1,
              price: 15,
            },
            {
              examId: "clzqc9v740001zmkjlh4sz05d", // Replace with actual exam ID
              quantity: 1,
              price: 4.20,
            }
          ],
        },
      },
      include: {
        items: true, // Include the order items in the returned order
      },
    });

    console.log("Order created:", createOrder);

  } catch (error) {
    console.error("Error creating order:", error);
    return <p>There was an error creating your order.</p>;
  }

  return <p>{session?.user.name}</p>;
}

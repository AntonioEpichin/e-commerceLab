import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';
import { getSession } from 'next-auth/react';  // Use getSession from next-auth/react

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { amount, cartItems } = req.body;

  if (!amount || !cartItems) {
    return res.status(400).json({ error: 'Amount and cart items are required' }); // Bad Request
  }

  try {
    const session = await getSession({ req });  // Fetch session from the request
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' }); // Unauthorized
    }

    const userId = session.user.id;
    const orderTotal = parseFloat(amount);

    const order = await db.order.create({
      data: {
        total: orderTotal,
        userId,
        items: {
          create: cartItems.map(item => ({
            examId: item.id,
            quantity: 1,  // Assuming quantity is 1 for each item
            price: item.preço,
          })),
        },
      },
    });

    return res.status(201).json(order); // Created
  } catch (error) {
    console.error('Failed to create order:', error);
    return res.status(500).json({ error: 'Failed to create order' }); // Internal Server Error
  }
}

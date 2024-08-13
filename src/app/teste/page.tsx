import db from "@/lib/db";
import { sendMail } from "@/lib/mailService";
import { auth } from "auth";

export default async function Teste() {
  const session = await auth();

  if (!session) {
    // Handle unauthenticated user, possibly redirect to login
    return <p>You need to log in to place an order.</p>;
  }

  console.log(`start + ${session.user.name}`);

  // Função para gerar um número de ordem aleatório
  function generateOrderNumber(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderNumber = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderNumber += characters[randomIndex];
    }
    return orderNumber;
  }

  try {
    // Gerar o número da ordem
    const orderNumber: string = generateOrderNumber();

    // Template de e-mail em HTML
    const mailTemplate: string = `
    <html>
    <head>
        <title>Sua ordem foi processada com sucesso</title>
    </head>
    <body>
        <h1>Obrigado pela confiança!</h1>
        <p>Sua ordem foi processada com sucesso.</p>
        <p>O número da sua ordem é: <strong>${orderNumber}</strong></p>
        <p>Estamos à disposição para qualquer dúvida.</p>
        <p>Atenciosamente,</p>
        <p>Equipe Comercial</p>
    </body>
    </html>
    `;

    // Dados do e-mail
    const from: string = process.env.MAIL_USERNAME;
    const to: string = session.user.email; // Enviar para o e-mail do usuário logado
    const subject: string = "Sua ordem foi processada com sucesso";

    // Enviar o e-mail
    await sendMail(from, to, subject, mailTemplate);

    // Creating an order for the logged-in user
    const createOrder = await db.order.create({
      data: {
        total: 19.2, // You would calculate the total based on the items
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
              price: 4.2,
            },
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

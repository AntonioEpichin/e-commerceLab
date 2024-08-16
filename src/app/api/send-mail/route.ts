import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailService';
import { auth } from 'auth';

export async function POST(request: Request) {
    try {
        const { user } = await auth();

        // Parse request body
        const body = await request.json();
        const { amount } = body;

        // Generate a random order number
        const orderNumber = generateOrderNumber();

        // Define the mail template
        const mailTemplate = `
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

        const from = process.env.MAIL_USERNAME;
        const to = user.email;
        const subject = "Sua ordem foi processada com sucesso";

        await sendMail(from, to, subject, mailTemplate);

        return NextResponse.json({ success: true, orderNumber: orderNumber });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: 'Failed to send email.' }, { status: 500 });
    }
}

function generateOrderNumber(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderNumber = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderNumber += characters[randomIndex];
    }
    return orderNumber;
}
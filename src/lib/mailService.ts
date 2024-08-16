import nodemailer from 'nodemailer';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    try {
        logger.debug(`MAIL_HOST: ${process.env.MAIL_HOST}`);
        logger.debug(`MAIL_USERNAME: ${process.env.MAIL_USERNAME}`);
        logger.debug(`MAIL_PASSWORD: ${process.env.MAIL_PASSWORD ? '******' : 'Not Provided'}`);

        // Alternative Email Transport Configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',  // Replace with your actual SMTP host if needed
            port: 465,
            secure: true,  // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Verify the transporter configuration
        transporter.verify(function (error, success) {
            if (error) {
                logger.error(`Transporter verification failed: ${error.message}`);
            } else {
                logger.info('Server is ready to take our messages');
            }
        });

        // Adding a small delay to ensure verification logs are captured before sending email
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
        };
        logger.info(`Sending mail to - ${to}`);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(`Error sending email: ${error.message}`);
                throw new Error(`Failed to send email: ${error.message}`);
            } else {
                logger.info(`Email sent successfully: ${info.response}`);
                logger.debug(`Message ID: ${info.messageId}`);
                logger.debug(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
            }
        });
    } catch (err) {
        logger.error(`Unexpected error: ${err.message}`);
        throw err;
    }
};

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

        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            port: 465,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

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
            }
        });
    } catch (err) {
        logger.error(`Unexpected error: ${err.message}`);
        throw err;
    }
};

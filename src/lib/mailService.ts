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
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
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

        // Wrapping sendMail in a Promise for serverless environment compatibility
        await new Promise<void>((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    logger.error(`Error sending mail: ${err.message}`);
                    reject(err);
                } else {
                    logger.info(`Mail sent: ${info.response}`);
                    resolve();
                }
            });
        });

    } catch (err) {
        logger.error(`Unexpected error: ${err.message}`);
        throw err;
    }
};

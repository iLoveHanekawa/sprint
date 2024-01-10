import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const MailController = {
    send: async (req, res) => {
        try {
            const { subject = process.env.SMTP_TEST_SUBJECT, to = process.env.SMTP_TEST_RECIPIENT_EMAIL, html = process.env.SMTP_TEST_CONTENT } = req.body;
            const transport = createTransport({
                host: process.env.SMTP_HOST,
                secure: false,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false,
                },
                debug: true
            });
            const response = await transport.sendMail({
                from: {
                    address: process.env.SMTP_FROM_EMAIL,
                    name: process.env.SMTP_FROM_NAME
                },
                to,
                subject,
                html
            });
            return res.json({
                status: true,
                message: 'Email sent successfully',
                mailer: response
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                status: false,
                error: 'Failed to send email',
            });
        }
    }
};

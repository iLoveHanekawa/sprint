import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const MailController = {
    send: async (req, res) => {
        console.log("Host: " + process.env.SMTP_HOST);
        try {
            const transport = createTransport({
                host: process.env.SMTP_HOST,
                secure: false,
                port: 587,
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
                from: "arjunthakur900@gmail.com",
                to: "neelamtanwar900@gmail.com",
                subject: "Nodemailer test",
                text: "Hello from sprint"
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

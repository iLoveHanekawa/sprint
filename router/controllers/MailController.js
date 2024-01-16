import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { CreateGoogleClient } from "../clients/GoogleClient.js";
export const MailController = {
    send: (config) => async (req, res) => {
        dotenv.config({ path: config.envPath });
        try {
            // Destructure request body or use default values if not provided
            const { subject = process.env.SMTP_TEST_SUBJECT, to = process.env.SMTP_TEST_RECIPIENT_EMAIL, html = process.env.SMTP_TEST_CONTENT } = req.body;
            let authConfig = {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            };
            if (process.env.SMTP_HOST === 'smtp.gmail.com' && typeof config.getGoogleRefreshToken !== 'undefined') {
                const googleClient = CreateGoogleClient({
                    getGoogleAccessToken: config.getGoogleAccessToken,
                    getGoogleRefreshToken: config.getGoogleRefreshToken,
                    storeGoogleAccessToken: config.storeGoogleAccessToken,
                    storeGoogleRefreshToken: config.storeGoogleRefreshToken
                });
                const accessToken = await googleClient.getAccessToken();
                authConfig = {
                    type: 'OAUTH2',
                    user: process.env.SMTP_FROM_EMAIL,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    accessToken,
                };
            }
            // Create a Nodemailer transport
            const transport = createTransport({
                host: process.env.SMTP_HOST,
                secure: false,
                port: Number(process.env.SMTP_PORT),
                auth: authConfig,
                tls: {
                    rejectUnauthorized: false,
                },
                debug: true
            });
            // Send email using the configured transport
            const response = await transport.sendMail({
                from: {
                    address: process.env.SMTP_FROM_EMAIL,
                    name: process.env.SMTP_FROM_NAME
                },
                to,
                subject,
                html
            });
            // Return success response
            return res.json({
                status: true,
                message: 'Email sent successfully',
                mailer: response
            });
        }
        catch (error) {
            // Handle errors and return failure response
            console.error('Error sending email:', error);
            return res.status(500).json({
                status: false,
                error: 'Failed to send email',
                mailer: error
            });
        }
    }
};

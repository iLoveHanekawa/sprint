import type { Request, Response } from "express";
import { createTransport, type SentMessageInfo } from 'nodemailer';
import dotenv from 'dotenv';
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import type SMTPConnection from "nodemailer/lib/smtp-connection/index.js";
import type XOAuth2 from "nodemailer/lib/xoauth2/index.js";
import type { SprintRouterGoogleClientConfig } from "../index.js";
import { CreateGoogleClient } from "../clients/GoogleClient.js";

export type MailResponseType = { status: boolean, message?: string, mailer?: SMTPTransport.SentMessageInfo, error?: string }

/**
 * Controller for handling email sending functionality.
*/

type MailControllerConfig = {
    envPath: string
} & SprintRouterGoogleClientConfig

export const MailController = {
   send: (config: MailControllerConfig) => async (req: Request, res: Response<MailResponseType>): Promise<Response<MailResponseType, Record<string, any>>> => {
        dotenv.config({ path: config.envPath, override: true });
        try {
            // Destructure request body or use default values if not provided
            const { 
                subject = process.env.SMTP_TEST_SUBJECT, 
                to = process.env.SMTP_TEST_RECIPIENT_EMAIL, 
                html = process.env.SMTP_TEST_CONTENT 
            } = req.body;
            let authConfig: SMTPConnection.Credentials | XOAuth2.Options & { type: any } = {
                user: process.env.SMTP_USERNAME as string,
                pass: process.env.SMTP_PASSWORD as string
                
            }
            
            if(process.env.SMTP_HOST === 'smtp.gmail.com' && typeof config.getGoogleRefreshToken !== 'undefined') {
                const googleClient = CreateGoogleClient({
                    getGoogleAccessToken: config.getGoogleAccessToken,
                    getGoogleRefreshToken: config.getGoogleRefreshToken,
                    storeGoogleAccessToken: config.storeGoogleAccessToken,
                    storeGoogleRefreshToken: config.storeGoogleRefreshToken
                });
                
                const accessToken = await googleClient.getAccessToken();

                authConfig = {
                    type: 'OAUTH2',
                    user: process.env.SMTP_FROM_EMAIL!,
                    clientId: process.env.GOOGLE_CLIENT_ID as string,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                    accessToken,
                }
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
                    address: process.env.SMTP_FROM_EMAIL!,
                    name: process.env.SMTP_FROM_NAME!
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

        } catch (error) {
            // Handle errors and return failure response
            console.error('Error sending email:', error);
            return res.status(500).json({
                status: false,
                error: 'Failed to send email',
                mailer: error as SentMessageInfo
            });
        }
    }
}

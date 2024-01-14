import type { Request, Response } from "express";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
export type MailResponseType = {
    status: boolean;
    message?: string;
    mailer?: SMTPTransport.SentMessageInfo;
    error?: string;
};
/**
 * Controller for handling email sending functionality.
*/
export declare const MailController: {
    send: (envPath: string) => (req: Request, res: Response<MailResponseType>) => Promise<Response<MailResponseType, Record<string, any>>>;
};

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
    /**
     * Sends an email using Nodemailer.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @returns {Response} JSON response indicating the status of the email sending operation.
    */
    send: (req: Request, res: Response<MailResponseType>) => Promise<Response<MailResponseType, Record<string, any>>>;
};

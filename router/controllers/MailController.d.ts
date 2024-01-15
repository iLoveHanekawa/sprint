import type { Request, Response } from "express";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import type { SprintRouterGoogleClientConfig } from "../index.js";
export type MailResponseType = {
    status: boolean;
    message?: string;
    mailer?: SMTPTransport.SentMessageInfo;
    error?: string;
};
/**
 * Controller for handling email sending functionality.
*/
type MailControllerConfig = {
    envPath: string;
} & SprintRouterGoogleClientConfig;
export declare const MailController: {
    send: (config: MailControllerConfig) => (req: Request, res: Response<MailResponseType>) => Promise<Response<MailResponseType, Record<string, any>>>;
};
export {};

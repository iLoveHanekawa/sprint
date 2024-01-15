import type { Request, Response } from "express";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
export type MailResponseType = {
    status: boolean;
    message?: string;
    mailer?: SMTPTransport.SentMessageInfo;
    error?: string;
};
type MailControllerConfig = {
    envPath: string;
    getGoogleRefreshToken?: (() => Promise<{
        refreshToken: string;
    }>);
};
export declare const MailController: {
    send: (config: MailControllerConfig) => (req: Request, res: Response<MailResponseType>) => Promise<Response<MailResponseType, Record<string, any>>>;
};
export {};

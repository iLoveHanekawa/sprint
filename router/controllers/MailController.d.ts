/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { Request, Response } from "express";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import type { SprintRouterGoogleClientConfig } from "../index.js";
import type Mail from "nodemailer/lib/mailer/index.js";
import type internal from "stream";
export type MailResponseType = {
    status: boolean;
    message?: string;
    mailer?: SMTPTransport.SentMessageInfo;
    error?: string;
};
/**
 * Controller for handling email sending functionality.
*/
export type SendSprintMailArgs = {
    to: string | Mail.Address | (string | Mail.Address)[] | undefined;
    subject: string | undefined;
    html: string | internal.Readable | Buffer | Mail.AttachmentLike | undefined;
};
type MailControllerConfig = {
    envPath: string;
} & SprintRouterGoogleClientConfig;
export declare const MailController: {
    send: (config: MailControllerConfig) => (req: Request, res: Response<MailResponseType>) => Promise<Response<MailResponseType, Record<string, any>>>;
};
export {};

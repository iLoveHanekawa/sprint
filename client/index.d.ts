/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import type Mail from "nodemailer/lib/mailer/index.js";
import type internal from "stream";
export type SprintMailResponse = {
    status: boolean;
    mailer: SMTPTransport.SentMessageInfo;
    message?: string;
    error?: string;
};
type SendSprintMailArgs = {
    to: string | Mail.Address | (string | Mail.Address)[] | undefined;
    subject: string | undefined;
    html: string | internal.Readable | Buffer | Mail.AttachmentLike | undefined;
};
export declare const useSprintMailer: (sprintRouterRootUrl: string) => {
    loading: boolean;
    mailer: SMTPTransport.SentMessageInfo | null;
    sendMail: (sendSprintMailArgs?: SendSprintMailArgs) => Promise<SprintMailResponse | undefined>;
};
export {};

import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import type Mail from "nodemailer/lib/mailer/index.js";
import type internal from "stream";
import React from "react";
export type SprintMailResponse = {
    status: boolean
    mailer: SMTPTransport.SentMessageInfo
    message?: string
    error?: string
}

// investigate why importing this type causes the entire router bundle to be imported during building

type SendSprintMailArgs = {
    to: string | Mail.Address | (string | Mail.Address)[] | undefined;
    subject: string | undefined;
    html: string | internal.Readable | Buffer | Mail.AttachmentLike | undefined;
}

//TODO add sprintmailer config (this only sends to test)

export const useSprintMailer = (sprintRouterRootUrl: string) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [mailer, setMailer] = React.useState<SMTPTransport.SentMessageInfo | null>(null);

    const sendMail: (sendSprintMailArgs?: SendSprintMailArgs) => Promise<SprintMailResponse | undefined> = async(sendSprintMailArgs) => {
        setLoading(true);
        setMailer(null);
        try {
            const res = await fetch(sprintRouterRootUrl + '/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: sendSprintMailArgs? JSON.stringify(sendSprintMailArgs): null
            });
            const data: SprintMailResponse = await res.json();
            setMailer(data.mailer);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }
    return { loading, mailer, sendMail };
}

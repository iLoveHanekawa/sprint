import React from "react";

export type SprintMailResponse = {
    status: boolean
    mailer: Record<string, any>
    message: string
}

export const useSprintMailer = (sprintRouterRootUrl: string) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [mailer, setMailer] = React.useState<any | null>(null);

    const sendMail = async() => {
        setLoading(true);
        try {
            const res = await fetch(sprintRouterRootUrl + '/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data: SprintMailResponse = await res.json();
            setMailer(data.mailer);
            if(data.status === false) {
                throw new Error(data.message);
            }
            setLoading(false);
            setSuccess(data.message);
            return data;
        } catch (error) {
            if(error instanceof Error) {
                setLoading(false);
                setError(error.message);
            }
        }

    }
    return { loading, error, success, mailer, sendMail };
}
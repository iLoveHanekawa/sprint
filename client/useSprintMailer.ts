import React from "react";

export type SprintMailResponse = {
    status: boolean
    mailer: Record<string, any>
    message?: string
    error?: string
}

export const useSprintMailer = (sprintRouterRootUrl: string) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [mailer, setMailer] = React.useState<any | null>(null);

    const sendMail = async() => {
        setLoading(true);
        setMailer(null);
        try {
            const res = await fetch(sprintRouterRootUrl + '/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
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
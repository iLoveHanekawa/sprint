import React from "react";
//TODO add sprintmailer config (this only sends to test)
export const useSprintMailer = (sprintRouterRootUrl) => {
    const [loading, setLoading] = React.useState(false);
    const [mailer, setMailer] = React.useState(null);
    const sendMail = async () => {
        setLoading(true);
        setMailer(null);
        try {
            const res = await fetch(sprintRouterRootUrl + '/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setMailer(data.mailer);
            setLoading(false);
            return data;
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return { loading, mailer, sendMail };
};

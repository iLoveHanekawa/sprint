import React, { FormEvent } from "react";
import { useSprintMailer } from '../../client/useSprintMailer';
import { ToastContext, ToastContextType } from "../contexts/ToastContext";
import { AppContext, AppContextType } from "../contexts/AppContext";

export default function TestMailForm() {

    const { loading, error, success, sendMail } = useSprintMailer('http://localhost:3000/sprint');
    const toast = React.useContext<ToastContextType | null>(ToastContext);
    const appStore = React.useContext<AppContextType | null>(AppContext);
    console.log(toast?.renderToast);
    async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
        // TODO client url
        event.preventDefault();
        console.log('called');
        const data = await sendMail();
        if(success) {
            toast?.setContent('Email sent successfully. Please check your test email: ' + appStore?.data?.SMTP_TEST_RECIPIENT_EMAIL);
        }
        else {
            toast?.setContent('Email sending request failed. Check console for details.');
        }
        toast?.setRenderToast(true);
        console.log(data);
        console.log('finished');
    }

    return <form className="mt-2.5" onSubmit={onSubmitHandler}>
        <button disabled={loading} className="bg-button-tertiary text-white secondary-button flex items-center gap-4" type="submit">
            <span className={`animate-spin border-2 border-l-transparent rounded-full p-2 border-white ${!loading? 'hidden': ''}`}></span>{loading? 'Sending mail': 'Test mail'}
        </button>
        {(!loading) && <div className={`mt-2 text-sm ${!success? 'text-error': 'text-success'}`}>{success? "Email sent successfully!": error}</div>}
    </form>
}
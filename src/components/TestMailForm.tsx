import React, { FormEvent } from "react";
import { useSprintMailer } from '../../client';
import { ToastContext, ToastContextType } from "../contexts/ToastContext";
import { AppContext, AppContextType } from "../contexts/AppContext";

export default function TestMailForm() {

    const { loading, sendMail } = useSprintMailer('http://localhost:3000/sprint');
    const [message, setMessage] = React.useState<string>('');
    const [showMessage, setShowMessage] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const toast = React.useContext<ToastContextType | null>(ToastContext);
    const appStore = React.useContext<AppContextType | null>(AppContext);
    async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            setShowMessage(false);
            const data = await sendMail();
            console.log({data});
            if(data?.status) {
                setSuccess(true);
                toast?.setIsError(false);
                toast?.setContent('Email sent successfully. Please check your test email: ' + appStore?.data?.SMTP_TEST_RECIPIENT_EMAIL);
                setMessage(data.message!);
            }
            else {
                setSuccess(false);
                toast?.setIsError(true);
                toast?.setContent('Email sending request failed. Check console for details.');
                setMessage(data?.error!);
            }
            setShowMessage(true);
            toast?.setRenderToast(true);
        } catch (error) {
            console.log(error);            
        }
        // TODO client url
    }

    return <form className="mt-2.5" onSubmit={onSubmitHandler}>
        <button disabled={loading} className="bg-button-tertiary text-white secondary-button flex items-center gap-4" type="submit">
            <span className={`animate-spin border-2 border-l-transparent rounded-full p-2 border-white ${!loading? 'hidden': ''}`}></span>{loading? 'Sending mail': 'Test mail'}
        </button>
        {(!loading && showMessage) && <div className={`mt-2 text-sm ${!success? 'text-error': 'text-success'}`}>{message}</div>}
    </form>
}
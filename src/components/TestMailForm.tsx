import React, { FormEvent } from "react";
import { useSprintMailer } from '../../client/useSprintMailer';
import { ToastContext, ToastContextType } from "../contexts/ToastContext";

export default function TestMailForm() {

    const { loading, error, success, sendMail } = useSprintMailer('http://localhost:3000/sprint');
    const toast = React.useContext<ToastContextType | null>(ToastContext);
    async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
        // TODO client url
        event.preventDefault();
        const data = await sendMail();
        if(error) {
            toast?.setContent(error);
        }
        else if(success) {
            toast?.setContent(success);
        }
        toast?.setContent(data?.message as string);
        toast?.setRenderToast(true);
        console.log(data);
    }

    return <form className="mt-2.5" onSubmit={onSubmitHandler}>
        <button disabled={loading} className="bg-button-tertiary text-white secondary-button flex items-center gap-4" type="submit">
            <span className={`animate-spin border-2 border-l-transparent rounded-full p-2 border-white ${!loading? 'hidden': ''}`}></span>{loading? 'Sending mail': 'Test mail'}
        </button>
        {(error || success) && <div className={`mt-2 text-sm ${error? 'text-error': 'text-success'}`}>{error? error: success}</div>}
    </form>
}
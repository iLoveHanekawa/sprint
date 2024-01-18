import React, { FormEvent } from 'react';
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintGetEnvResponse } from '../../router';
import SprintFormInput from './SprintFormInput';
import SprintFormSelect from './SprintFormSelect';
import { ToastContext, ToastContextType } from '../contexts/ToastContext';
type SprintFormProps = { envKeyArr: { key: string, value: string }[] };

export default function SprintForm({ envKeyArr }: SprintFormProps) {
    // TODO env specific changes
    
    const appStore = React.useContext<AppContextType | null>(AppContext);
    const toast = React.useContext<ToastContextType | null>(ToastContext);
    const [showMessage, setShowMessage] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');
    const [success, setSuccess] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setShowMessage(false);
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/sprint/post-env", {
                method: "POST",
                body: JSON.stringify(appStore?.data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data: SprintGetEnvResponse = await res.json();
            appStore?.setData(data.variables!);
            if(data.status) {
                toast?.setIsError(false);
                setSuccess(true);
                toast?.setContent('Updated the env file successfully!');
                setMessage(data.message!);
            }
            else {
            }
            toast?.setRenderToast(true);
            setShowMessage(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast?.setIsError(true);
            setSuccess(false);
            toast?.setContent('Something went wrong. View console to debug this error.');
            setMessage('Something went wrong.');
            console.log(error);            
        }
    }
    return <form method="POST" onSubmit={submitHandler}>
        <ul>
            {envKeyArr.map(({ key, value }: { key: string, value: string }, index: number) => {
                return <li key={ index }>
                    {(appStore?.data && key in appStore.data!) && key === 'NODE_ENV'? 
                        <SprintFormSelect title={key} /> 
                        : <SprintFormInput title={key} value={value} />
                    }
                </li>
            })}
        </ul>
        
        <button className='bg-group-left-alt text-white primary-button flex items-center gap-4' type="submit">
            <span className={`animate-spin border-2 border-l-transparent rounded-full p-2 border-white ${!loading? 'hidden': ''}`}></span>{loading? 'Saving': 'Save'}
        </button>
        {(!loading && showMessage) && <div className={`mt-2 text-sm ${!success? 'text-error': 'text-success'}`}>{message}</div>}
    </form>
}

import React, { FormEvent } from 'react';
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintGetEnvResponse, SprintVariables } from '../../router';

export default function SprintForm() {

    // TODO env specific changes
    
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'GOOGLE_CLIENT_ID', value: 'Google client ID' },
        { key: 'GOOGLE_CLIENT_SECRET', value: 'Google client secret' },
        { key: 'SMTP_HOST', value: 'SMTP host' },
        { key: 'SMTP_FROM_EMAIL', value: 'SMTP from email' },
        { key: 'SMTP_USERNAME', value: 'SMTP username' },
        { key: 'SMTP_PASSWORD', value: 'SMTP password' },
        { key: 'SMTP_PORT', value: 'SMTP port' },
        { key: 'SMTP_CONTENT_TYPE', value: 'SMTP content type' },
        { key: 'SMTP_ENCRYPTION', value: 'SMTP encryption' },
        { key: 'SMTP_CHARSET', value: 'SMTP charset' },
        { key: 'SMTP_DEBUG', value: 'SMTP debug' },
        { key: 'SMTP_FROM_NAME', value: 'SMTP from name' },
        { key: 'SMTP_TEST_RECIPIENT_EMAIL', value: 'SMTP test recipient\'s email' },
        { key: 'SMTP_TEST_SUBJECT', value: ' SMTP test subject' },
        { key: 'SMTP_TEST_CONTENT', value: 'SMTP test content' }
    ];
    
    const appStore = React.useContext<AppContextType | null>(AppContext);
    
    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
        } catch (error) {
            console.log(error);            
        }
    }
    return <form method="POST" onSubmit={submitHandler}>
        <ul>
            {envKeyArr.map(({ key, value }: { key: string, value: string }, index: number) => {
                return <li key={ index }>
                    {(appStore?.data && key in appStore?.data!) && key !== 'SMTP_TEST_CONTENT'? <div>
                        <input name={ key } onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            appStore?.setData({ ...appStore.data as SprintVariables, [key]: event.currentTarget.value });
                        }} value={ appStore.data[key] } placeholder={ value } />
                    </div>: <div>
                        <textarea maxLength={1000} name={ key } onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                appStore?.setData({ ...appStore.data as SprintVariables, [key]: event.currentTarget.value });
                            }} value={ appStore?.data![key] } placeholder={ value } />
                    </div>}
                </li>
            })}
        </ul>
        <button type="submit">Save</button>
    </form>
}

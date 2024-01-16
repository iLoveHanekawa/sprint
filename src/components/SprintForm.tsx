import React, { FormEvent } from 'react';
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintGetEnvResponse, SprintVariables } from '../../router';

type SprintFormProps = { envKeyArr: { key: string, value: string }[] };

export default function SprintForm({ envKeyArr }: SprintFormProps) {

    // TODO env specific changes
    
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
